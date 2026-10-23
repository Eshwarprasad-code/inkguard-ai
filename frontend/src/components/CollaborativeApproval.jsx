import React from 'react';
import { 
  ShieldCheck, UserCheck, Scale, Clock, CheckCircle2, AlertCircle, 
  Download, Printer, FileText, Check, Lock, Award, Share2
} from 'lucide-react';

export default function CollaborativeApproval({
  currentRole,
  scanResults,
  brandManagerApproved,
  setBrandManagerApproved,
  legalApproved,
  setLegalApproved,
  auditLogs,
  onTriggerConfetti
}) {
  const isFullyCertified = scanResults?.score >= 90 && brandManagerApproved && legalApproved;

  const handleBrandApproval = () => {
    setBrandManagerApproved(true);
    if (legalApproved) onTriggerConfetti();
  };

  const handleLegalApproval = () => {
    setLegalApproved(true);
    if (brandManagerApproved) onTriggerConfetti();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
      
      {/* LEFT: MULTI-STAKEHOLDER SIGN-OFF CANVAS */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, padding: 0, background: 'none', border: 'none', color: 'var(--text-primary)' }}>
            Collaborative Sign-Off & Review Governance
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Role-based multi-stakeholder approvals with immutable revision tracking
          </p>
        </div>

        {/* 3 Stakeholder Approval Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* 1. Content Creator Status */}
          <div style={{ 
            padding: '16px', 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--border-light)',
            background: 'var(--bg-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'var(--primary-100)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✍️
              </div>
              <div>
                <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                  Creator Pre-Flight Self-Audit
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Draft submitted & intent-preserving alternatives reviewed
                </span>
              </div>
            </div>

            <span className="severity-chip compliant" style={{ fontSize: '0.75rem' }}>
              <CheckCircle2 size={13} /> Completed
            </span>
          </div>

          {/* 2. Brand Manager Approval Card */}
          <div style={{ 
            padding: '16px', 
            borderRadius: 'var(--radius-md)', 
            border: `1.5px solid ${brandManagerApproved ? 'var(--status-success-border)' : 'var(--border-light)'}`,
            background: brandManagerApproved ? 'var(--status-success-bg)' : 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                  Brand Manager Sign-Off
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Visual palette, tone consistency & logo safe zone verification
                </span>
              </div>
            </div>

            {brandManagerApproved ? (
              <span className="severity-chip compliant">
                <CheckCircle2 size={13} /> Approved by Brand
              </span>
            ) : (
              <button 
                onClick={handleBrandApproval}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.8125rem' }}
              >
                Grant Brand Sign-Off
              </button>
            )}
          </div>

          {/* 3. Legal & Regulatory Approval Card */}
          <div style={{ 
            padding: '16px', 
            borderRadius: 'var(--radius-md)', 
            border: `1.5px solid ${legalApproved ? 'var(--status-success-border)' : 'var(--border-light)'}`,
            background: legalApproved ? 'var(--status-success-bg)' : 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scale size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                  Legal & Factual Verification
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  99.95% SLA verification, disclaimers & commercial claim bounds
                </span>
              </div>
            </div>

            {legalApproved ? (
              <span className="severity-chip compliant">
                <CheckCircle2 size={13} /> Verified by Legal
              </span>
            ) : (
              <button 
                onClick={handleLegalApproval}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.8125rem' }}
              >
                Grant Legal Sign-Off
              </button>
            )}
          </div>
        </div>

        {/* Official Publication Certificate Card */}
        <div style={{ 
          marginTop: 'auto', 
          border: '2px solid', 
          borderColor: isFullyCertified ? 'var(--status-success)' : 'var(--border-light)',
          borderRadius: 'var(--radius-lg)', 
          padding: '20px',
          background: isFullyCertified ? 'var(--bg-surface)' : 'var(--bg-surface-subtle)',
          boxShadow: isFullyCertified ? '0 10px 25px rgba(16, 185, 129, 0.15)' : 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: 'var(--radius-full)', 
                background: isFullyCertified ? 'var(--status-success-bg)' : 'var(--bg-surface-subtle)',
                color: isFullyCertified ? 'var(--status-success)' : 'var(--text-muted)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Award size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                  Cryptographic Brand Certificate
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  REF: CERT-INKGUARD-2026-998A
                </span>
              </div>
            </div>

            <span className={`severity-chip ${isFullyCertified ? 'compliant' : 'warning'}`}>
              {isFullyCertified ? 'VERIFIED FOR RELEASE' : 'PENDING APPROVALS'}
            </span>
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            {isFullyCertified ? (
              <span>
                ✓ This asset has passed all automated brand governance checks, meets WCAG 2.1 contrast thresholds, and has obtained unanimous stakeholder authorization.
              </span>
            ) : (
              <span>
                Resolving all Critical Blockers and obtaining Brand + Legal sign-offs will unlock the verified publication certificate.
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              disabled={!isFullyCertified}
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8125rem', gap: '6px' }}
            >
              <Printer size={14} /> Print Certificate
            </button>
            <button 
              disabled={!isFullyCertified}
              onClick={() => alert('Certificate hash exported to audit ledger: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8125rem', gap: '6px' }}
            >
              <Share2 size={14} /> Copy Verification Hash
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: REAL-TIME AUDIT TRAIL LOG */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Audit Trail & Revision History
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Immutable timeline of scans, rewrites & approvals
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {auditLogs.length} Events
          </span>
        </div>

        {/* Timeline Event Feed */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
          {auditLogs.map((log, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                gap: '12px', 
                padding: '10px 12px', 
                borderRadius: 'var(--radius-sm)', 
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-light)',
                fontSize: '0.8125rem'
              }}
            >
              <Clock size={15} style={{ color: 'var(--primary-600)', marginTop: '2px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{log.action}</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {log.time}
                  </span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  {log.details}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
