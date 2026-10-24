// ==========================================================================
// InkGuard AI — Pre-Flight Content Verification & Explainability Engine
// ==========================================================================

/**
 * Calculates WCAG 2.1 Relative Luminance for a given RGB hex color
 */
export function getRelativeLuminance(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculates WCAG 2.1 Contrast Ratio between two hex colors (e.g. 4.5:1)
 */
export function calculateContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Converts RGB tuple to hex string
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

/**
 * Core Multi-Modal Inspection Engine (Hybrid: FastAPI Backend with Client-Side Fallback)
 */
export async function runPreflightScan({ text, imageMeta, brandGuidelines }) {
  const BACKEND_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8000';

  // 1. ATTEMPT REAL FASTAPI BACKEND CALL
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const resp = await fetch(`${BACKEND_URL}/api/v1/inspect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text || '',
        brandId: brandGuidelines?.id || 'inkloom',
        imageMeta: imageMeta || undefined
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const backendData = await resp.json();
      backendData.engine = 'FastAPI Backend (Python 3.11 Microservice)';
      return backendData;
    }
  } catch (err) {
    // Backend offline / deployed statically: Seamlessly proceed with client-side engine
    // console.log('FastAPI server offline, running in autonomous client-side engine mode');
  }

  const findings = [];
  const textContent = text || '';

  // 1. DETERMINISTIC LEXICON & BANNED TERMS SCAN
  if (brandGuidelines.bannedTerms && brandGuidelines.bannedTerms.length > 0) {
    brandGuidelines.bannedTerms.forEach((ruleItem) => {
      const escaped = ruleItem.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      let match;
      while ((match = regex.exec(textContent)) !== null) {
        findings.push({
          id: `lexicon-${ruleItem.term}-${match.index}`,
          category: 'Terminology & Lexicon',
          severity: ruleItem.severity || 'warning',
          flaggedText: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          rule: ruleItem.rule,
          sourceCitation: `Brand Manual ${ruleItem.rule}`,
          explanation: ruleItem.reason,
          suggestedReplacement: ruleItem.replacement,
          // 3 Intent-Preserving Alternatives
          alternatives: {
            conservative: `compliant phrasing (${ruleItem.replacement})`,
            balanced: ruleItem.replacement,
            creative: `high-impact ${ruleItem.replacement}`
          }
        });
      }
    });
  }

  // 2. FACTUAL GROUNDING & UNSUPPORTED CLAIMS SCAN
  const claimPatterns = [
    {
      regex: /(?:100%|guarantee[ds]?\s+100%|zero\s+downtime|instant\s+recovery)/i,
      category: 'Factual Claim Grounding',
      severity: 'critical',
      rule: '§4.1 Promotional Claims & SLA Accuracy',
      sourceCitation: 'Master Service Agreement 2026, Section 9 (Uptime SLA)',
      explanation: 'Our SLA is 99.95%, not 100%. Legally, absolute zero-downtime claims violate warranty safe harbors and trigger legal liability.',
      alternatives: {
        conservative: 'engineered for 99.95% high-availability enterprise uptime',
        balanced: 'delivering enterprise-grade 99.95% high-availability recovery',
        creative: 'relentless 99.95% resilience when every millisecond counts'
      }
    },
    {
      regex: /(?:cheapest\s+in\s+(?:the\s+)?world|cheapest\s+(?:software|tool|platform|solution))/i,
      category: 'Factual Claim Grounding',
      severity: 'warning',
      rule: '§2.3 Brand Value Positioning',
      sourceCitation: 'Brand Strategy Handbook §2.3 (Premium Enterprise Positioning)',
      explanation: 'We position as a high-value enterprise solution. "Cheapest" commoditizes the brand and invites unsubstantiated price-matching disputes.',
      alternatives: {
        conservative: 'highly cost-effective enterprise solution with transparent pricing',
        balanced: 'maximizing ROI with transparent, accessible enterprise tiers',
        creative: 'unlocking unmatched governance power without enterprise sticker shock'
      }
    },
    {
      regex: /(?:#1\s+platform\s+in\s+the\s+universe|#1\s+in\s+the\s+world)/i,
      category: 'Factual Claim Grounding',
      severity: 'warning',
      rule: '§4.2 Unsupported Superlatives',
      sourceCitation: 'Legal Advertising Guidelines §4.2 (Grounded Superlatives)',
      explanation: 'Unsubstantiated "#1" claims violate FTC / advertising standards without a certified third-party market report citation.',
      alternatives: {
        conservative: 'leading brand governance platform recognized across enterprise sectors',
        balanced: 'rapidly growing brand governance platform trusted by top enterprises',
        creative: 'setting the benchmark for intelligent pre-publication governance'
      }
    }
  ];

  claimPatterns.forEach((claim, idx) => {
    let match;
    const regex = new RegExp(claim.regex, 'gi');
    while ((match = regex.exec(textContent)) !== null) {
      // Avoid duplicate flags if already captured
      const isDuplicate = findings.some(f => Math.abs(f.startIndex - match.index) < 5);
      if (!isDuplicate) {
        findings.push({
          id: `claim-${idx}-${match.index}`,
          category: claim.category,
          severity: claim.severity,
          flaggedText: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          rule: claim.rule,
          sourceCitation: claim.sourceCitation,
          explanation: claim.explanation,
          suggestedReplacement: claim.alternatives.balanced,
          alternatives: claim.alternatives
        });
      }
    }
  });

  // 3. TONE & VOICE AUDIT
  const hostileRegex = /\b(idiot|stupid|moron|dumb|don't be an idiot)\b/gi;
  let hostileMatch;
  while ((hostileMatch = hostileRegex.exec(textContent)) !== null) {
    findings.push({
      id: `tone-hostile-${hostileMatch.index}`,
      category: 'Tone & Voice',
      severity: 'critical',
      flaggedText: hostileMatch[0],
      startIndex: hostileMatch.index,
      endIndex: hostileMatch.index + hostileMatch[0].length,
      rule: '§1.1 Respectful & Empathetic Communication',
      sourceCitation: 'Voice & Tone Architecture §1.1',
      explanation: 'Confrontational or insulting language contradicts our empathetic, constructive brand voice.',
      suggestedReplacement: 'forward-thinking teams',
      alternatives: {
        conservative: 'organizations evaluating their publishing posture',
        balanced: 'teams looking to protect their brand credibility',
        creative: 'creators ready to elevate their content standard'
      }
    });
  }

  // 4. MULTIMODAL VISUAL IDENTITY & WCAG CONTRAST INSPECTION
  if (imageMeta) {
    const { dominantColor, textColor, backgroundColor, contrastRatio, width, height, hasLogo, logoPaddingPx } = imageMeta;

    // Check WCAG Contrast Ratio
    if (contrastRatio !== undefined && contrastRatio < (brandGuidelines.visualTokens.minContrastRatio || 4.5)) {
      findings.push({
        id: `visual-contrast-${Date.now()}`,
        category: 'Visual & Accessibility (WCAG 2.1)',
        severity: 'critical',
        flaggedText: `Text Contrast Ratio: ${contrastRatio.toFixed(2)}:1`,
        startIndex: 0,
        endIndex: 0,
        rule: 'WCAG 2.1 Level AA (Criterion 1.4.3: Contrast Minimum)',
        sourceCitation: 'Global Accessibility Standards & Brand Visual Kit §5.1',
        explanation: `Calculated contrast ratio is ${contrastRatio.toFixed(2)}:1, which fails the required 4.5:1 minimum standard. Text placed on this background will be unreadable for users with moderate visual impairments.`,
        suggestedReplacement: `Adjust text color to dark neutral (${brandGuidelines.visualTokens.neutralDark}) or darken background to achieve >= 4.5:1 contrast.`,
        alternatives: {
          conservative: `Switch text to high-contrast dark ${brandGuidelines.visualTokens.neutralDark} (achieves 9.8:1 contrast)`,
          balanced: `Add 40% semi-transparent dark backing scrim behind text`,
          creative: `Use brand primary gradient background (#4F46E5) with pure white text`
        },
        visualData: {
          contrastRatio,
          requiredRatio: 4.5,
          textColor,
          backgroundColor
        }
      });
    }

    // Check Off-Brand Colors
    if (dominantColor && brandGuidelines.visualTokens) {
      const approvedHexes = [
        brandGuidelines.visualTokens.primaryColor.toUpperCase(),
        brandGuidelines.visualTokens.secondaryColor.toUpperCase(),
        brandGuidelines.visualTokens.accentColor.toUpperCase()
      ];

      // If dominant color is wildly unapproved (e.g. bright neon yellow/magenta not in brand)
      const cleanDom = dominantColor.toUpperCase();
      const isApproved = approvedHexes.some(h => h === cleanDom);
      if (!isApproved && cleanDom.startsWith('#FF') && cleanDom !== '#FFFFFF') {
        findings.push({
          id: `visual-palette-${Date.now()}`,
          category: 'Visual Identity & Palette',
          severity: 'warning',
          flaggedText: `Off-Brand Dominant Hex: ${dominantColor}`,
          startIndex: 0,
          endIndex: 0,
          rule: '§5.2 Approved Color Tokens',
          sourceCitation: 'Design Systems Manual §5.2 (Corporate Palette)',
          explanation: `Color ${dominantColor} deviates from the approved primary (${brandGuidelines.visualTokens.primaryColor}) and secondary palette tokens.`,
          suggestedReplacement: `Swap with brand primary ${brandGuidelines.visualTokens.primaryColor} or secondary ${brandGuidelines.visualTokens.secondaryColor}.`,
          alternatives: {
            conservative: `Apply Primary ${brandGuidelines.visualTokens.primaryColor}`,
            balanced: `Apply Secondary ${brandGuidelines.visualTokens.secondaryColor}`,
            creative: `Use subtle gradient from Primary to Secondary`
          }
        });
      }
    }

    // Check Logo Clear-Space
    if (hasLogo && logoPaddingPx !== undefined && logoPaddingPx < (brandGuidelines.visualTokens.logoClearSpacePx || 24)) {
      findings.push({
        id: `visual-logo-clearspace-${Date.now()}`,
        category: 'Logo Integrity',
        severity: 'warning',
        flaggedText: `Logo Clearance: ${logoPaddingPx}px`,
        startIndex: 0,
        endIndex: 0,
        rule: '§5.4 Logo Clearance & Safe Zones',
        sourceCitation: 'Brand Assets Guidebook §5.4',
        explanation: `Logo boundary-box has only ${logoPaddingPx}px of padding. Brand guidelines mandate a minimum of ${brandGuidelines.visualTokens.logoClearSpacePx}px clear space on all sides to prevent visual crowding.`,
        suggestedReplacement: `Increase margin around the logo asset to at least ${brandGuidelines.visualTokens.logoClearSpacePx}px.`,
        alternatives: {
          conservative: `Add 24px uniform padding around logo`,
          balanced: `Re-position logo to top-right corner with 32px safe zone`,
          creative: `Separate logo into dedicated header band`
        }
      });
    }
  }

  // 5. CALCULATE COMPREHENSIVE COMPLIANCE SCORE (0–100)
  let score = 100;
  findings.forEach(f => {
    if (f.severity === 'critical') score -= 22;
    else if (f.severity === 'warning') score -= 10;
    else if (f.severity === 'advisory') score -= 4;
  });

  const finalScore = Math.max(12, Math.min(100, score));

  // Determine Overall Status
  let status = 'APPROVED';
  if (findings.some(f => f.severity === 'critical')) {
    status = 'BLOCKED';
  } else if (findings.some(f => f.severity === 'warning')) {
    status = 'REQUIRES_REVIEW';
  }

  return {
    timestamp: new Date().toISOString(),
    engine: 'Client-Side Autonomous Engine (Zero-Latency Fallback)',
    score: finalScore,
    status,
    findingsCount: findings.length,
    criticalCount: findings.filter(f => f.severity === 'critical').length,
    warningCount: findings.filter(f => f.severity === 'warning').length,
    advisoryCount: findings.filter(f => f.severity === 'advisory').length,
    findings,
    summary: {
      toneQuality: findings.some(f => f.category === 'Tone & Voice') ? 'Needs Refinement' : 'Aligned',
      factIntegrity: findings.some(f => f.category === 'Factual Claim Grounding') ? 'Discrepancies Detected' : 'Verified',
      visualCompliance: findings.some(f => f.category.includes('Visual')) ? 'Non-Compliant' : 'Approved'
    }
  };
}
