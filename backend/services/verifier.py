import re
from datetime import datetime
from typing import List, Dict, Any, Optional
from backend.models import Finding, AlternativeOptions, InspectionResponse, InspectionSummary, ImageMetadata

# Verified Brand Knowledge Base (Single Source of Truth)
BRAND_KNOWLEDGE = {
    "inkloom": {
        "name": "Inkloom AI (Official Brand Kit)",
        "version": "2026.4",
        "primaryColor": "#4F46E5",
        "secondaryColor": "#06B6D4",
        "minContrastRatio": 4.5,
        "logoClearSpacePx": 24,
        "bannedTerms": [
            {
                "term": "100% bug-free",
                "replacement": "extensively battle-tested",
                "rule": "§1.4 Fact Accuracy",
                "severity": "critical",
                "reason": "No software can legally guarantee 100% zero defects",
                "conservative": "thoroughly validated against enterprise edge cases",
                "balanced": "extensively battle-tested across production workloads",
                "creative": "rock-solid stability built for continuous deployment"
            },
            {
                "term": "100% instant recovery",
                "replacement": "high-availability 99.95% disaster recovery",
                "rule": "§4.1 Promotional Claims",
                "severity": "critical",
                "reason": "Contradicts verified corporate SLA of 99.95%",
                "conservative": "engineered for 99.95% high-availability enterprise uptime",
                "balanced": "delivering enterprise-grade 99.95% high-availability recovery",
                "creative": "relentless 99.95% resilience when every millisecond counts"
            },
            {
                "term": "zero downtime",
                "replacement": "99.95% uptime SLA",
                "rule": "§4.1 Promotional Claims",
                "severity": "critical",
                "reason": "Absolute zero-downtime promises violate customer SLA warranty bounds",
                "conservative": "backed by a 99.95% high-availability SLA",
                "balanced": "engineered for continuous 99.95% uptime",
                "creative": "uncompromising uptime for mission-critical operations"
            },
            {
                "term": "cheapest",
                "replacement": "most cost-effective enterprise solution",
                "rule": "§2.3 Premium Positioning",
                "severity": "warning",
                "reason": "Inkloom positions as high-value enterprise grade, not bargain basement",
                "conservative": "highly cost-effective enterprise solution with transparent pricing",
                "balanced": "maximizing ROI with transparent, accessible enterprise tiers",
                "creative": "unlocking unmatched governance power without enterprise sticker shock"
            },
            {
                "term": "Inkloom v1",
                "replacement": "Inkloom Enterprise Platform",
                "rule": "§3.2 Nomenclature",
                "severity": "warning",
                "reason": '"v1" is deprecated legacy naming retired in Q1 2026',
                "conservative": "Inkloom Enterprise Platform",
                "balanced": "the latest Inkloom Enterprise Engine",
                "creative": "our next-generation Inkloom Architecture"
            },
            {
                "term": "idiot",
                "replacement": "forward-thinking team",
                "rule": "§1.1 Respectful Voice",
                "severity": "critical",
                "reason": "Confrontational or insulting language violates our empathetic brand voice",
                "conservative": "organizations evaluating their publishing posture",
                "balanced": "teams looking to protect their brand credibility",
                "creative": "creators ready to elevate their content standard"
            }
        ],
        "approvedFacts": [
            {
                "id": "fact-sla",
                "category": "Reliability & SLA",
                "claim": "99.95% High-Availability Uptime SLA",
                "source": "Master Service Agreement 2026, Section 9",
                "verifiedDate": "2026-08-15"
            },
            {
                "id": "fact-velocity",
                "category": "Performance Benchmark",
                "claim": "Up to 40% reduction in review turnaround cycles",
                "source": "Q3 Enterprise Customer Benchmark Report",
                "verifiedDate": "2026-09-01"
            },
            {
                "id": "fact-security",
                "category": "Compliance & Security",
                "claim": "SOC 2 Type II Certified & GDPR / HIPAA Compliant",
                "source": "Trust & Security Portal (SEC-2026-T2)",
                "verifiedDate": "2026-07-20"
            }
        ]
    }
}

def get_relative_luminance(hex_str: str) -> float:
    """Calculates WCAG 2.1 relative luminance from RGB hex."""
    clean = hex_str.lstrip('#')
    if len(clean) != 6:
        return 1.0
    r = int(clean[0:2], 16) / 255.0
    g = int(clean[2:4], 16) / 255.0
    b = int(clean[4:6], 16) / 255.0

    def to_linear(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * to_linear(r) + 0.7152 * to_linear(g) + 0.0722 * to_linear(b)

def calculate_contrast_ratio(hex1: str, hex2: str) -> float:
    """Calculates WCAG 2.1 contrast ratio between two colors."""
    lum1 = get_relative_luminance(hex1)
    lum2 = get_relative_luminance(hex2)
    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)
    return round((lighter + 0.05) / (darker + 0.05), 2)

def verify_content(text: str, image_meta: Optional[ImageMetadata] = None, brand_id: str = "inkloom") -> InspectionResponse:
    brand = BRAND_KNOWLEDGE.get(brand_id, BRAND_KNOWLEDGE["inkloom"])
    findings: List[Finding] = []

    # 1. Deterministic Lexicon & Tone Linter
    for rule in brand.get("bannedTerms", []):
        pattern = re.compile(rf"\b{re.escape(rule['term'])}\b", re.IGNORECASE)
        for match in pattern.finditer(text):
            findings.append(Finding(
                id=f"lexicon-{rule['term']}-{match.start()}",
                category="Terminology & Lexicon" if rule["severity"] != "critical" or "voice" not in rule["rule"].lower() else "Tone & Voice",
                severity=rule["severity"],
                flaggedText=match.group(0),
                startIndex=match.start(),
                endIndex=match.end(),
                rule=rule["rule"],
                sourceCitation=f"Brand Manual {rule['rule']}",
                explanation=rule["reason"],
                suggestedReplacement=rule["replacement"],
                alternatives=AlternativeOptions(
                    conservative=rule.get("conservative", rule["replacement"]),
                    balanced=rule.get("balanced", rule["replacement"]),
                    creative=rule.get("creative", rule["replacement"])
                )
            ))

    # 2. Factual Grounding Claims Filter
    claim_patterns = [
        {
            "regex": re.compile(r"(?:100%|guarantee[ds]?\s+100%|zero\s+downtime|instant\s+recovery)", re.IGNORECASE),
            "category": "Factual Claim Grounding",
            "severity": "critical",
            "rule": "§4.1 Promotional Claims & SLA Accuracy",
            "sourceCitation": "Master Service Agreement 2026, Section 9 (Uptime SLA)",
            "explanation": "Our SLA is 99.95%, not 100%. Legally, absolute zero-downtime claims violate warranty safe harbors.",
            "conservative": "engineered for 99.95% high-availability enterprise uptime",
            "balanced": "delivering enterprise-grade 99.95% high-availability recovery",
            "creative": "relentless 99.95% resilience when every millisecond counts"
        },
        {
            "regex": re.compile(r"(?:cheapest\s+in\s+(?:the\s+)?world|cheapest\s+(?:software|tool|platform|solution))", re.IGNORECASE),
            "category": "Factual Claim Grounding",
            "severity": "warning",
            "rule": "§2.3 Brand Value Positioning",
            "sourceCitation": "Brand Strategy Handbook §2.3 (Premium Positioning)",
            "explanation": "We position as high-value enterprise grade. 'Cheapest' commoditizes brand trust.",
            "conservative": "highly cost-effective enterprise solution with transparent pricing",
            "balanced": "maximizing ROI with transparent, accessible enterprise tiers",
            "creative": "unlocking unmatched governance power without enterprise sticker shock"
        }
    ]

    for claim in claim_patterns:
        for match in claim["regex"].finditer(text):
            # Prevent duplicate finding if already caught by lexicon
            if not any(abs(f.startIndex - match.start()) < 5 for f in findings):
                findings.append(Finding(
                    id=f"claim-{match.start()}",
                    category=claim["category"],
                    severity=claim["severity"],
                    flaggedText=match.group(0),
                    startIndex=match.start(),
                    endIndex=match.end(),
                    rule=claim["rule"],
                    sourceCitation=claim["sourceCitation"],
                    explanation=claim["explanation"],
                    suggestedReplacement=claim["balanced"],
                    alternatives=AlternativeOptions(
                        conservative=claim["conservative"],
                        balanced=claim["balanced"],
                        creative=claim["creative"]
                    )
                ))

    # 3. Multimodal Visual Identity & WCAG Contrast Inspector
    if image_meta:
        # Check WCAG contrast
        contrast = image_meta.contrastRatio
        if contrast is None and image_meta.textColor and image_meta.backgroundColor:
            contrast = calculate_contrast_ratio(image_meta.textColor, image_meta.backgroundColor)

        if contrast is not None and contrast < brand.get("minContrastRatio", 4.5):
            findings.append(Finding(
                id=f"visual-contrast-{int(datetime.utcnow().timestamp())}",
                category="Visual & Accessibility (WCAG 2.1)",
                severity="critical",
                flaggedText=f"Text Contrast Ratio: {contrast:.2f}:1",
                startIndex=0,
                endIndex=0,
                rule="WCAG 2.1 Level AA (Criterion 1.4.3: Contrast Minimum)",
                sourceCitation="Global Accessibility Standards & Brand Visual Kit §5.1",
                explanation=f"Calculated contrast ratio is {contrast:.2f}:1, failing the mandatory 4.5:1 minimum threshold.",
                suggestedReplacement="Adjust text color to dark neutral (#0F172A) or darken background to reach >= 4.5:1.",
                alternatives=AlternativeOptions(
                    conservative="Switch text to dark neutral #0F172A (9.8:1 contrast ratio)",
                    balanced="Add 40% semi-transparent dark backing scrim behind text",
                    creative="Use brand primary gradient (#4F46E5) with crisp white text"
                ),
                visualData={"contrastRatio": contrast, "requiredRatio": 4.5}
            ))

        # Check Logo Clearance
        if image_meta.hasLogo and image_meta.logoPaddingPx and image_meta.logoPaddingPx < brand.get("logoClearSpacePx", 24):
            findings.append(Finding(
                id=f"visual-logo-{int(datetime.utcnow().timestamp())}",
                category="Logo Integrity",
                severity="warning",
                flaggedText=f"Logo Clearance: {image_meta.logoPaddingPx}px",
                startIndex=0,
                endIndex=0,
                rule="§5.4 Logo Clearance & Safe Zones",
                sourceCitation="Brand Assets Guidebook §5.4",
                explanation=f"Logo boundary-box has only {image_meta.logoPaddingPx}px padding (minimum 24px required).",
                suggestedReplacement="Increase margin around the logo asset to at least 24px.",
                alternatives=AlternativeOptions(
                    conservative="Add 24px uniform padding around logo",
                    balanced="Re-position logo to top-right corner with 32px safe zone",
                    creative="Separate logo into dedicated header band"
                )
            ))

    # Calculate Score
    score = 100
    for f in findings:
        if f.severity == "critical":
            score -= 22
        elif f.severity == "warning":
            score -= 10
        elif f.severity == "advisory":
            score -= 4

    final_score = max(12, min(100, score))
    status = "APPROVED"
    if any(f.severity == "critical" for f in findings):
        status = "BLOCKED"
    elif any(f.severity == "warning" for f in findings):
        status = "REQUIRES_REVIEW"

    return InspectionResponse(
        timestamp=datetime.utcnow().isoformat() + "Z",
        score=final_score,
        status=status,
        findingsCount=len(findings),
        criticalCount=sum(1 for f in findings if f.severity == "critical"),
        warningCount=sum(1 for f in findings if f.severity == "warning"),
        advisoryCount=sum(1 for f in findings if f.severity == "advisory"),
        findings=findings,
        summary=InspectionSummary(
            toneQuality="Needs Refinement" if any(f.category == "Tone & Voice" for f in findings) else "Aligned",
            factIntegrity="Discrepancies Detected" if any(f.category == "Factual Claim Grounding" for f in findings) else "Verified",
            visualCompliance="Non-Compliant" if any("Visual" in f.category for f in findings) else "Approved"
        )
    )
