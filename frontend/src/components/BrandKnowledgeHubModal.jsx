import React, { useState } from 'react';
import { X, BookOpen, Plus, Trash2, CheckCircle2, Shield, Palette, FileText, Check } from 'lucide-react';

export default function BrandKnowledgeHubModal({ 
  isOpen, 
  onClose, 
  brandGuidelines, 
  onUpdateGuidelines 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('facts'); // 'facts', 'lexicon', 'visual'
  
  // Local state for adding a new fact
  const [newFactClaim, setNewFactClaim] = useState('');
  const [newFactSource, setNewFactSource] = useState('');
  const [newFactCategory, setNewFactCategory] = useState('Product Capability');

  // Local state for adding a new banned term
  const [newTerm, setNewTerm] = useState('');
  const [newReplacement, setNewReplacement] = useState('');
  const [newRule, setNewRule] = useState('§2.1 Terminology');

  const handleAddFact = (e) => {
    e.preventDefault();
    if (!newFactClaim.trim()) return;

    const newFact = {
      id: `fact-${Date.now()}`,
      category: newFactCategory,
      claim: newFactClaim,
      source: newFactSource || 'Corporate Governance Doc 2026',
      verifiedDate: new Date().toISOString().split('T')[0],
      details: 'Added dynamically during review session.'
    };

    onUpdateGuidelines({
      ...brandGuidelines,
      approvedFacts: [newFact, ...brandGuidelines.approvedFacts]
    });

    setNewFactClaim('');
    setNewFactSource('');
  };

  const handleAddBannedTerm = (e) => {
    e.preventDefault();
    if (!newTerm.trim() || !newReplacement.trim()) return;

    const newRuleItem = {
      term: newTerm.trim(),
      replacement: newReplacement.trim(),
      rule: newRule,
      severity: 'warning',
      reason: 'Prohibited by active brand governance rules'
    };

    onUpdateGuidelines({
      ...brandGuidelines,
      bannedTerms: [newRuleItem, ...brandGuidelines.bannedTerms]
    });

    setNewTerm('');
    setNewReplacement('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid var(--border-light)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'var(--bg-surface-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <BookOpen size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, padding: 0, background: 'none', border: 'none', color: 'var(--text-primary)' }}>
                Brand Knowledge Hub & Single Source of Truth
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Living guidelines: {brandGuidelines.name} (v{brandGuidelines.version})
              </span>
            </div>
          </div>

          <button onClick={onClose} className="icon-button">
            <X size={18} />
          </button>
        </div>

        {/* Modal Sub-tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', padding: '0 24px', background: 'var(--bg-surface)' }}>
          <button 
            className={`tab-btn ${activeTab === 'facts' ? 'active' : ''}`}
            onClick={() => setActiveTab('facts')}
          >
            <Shield size={16} /> Approved Corporate Fact Base ({brandGuidelines.approvedFacts?.length || 0})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lexicon' ? 'active' : ''}`}
            onClick={() => setActiveTab('lexicon')}
          >
            <FileText size={16} /> Banned & Deprecated Lexicon ({brandGuidelines.bannedTerms?.length || 0})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'visual' ? 'active' : ''}`}
            onClick={() => setActiveTab('visual')}
          >
            <Palette size={16} /> Visual & WCAG Tokens
          </button>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* TAB 1: APPROVED FACT BASE */}
          {activeTab === 'facts' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Verified Company Fact Repository
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                  Marketing claims are semantically grounded against this table. Any assertion conflicting with verified values triggers a Critical Blocker.
                </p>
              </div>

              {/* Add New Fact Input */}
              <form onSubmit={handleAddFact} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  placeholder="New verified company fact (e.g. 99.95% Uptime SLA)..."
                  value={newFactClaim}
                  onChange={(e) => setNewFactClaim(e.target.value)}
                  className="form-input"
                  style={{ flex: 2, fontSize: '0.8125rem' }}
                />
                <input 
                  type="text" 
                  placeholder="Official Source (e.g. MSA §9)..."
                  value={newFactSource}
                  onChange={(e) => setNewFactSource(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, fontSize: '0.8125rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={14} /> Add Fact
                </button>
              </form>

              {/* Facts Feed */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {brandGuidelines.approvedFacts.map(fact => (
                  <div 
                    key={fact.id}
                    style={{ 
                      padding: '12px 16px', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-surface-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span className="severity-chip compliant" style={{ fontSize: '0.7rem' }}>
                          {fact.category}
                        </span>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                          {fact.claim}
                        </strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Source: <strong>{fact.source}</strong> &bull; Verified: {fact.verifiedDate}
                      </div>
                    </div>

                    <CheckCircle2 size={18} style={{ color: 'var(--status-success)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BANNED TERMINOLOGY & LEXICON */}
          {activeTab === 'lexicon' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Active Lexicon & Deprecated Terms
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                  Deterministic linting rules that catch prohibited terms, legacy naming, and abusive language with zero false negatives.
                </p>
              </div>

              {/* Add New Banned Term Input */}
              <form onSubmit={handleAddBannedTerm} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Prohibited term (e.g. cheap)..."
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, fontSize: '0.8125rem' }}
                />
                <input 
                  type="text" 
                  placeholder="Approved replacement..."
                  value={newReplacement}
                  onChange={(e) => setNewReplacement(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, fontSize: '0.8125rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={14} /> Add Rule
                </button>
              </form>

              {/* Lexicon List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {brandGuidelines.bannedTerms.map((b, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      padding: '12px', 
                      borderRadius: 'var(--radius-sm)', 
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-surface-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        textDecoration: 'line-through', 
                        color: 'var(--status-error)', 
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--font-mono)' 
                      }}>
                        "{b.term}"
                      </span>
                      <span className={`severity-chip ${b.severity}`} style={{ fontSize: '0.65rem' }}>
                        {b.severity}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--status-success)', fontWeight: 600 }}>
                      ✓ Use: "{b.replacement}"
                    </div>

                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Rule: {b.rule} &bull; {b.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL TOKENS & WCAG */}
          {activeTab === 'visual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  Design Tokens & Color Palette
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                  Calculated against WCAG 2.1 contrast formulas to prevent visual degradation and accessibility violations.
                </p>
              </div>

              {/* Swatch Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}>
                  <div style={{ width: '100%', height: '60px', borderRadius: 'var(--radius-sm)', background: brandGuidelines.visualTokens.primaryColor, marginBottom: '10px' }} />
                  <strong style={{ fontSize: '0.875rem', display: 'block' }}>Primary Brand Color</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {brandGuidelines.visualTokens.primaryColor} ({brandGuidelines.visualTokens.primaryName})
                  </span>
                </div>

                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}>
                  <div style={{ width: '100%', height: '60px', borderRadius: 'var(--radius-sm)', background: brandGuidelines.visualTokens.secondaryColor, marginBottom: '10px' }} />
                  <strong style={{ fontSize: '0.875rem', display: 'block' }}>Secondary Accent</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {brandGuidelines.visualTokens.secondaryColor} ({brandGuidelines.visualTokens.secondaryName})
                  </span>
                </div>

                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}>
                  <div style={{ width: '100%', height: '60px', borderRadius: 'var(--radius-sm)', background: brandGuidelines.visualTokens.accentColor, marginBottom: '10px' }} />
                  <strong style={{ fontSize: '0.875rem', display: 'block' }}>Verified Accent</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {brandGuidelines.visualTokens.accentColor} ({brandGuidelines.visualTokens.accentName})
                  </span>
                </div>
              </div>

              {/* Standards Summary */}
              <div style={{ 
                padding: '16px', 
                borderRadius: 'var(--radius-md)', 
                background: 'var(--bg-surface-subtle)', 
                border: '1px solid var(--border-light)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                fontSize: '0.8125rem'
              }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                    Accessibility Standard: WCAG 2.1 Level AA
                  </strong>
                  <span style={{ color: 'var(--text-muted)' }}>
                    All text overlays require a minimum contrast ratio of <strong>4.5:1</strong> against adjacent background pixels.
                  </span>
                </div>

                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                    Logo Safe Zone & Clear Space: 24px
                  </strong>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Minimum boundary-box padding required on all promotional banners and sales collateral.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ 
          padding: '16px 24px', 
          borderTop: '1px solid var(--border-light)', 
          background: 'var(--bg-surface-subtle)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Save & Return to Pre-Flight Studio
          </button>
        </div>
      </div>
    </div>
  );
}
