import React from 'react';
import { 
  BarChart3, TrendingUp, AlertTriangle, Lightbulb, Users, CheckCircle2, 
  Layers, ArrowUpRight, ShieldCheck, Zap
} from 'lucide-react';

export default function GovernanceRadar() {
  const ambiguityAlerts = [
    {
      id: 'amb-1',
      ruleId: 'Rule §2.3: "Bold yet humble tone"',
      category: 'Voice & Tone',
      disputeRate: '46%',
      disputeCount: 28,
      status: 'High Ambiguity',
      creatorFeedback: '"Creators report that sounding simultaneously bold and humble feels contradictory without positive reference samples."',
      actionableFix: 'Update brand guide §2.3 with side-by-side approved vs rejected examples for product announcements.'
    },
    {
      id: 'amb-2',
      ruleId: 'Rule §4.2: "Permitted Superlatives"',
      category: 'Claims & Factual Grounding',
      disputeRate: '32%',
      disputeCount: 19,
      status: 'Moderate Ambiguity',
      creatorFeedback: '"Unclear whether terms like \'leading platform\' are acceptable when backed by verified 450+ customer metric."',
      actionableFix: 'Codify an approved whitelist of verified, data-backed claims in the Corporate Fact Repository.'
    },
    {
      id: 'amb-3',
      ruleId: 'Rule §5.1: "Secondary Yellow Text Overlays"',
      category: 'Visual & WCAG 2.1',
      disputeRate: '28%',
      disputeCount: 14,
      status: 'Design System Gap',
      creatorFeedback: '"Designers frequently overlay white text on secondary yellow (#FDE047), causing 1.3:1 contrast failures."',
      actionableFix: 'Add design token constraint: mandatory Navy (#0F172A) text whenever secondary yellow background is selected.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 4 Top KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Assets Governed</span>
            <Layers size={18} style={{ color: 'var(--primary-600)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>1,248</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-success)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +34% volume growth this quarter
          </div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Mean Compliance Score</span>
            <ShieldCheck size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>91.2<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-success)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +18.4 pts since deploying InkGuard
          </div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Review Turnaround</span>
            <Zap size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>18 mins</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-success)', marginTop: '4px' }}>
            Down from 4.2 business days (93% faster)
          </div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Prevented Incidents</span>
            <CheckCircle2 size={18} style={{ color: 'var(--primary-600)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>412</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Zero public SLA claim breaches in 2026
          </div>
        </div>
      </div>

      {/* Main Grid: Guideline Ambiguity Radar & Recurring Mistake Patterns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        
        {/* THE GUIDELINE AMBIGUITY RADAR (ORIGINAL INNOVATION) */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="judge-demo-badge" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)' }}>
                  Reverse Governance Intelligence
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  The Guideline Ambiguity Radar
                </h3>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Identifies which corporate guidelines cause frequent creator overrides, long review debates, or confusion.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {ambiguityAlerts.map(alert => (
              <div 
                key={alert.id}
                style={{ 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-surface-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="severity-chip warning">
                      <AlertTriangle size={12} /> {alert.status}
                    </span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                      {alert.ruleId}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-error)', fontFamily: 'var(--font-mono)' }}>
                    {alert.disputeRate} Creator Dispute Rate
                  </span>
                </div>

                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  {alert.creatorFeedback}
                </div>

                <div style={{ 
                  marginTop: '4px',
                  padding: '8px 10px', 
                  background: 'var(--bg-surface)', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem'
                }}>
                  <Lightbulb size={16} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Recommended Guideline Revision:</strong> {alert.actionableFix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECURRING MISTAKE DISTRIBUTION & DEPARTMENT BREAKDOWN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Mistake Categories */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              Recurring Mistake Distribution
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Terminology & Deprecated Jargon</span>
                  <strong style={{ color: 'var(--text-muted)' }}>42%</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: '42%', height: '100%', background: 'var(--primary-600)', borderRadius: 'var(--radius-full)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Unverified Factual Claims & Superlatives</span>
                  <strong style={{ color: 'var(--text-muted)' }}>34%</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: '34%', height: '100%', background: 'var(--status-error)', borderRadius: 'var(--radius-full)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>WCAG 2.1 Contrast & Color Inconsistencies</span>
                  <strong style={{ color: 'var(--text-muted)' }}>16%</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: '16%', height: '100%', background: 'var(--status-warning)', borderRadius: 'var(--radius-full)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Tone & Aggressive Voice Flaws</span>
                  <strong style={{ color: 'var(--text-muted)' }}>8%</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: '8%', height: '100%', background: 'var(--status-info)', borderRadius: 'var(--radius-full)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Department Compliance Leaderboard */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
              Publishing Team Compliance
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>Product Marketing Team</span>
                <span className="severity-chip compliant">94% Pass Rate</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>Global Social Media Team</span>
                <span className="severity-chip warning">82% Pass Rate</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                <span>External Agency (Contractors)</span>
                <span className="severity-chip critical">74% Pass Rate</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
