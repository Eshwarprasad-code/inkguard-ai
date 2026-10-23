import React from 'react';
import { Award, Zap, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

export default function JudgeDemoBar({ 
  onLoadScenario, 
  onRunScan, 
  onAutoFix, 
  onViewCertificate,
  hasScanned,
  scanResults 
}) {
  return (
    <div className="judge-demo-banner">
      <div className="judge-demo-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="judge-demo-badge">
              <Award size={14} /> Round 2 Evaluator Runway
            </span>
            <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
              Test End-to-End Workflow in 3 Clicks
            </strong>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
            Inspect how InkGuard AI detects ungrounded SLA claims, bad WCAG contrast, and tone violations—then explains each issue and applies intent-preserving rewrites.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => onLoadScenario('scenario-multi-risk')}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: 600, fontSize: '0.8125rem' }}
          >
            <Zap size={14} style={{ color: 'var(--status-warning)' }} />
            <span>1. Load Benchmark Draft</span>
          </button>

          <button 
            onClick={onRunScan}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 600, fontSize: '0.8125rem' }}
          >
            <Sparkles size={14} />
            <span>2. Run Pre-Flight Scan</span>
          </button>

          {hasScanned && scanResults?.findingsCount > 0 && (
            <button 
              onClick={onAutoFix}
              className="btn btn-success btn-sm"
              style={{ fontWeight: 600, fontSize: '0.8125rem' }}
              title="Apply verified, intent-preserving balanced rewrites to all flagged sentences"
            >
              <CheckCircle2 size={14} />
              <span>3. 1-Click Fix All Issues</span>
            </button>
          )}

          {scanResults?.score >= 90 && (
            <button 
              onClick={onViewCertificate}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 600, fontSize: '0.8125rem', borderColor: 'var(--status-success)', color: 'var(--status-success)' }}
            >
              <Award size={14} />
              <span>4. View Certified Seal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
