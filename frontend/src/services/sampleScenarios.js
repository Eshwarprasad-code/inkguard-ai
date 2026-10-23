// ==========================================================================
// InkGuard AI — Pre-Configured Test Scenarios for Hackathon Evaluation
// ==========================================================================

export const SAMPLE_SCENARIOS = [
  {
    id: 'scenario-multi-risk',
    title: '🚨 High-Risk Product Launch (Judge Benchmark)',
    badge: 'Multi-Violation Test',
    description: 'Realistic draft with ungrounded SLA claims, deprecated naming, hostile tone, and an inaccessible banner.',
    text: `🚀 Excited to announce our newest cloud release! 

Our platform guarantees 100% instant recovery with zero downtime for all enterprise workloads. Built on top of the original Inkloom v1 engine, this is without question the cheapest software in the universe.

Don't be an idiot and stick with legacy tools that slow you down. Upgrade today and experience 100% bug-free deployments forever!`,
    image: {
      name: 'launch_banner_v1.png',
      width: 1200,
      height: 630,
      textColor: '#FFFFFF',
      backgroundColor: '#FDE047', // Light yellow background -> terrible contrast with white!
      dominantColor: '#FDE047',
      contrastRatio: 1.34, // Well below 4.5:1 WCAG AA
      hasLogo: true,
      logoPaddingPx: 8, // Below 24px required clearance
      previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 315" width="100%" height="100%">
        <rect width="600" height="315" fill="#FDE047"/>
        <rect x="8" y="8" width="60" height="28" rx="4" fill="#0F172A"/>
        <text x="18" y="26" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="11">LOGO</text>
        <text x="30" y="140" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="28">100% ZERO DOWNTIME</text>
        <text x="30" y="180" fill="#FFFFFF" font-family="sans-serif" font-weight="600" font-size="16">Cheapest Cloud Platform On Earth</text>
        <rect x="30" y="210" width="160" height="36" rx="6" fill="#4F46E5"/>
        <text x="54" y="233" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="13">Claim Free Trial</text>
      </svg>`
    }
  },
  {
    id: 'scenario-unsupported-claims',
    title: '⚠️ Sales Outreach with Superlatives & Jargon',
    badge: 'Claim & Lexicon Risk',
    description: 'Draft with unsupported commercial superlatives, legacy naming, and colloquial slang.',
    text: `Hey team, check out the new sales deck! We are positioning this as the #1 platform in the universe for brand control. 

Our engineers put together a hacky workaround that lets clients skip approvals altogether. Plus, we are offering the cheapest software package in the market compared to any competitor.`,
    image: null
  },
  {
    id: 'scenario-compliant',
    title: '✅ Fully Compliant & Certified Press Release',
    badge: '100% On-Brand Benchmark',
    description: 'Polished draft adhering to all voice, fact, and visual guidelines. Ready for publication sign-off.',
    text: `Inkloom AI today announced the deployment of its Intelligent Brand Governance platform across 450+ high-growth organizations. 

Backed by our 99.95% high-availability SLA and SOC 2 Type II certified architecture, marketing teams reported up to a 40% reduction in pre-publication revision turnaround times. 

"Maintaining brand trust at high content velocity requires proactive verification, not bureaucratic bottlenecks," said the team. New users can explore a 14-day unrestricted trial with zero credit card required.`,
    image: {
      name: 'compliant_press_hero.png',
      width: 1200,
      height: 630,
      textColor: '#FFFFFF',
      backgroundColor: '#0F172A', // Dark navy background
      dominantColor: '#4F46E5', // Inkloom Indigo
      contrastRatio: 12.8, // Super high WCAG AAA contrast
      hasLogo: true,
      logoPaddingPx: 32, // Ample > 24px clearance
      previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 315" width="100%" height="100%">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0F172A;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="600" height="315" fill="url(#grad1)"/>
        <rect x="32" y="32" width="70" height="30" rx="6" fill="#10B981"/>
        <text x="44" y="52" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="12">INKGUARD</text>
        <text x="32" y="150" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="26">Intelligent Brand Governance</text>
        <text x="32" y="185" fill="#E0E7FF" font-family="sans-serif" font-weight="500" font-size="15">Empowering Content Velocity Without Brand Vulnerability</text>
        <rect x="32" y="220" width="170" height="40" rx="8" fill="#10B981"/>
        <text x="56" y="245" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="13">Explore Live Case Study</text>
      </svg>`
    }
  }
];
