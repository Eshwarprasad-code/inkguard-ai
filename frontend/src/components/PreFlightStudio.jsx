import React, { useState } from 'react';
import { 
  Sparkles, AlertCircle, AlertTriangle, Info, CheckCircle2, ArrowRight, 
  RotateCcw, Image as ImageIcon, FileText, ChevronDown, ChevronUp, ShieldAlert,
  Sliders, MessageSquare, ExternalLink, Wand2
} from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../services/sampleScenarios';

export default function PreFlightStudio({
  text,
  setText,
  imageAsset,
  setImageAsset,
  onRunScan,
  isScanning,
  scanResults,
  onApplyRewrite,
  onRequestExemption,
  currentRole
}) {
  const [selectedScenarioId, setSelectedScenarioId] = useState('scenario-multi-risk');
  const [expandedFindings, setExpandedFindings] = useState({});
  const [exemptionNotes, setExemptionNotes] = useState({});

  const handleScenarioChange = (e) => {
    const scId = e.target.value;
    setSelectedScenarioId(scId);
    const sc = SAMPLE_SCENARIOS.find(s => s.id === scId);
    if (sc) {
      setText(sc.text);
      setImageAsset(sc.image);
    }
  };

  const toggleFinding = (id) => {
    setExpandedFindings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const submitExemption = (findingId) => {
    const note = exemptionNotes[findingId] || 'Requested creator exemption for promotional campaign';
    onRequestExemption(findingId, note);
    setExemptionNotes(prev => ({ ...prev, [findingId]: '' }));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.25fr)', gap: '24px' }}>
      
      {/* LEFT COLUMN: CREATOR INPUT CANVAS */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Scenario Pre-loader Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, padding: 0, background: 'none', border: 'none', color: 'var(--text-primary)' }}>
              1. Draft Input Canvas
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Submit copy and visual promotional assets for real-time brand verification
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Preset:</span>
            <select 
              value={selectedScenarioId} 
              onChange={handleScenarioChange}
              className="form-select"
              style={{ fontSize: '0.8125rem', padding: '5px 10px', borderRadius: 'var(--radius-sm)' }}
            >
              {SAMPLE_SCENARIOS.map(sc => (
                <option key={sc.id} value={sc.id}>{sc.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="form-group" style={{ margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={15} style={{ color: 'var(--primary-600)' }} />
              <span>Marketing Copy & Text Content</span>
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {text.trim().split(/\s+/).filter(Boolean).length} words &bull; {text.length} chars
            </span>
          </div>

          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your draft marketing copy, ad text, press release, or social media post here..."
            className="form-textarea"
            rows={10}
            style={{ 
              fontSize: '0.9375rem', 
              lineHeight: 1.6,
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Visual Asset Uploader & Preview */}
        <div style={{ border: '1px dashed var(--border-hover)', borderRadius: 'var(--radius-md)', padding: '16px', background: 'var(--bg-surface-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ImageIcon size={16} style={{ color: 'var(--primary-600)' }} />
              <span>Multi-Modal Visual Asset (Banner / Graphic)</span>
            </span>

            {imageAsset && (
              <button 
                onClick={() => setImageAsset(null)} 
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.7rem', padding: '2px 8px' }}
              >
                Remove
              </button>
            )}
          </div>

          {imageAsset ? (
            <div>
              {/* Visual Asset Preview */}
              <div 
                style={{ 
                  borderRadius: 'var(--radius-sm)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border-light)',
                  maxHeight: '180px',
                  position: 'relative'
                }}
                dangerouslySetInnerHTML={{ __html: imageAsset.previewSvg }}
              />

              {/* Multimodal Diagnostics Strip */}
              <div style={{ 
                marginTop: '12px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '8px',
                fontSize: '0.75rem' 
              }}>
                <div style={{ background: 'var(--bg-surface)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Dominant Palette</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: imageAsset.dominantColor, display: 'inline-block', border: '1px solid rgba(0,0,0,0.1)' }} />
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{imageAsset.dominantColor}</strong>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>WCAG 2.1 Contrast</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ color: imageAsset.contrastRatio >= 4.5 ? 'var(--status-success)' : 'var(--status-error)' }}>
                      {imageAsset.contrastRatio}:1
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: imageAsset.contrastRatio >= 4.5 ? 'var(--status-success)' : 'var(--status-error)' }}>
                      {imageAsset.contrastRatio >= 4.5 ? '✓ Pass AA' : '✗ Fails AA (4.5)'}
                    </span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Logo Clearance</div>
                  <div>
                    <strong style={{ color: imageAsset.logoPaddingPx >= 24 ? 'var(--status-success)' : 'var(--status-warning)' }}>
                      {imageAsset.logoPaddingPx}px
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                      (Min 24px)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                No visual asset attached. Select a preset above to load sample marketing graphics.
              </p>
              <button 
                onClick={() => handleScenarioChange({ target: { value: 'scenario-multi-risk' } })}
                className="btn btn-secondary btn-sm"
              >
                Load Sample Banner
              </button>
            </div>
          )}
        </div>

        {/* Scan Action Controls */}
        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '8px' }}>
          <button 
            onClick={onRunScan}
            disabled={isScanning || !text.trim()}
            className="btn btn-primary"
            style={{ flex: 1, padding: '12px 20px', fontSize: '0.9375rem' }}
          >
            {isScanning ? (
              <>
                <Wand2 className="animate-spin" size={18} />
                <span>Auditing Voice, Facts & Visuals...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Run Pre-Flight Brand Verification</span>
              </>
            )}
          </button>

          <button 
            onClick={() => { setText(''); setImageAsset(null); }}
            className="btn btn-secondary"
            title="Clear canvas"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE FINDINGS & EXPLAINABILITY CANVAS */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header & Score Bar */}
        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, padding: 0, background: 'none', border: 'none', color: 'var(--text-primary)' }}>
                2. Explainable Verification Matrix
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Automated pre-flight findings, guideline citations, and intent-preserving rewrites
              </p>
            </div>

            {scanResults && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: 'flex-end' }}>
                  <span style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 800,
                    color: scanResults.score >= 90 ? 'var(--status-success)' : scanResults.score >= 70 ? 'var(--status-warning)' : 'var(--status-error)'
                  }}>
                    {scanResults.score}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>/100</span>
                </div>
                <span className={`severity-chip ${scanResults.status === 'APPROVED' ? 'compliant' : scanResults.status === 'REQUIRES_REVIEW' ? 'warning' : 'critical'}`}>
                  {scanResults.status.replace('_', ' ')}
                </span>
              </div>
            )}
          </div>

          {/* Severity Breakdown Strip */}
          {scanResults && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
              <span className="severity-chip critical">
                <AlertCircle size={13} /> {scanResults.criticalCount} Critical Blockers
              </span>
              <span className="severity-chip warning">
                <AlertTriangle size={13} /> {scanResults.warningCount} Warnings
              </span>
              <span className="severity-chip advisory">
                <Info size={13} /> {scanResults.advisoryCount} Advisories
              </span>
            </div>
          )}
        </div>

        {/* Findings List or Empty State */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px' }}>
          {!scanResults ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <Sparkles size={40} style={{ margin: '0 auto 16px auto', color: 'var(--primary-500)', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>Ready for Inspection</h3>
              <p style={{ fontSize: '0.875rem', maxWidth: '380px', margin: '0 auto' }}>
                Click <strong>"Run Pre-Flight Brand Verification"</strong> on the left to inspect tone, cross-reference factual claims, check visual contrast, and generate intent-preserving alternatives.
              </p>
            </div>
          ) : scanResults.findings.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px', 
              background: 'var(--status-success-bg)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--status-success-border)'
            }}>
              <CheckCircle2 size={44} style={{ color: 'var(--status-success)', margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                100% Brand Compliant
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 16px auto' }}>
                All tone definitions, terminology rules, approved corporate facts, and visual contrast criteria have been verified with zero blockers.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--status-success)', fontWeight: 700 }}>
                ✓ Ready for Final Stakeholder Sign-Off
              </div>
            </div>
          ) : (
            scanResults.findings.map((item, index) => {
              const isExpanded = expandedFindings[item.id] !== false; // default expanded

              return (
                <div 
                  key={item.id || index}
                  style={{
                    border: '1px solid var(--border-light)',
                    borderLeft: `4px solid ${item.severity === 'critical' ? 'var(--status-error)' : item.severity === 'warning' ? 'var(--status-warning)' : 'var(--status-info)'}`,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    boxShadow: 'var(--shadow-xs)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Finding Card Header */}
                  <div 
                    onClick={() => toggleFinding(item.id)}
                    style={{ 
                      padding: '12px 16px', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: 'var(--bg-surface-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`severity-chip ${item.severity}`}>
                        {item.severity}
                      </span>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {item.category}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {item.rule}
                      </span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Finding Card Body */}
                  {isExpanded && (
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {/* Flagged Snippet & Citation */}
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                          Flagged Content
                        </div>
                        <div style={{ 
                          padding: '6px 10px', 
                          background: item.severity === 'critical' ? 'var(--status-error-bg)' : 'var(--status-warning-bg)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.875rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-primary)',
                          fontWeight: 600
                        }}>
                          "{item.flaggedText}"
                        </div>
                      </div>

                      {/* Transparent Explanation & Citation */}
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase' }}>
                          Source Citation & Rationale
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {item.explanation}
                        </p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ExternalLink size={12} /> {item.sourceCitation}
                        </div>
                      </div>

                      {/* 3 Intent-Preserving Alternatives */}
                      {item.alternatives && (
                        <div style={{ 
                          background: 'var(--bg-surface-subtle)', 
                          padding: '12px', 
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)' 
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <Wand2 size={13} style={{ color: 'var(--primary-600)' }} />
                              <span>Intent-Preserving Rewrite Alternatives</span>
                            </span>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* Option B: Balanced (Recommended) */}
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              padding: '8px 10px', 
                              background: 'var(--bg-surface)', 
                              borderRadius: 'var(--radius-sm)',
                              border: '1.5px solid var(--primary-500)',
                              boxShadow: 'var(--shadow-xs)'
                            }}>
                              <div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-600)', display: 'block' }}>
                                  BALANCED (RECOMMENDED)
                                </span>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                                  "{item.alternatives.balanced}"
                                </span>
                              </div>
                              <button 
                                onClick={() => onApplyRewrite(item, item.alternatives.balanced)}
                                className="btn btn-primary btn-sm"
                                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                              >
                                Apply Fix
                              </button>
                            </div>

                            {/* Option A: Conservative */}
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              padding: '6px 10px', 
                              background: 'var(--bg-surface)', 
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-light)'
                            }}>
                              <div>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>
                                  CONSERVATIVE (STRICT COMPLIANCE)
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  "{item.alternatives.conservative}"
                                </span>
                              </div>
                              <button 
                                onClick={() => onApplyRewrite(item, item.alternatives.conservative)}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                              >
                                Apply
                              </button>
                            </div>

                            {/* Option C: Creative */}
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              padding: '6px 10px', 
                              background: 'var(--bg-surface)', 
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-light)'
                            }}>
                              <div>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>
                                  CREATIVE (HIGH-IMPACT SOCIAL)
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  "{item.alternatives.creative}"
                                </span>
                              </div>
                              <button 
                                onClick={() => onApplyRewrite(item, item.alternatives.creative)}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Creator Exemption Request Accordion */}
                      {currentRole === 'creator' && (
                        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input 
                            type="text"
                            placeholder="Reason for exemption (e.g. founder exception for launch partner)..."
                            value={exemptionNotes[item.id] || ''}
                            onChange={(e) => setExemptionNotes({ ...exemptionNotes, [item.id]: e.target.value })}
                            className="form-input"
                            style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                          />
                          <button 
                            onClick={() => submitExemption(item.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                          >
                            <MessageSquare size={12} />
                            Request Exemption
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
