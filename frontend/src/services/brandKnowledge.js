// ==========================================================================
// InkGuard AI — Dynamic Brand Knowledge & Guidelines Repository
// ==========================================================================

export const INITIAL_BRAND_PRESETS = {
  inkloom: {
    id: 'inkloom',
    name: 'Inkloom AI (Official Brand Kit)',
    version: '2026.4',
    industry: 'Enterprise AI & Content Technology',
    voice: {
      primaryTone: 'Empathetic, data-backed, confident, and direct',
      forbiddenTones: ['Aggressive or pressure-tactics', 'Hype-laden superlatives', 'Condescending jargon', 'Over-promising absolute certainty'],
      readingLevel: 'Grade 8–10 (Clear, accessible business prose)',
      perspective: 'First-person plural ("we", "our team") or second-person ("you")'
    },
    bannedTerms: [
      { term: '100% bug-free', replacement: 'extensively battle-tested', rule: '§1.4 Fact Accuracy', severity: 'critical', reason: 'No software can legally guarantee 100% zero defects' },
      { term: '100% instant recovery', replacement: 'high-availability 99.95% disaster recovery', rule: '§4.1 Promotional Claims', severity: 'critical', reason: 'Contradicts verified corporate SLA of 99.95%' },
      { term: 'zero downtime', replacement: '99.95% uptime SLA', rule: '§4.1 Promotional Claims', severity: 'critical', reason: 'Absolute zero-downtime promises violate customer SLA warranty bounds' },
      { term: 'cheapest', replacement: 'most cost-effective enterprise solution', rule: '§2.3 Premium Positioning', severity: 'warning', reason: 'Inkloom positions as high-value enterprise grade, not bargain basement' },
      { term: 'Inkloom v1', replacement: 'Inkloom Enterprise Platform', rule: '§3.2 Nomenclature', severity: 'warning', reason: '"v1" is deprecated legacy naming retired in Q1 2026' },
      { term: 'hacky', replacement: 'ad-hoc or bespoke', rule: '§2.1 Professional Tone', severity: 'advisory', reason: 'Informal slang detracts from enterprise credibility' },
      { term: 'idiot', replacement: 'team looking to upgrade', rule: '§1.1 Respectful Voice', severity: 'critical', reason: 'Abusive or insulting language is strictly prohibited' },
      { term: '#1 platform in the universe', replacement: 'leading brand governance platform', rule: '§4.2 Unsupported Superlatives', severity: 'warning', reason: 'Unverified superlative claims expose firm to false-advertising challenges' }
    ],
    approvedFacts: [
      {
        id: 'fact-sla',
        category: 'Reliability & SLA',
        claim: '99.95% High-Availability Uptime SLA',
        source: 'Master Service Agreement 2026, Section 9',
        verifiedDate: '2026-08-15',
        details: 'Backed by financially backed service credits. Standard tier is 99.95%, enterprise dedicated tier is 99.99%.'
      },
      {
        id: 'fact-velocity',
        category: 'Performance Benchmark',
        claim: 'Up to 40% reduction in review turnaround cycles',
        source: 'Q3 Enterprise Customer Benchmark Report',
        verifiedDate: '2026-09-01',
        details: 'Measured across 45 enterprise marketing teams over a 90-day trial.'
      },
      {
        id: 'fact-security',
        category: 'Compliance & Security',
        claim: 'SOC 2 Type II Certified & GDPR / HIPAA Compliant',
        source: 'Trust & Security Portal (Audit Ref: SEC-2026-T2)',
        verifiedDate: '2026-07-20',
        details: 'Annual independent third-party audit completed without material exceptions.'
      },
      {
        id: 'fact-customers',
        category: 'Market Traction',
        claim: 'Trusted by over 450+ high-growth organizations',
        source: 'Executive Business Review Q3',
        verifiedDate: '2026-10-01',
        details: 'Active accounts publishing at least 15 assets weekly.'
      },
      {
        id: 'fact-trial',
        category: 'Commercial Terms',
        claim: '14-day unrestricted trial with zero credit card required',
        source: 'Self-Serve Pricing Policy',
        verifiedDate: '2026-01-10',
        details: 'Includes up to 50 pre-flight scans and 3 team reviewer seats.'
      }
    ],
    visualTokens: {
      primaryColor: '#4F46E5', // Indigo
      primaryName: 'Inkloom Indigo',
      secondaryColor: '#06B6D4', // Cyan
      secondaryName: 'Vibrant Cyan',
      accentColor: '#10B981', // Emerald
      accentName: 'Verified Emerald',
      neutralDark: '#0F172A',
      neutralLight: '#F8FAFC',
      minContrastRatio: 4.5, // WCAG 2.1 AA
      logoClearSpacePx: 24,
      fontFamily: 'Plus Jakarta Sans'
    }
  },

  technova: {
    id: 'technova',
    name: 'TechNova Cloud Systems',
    version: '2026.2',
    industry: 'Cloud Infrastructure & DevOps',
    voice: {
      primaryTone: 'Technical, authoritative, engineer-focused, transparent',
      forbiddenTones: ['Marketing fluff', 'Hand-waving abstractions'],
      readingLevel: 'Grade 10–12 (Technical/engineering)',
      perspective: 'Third-person or engineer-to-engineer'
    },
    bannedTerms: [
      { term: 'magical', replacement: 'automated', rule: '§1.2 Technical Precision', severity: 'warning', reason: 'Avoid non-technical buzzwords' },
      { term: '100% safe', replacement: 'zero-trust architecture with end-to-end encryption', rule: '§3.1 Security Claims', severity: 'critical', reason: 'Security cannot be framed in absolute absolutes' }
    ],
    approvedFacts: [
      {
        id: 'fact-latency',
        category: 'Performance',
        claim: 'Sub-15ms global edge latency across 120 PoPs',
        source: 'Edge Performance Telemetry Oct 2026',
        verifiedDate: '2026-10-05',
        details: 'Median round-trip time across all edge regions.'
      }
    ],
    visualTokens: {
      primaryColor: '#2563EB',
      primaryName: 'Nova Blue',
      secondaryColor: '#38BDF8',
      secondaryName: 'Sky Stream',
      accentColor: '#F59E0B',
      accentName: 'Alert Amber',
      neutralDark: '#0B1120',
      neutralLight: '#F1F5F9',
      minContrastRatio: 4.5,
      logoClearSpacePx: 20,
      fontFamily: 'Inter'
    }
  }
};
