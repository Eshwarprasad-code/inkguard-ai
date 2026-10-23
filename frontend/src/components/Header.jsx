import React from 'react';
import { Shield, Sparkles, UserCheck, Scale, Palette, Moon, Sun, BookOpen, CheckCircle } from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  theme, 
  toggleTheme, 
  selectedPreset, 
  setSelectedPreset,
  brandPresets,
  openKnowledgeHub
}) {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand Logo & Title */}
        <div className="brand-badge">
          <div className="logo-icon-wrapper">
            <Shield size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-title">InkGuard AI</span>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: 700, 
                padding: '2px 7px', 
                borderRadius: '999px', 
                background: 'var(--primary-50)', 
                color: 'var(--primary-600)',
                border: '1px solid var(--primary-100)'
              }}>
                ROUND 2 BUILD
              </span>
            </div>
            <div className="brand-tagline">
              Intelligent Multi-Modal Brand Governance & Pre-Flight Assurance
            </div>
          </div>
        </div>

        {/* Center: Brand Guideline Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={openKnowledgeHub}
            className="btn btn-secondary btn-sm"
            title="Inspect or Edit Living Brand Guidelines & Approved Fact Base"
            style={{ fontSize: '0.8125rem', gap: '6px' }}
          >
            <BookOpen size={15} />
            <span>Brand Knowledge Hub</span>
          </button>

          <select 
            value={selectedPreset} 
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="form-select"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.8125rem', 
              width: 'auto',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {Object.keys(brandPresets).map(key => (
              <option key={key} value={key}>
                {brandPresets[key].name} ({brandPresets[key].version})
              </option>
            ))}
          </select>
        </div>

        {/* Right: Role Switcher & Controls */}
        <div className="header-actions">
          {/* Role Pill Switcher */}
          <div className="role-pill-selector" title="Switch your stakeholder role to experience creator, manager, or legal review workflows">
            <button 
              className={`role-pill-btn ${currentRole === 'creator' ? 'active' : ''}`}
              onClick={() => setCurrentRole('creator')}
            >
              ✍️ Creator
            </button>
            <button 
              className={`role-pill-btn ${currentRole === 'manager' ? 'active' : ''}`}
              onClick={() => setCurrentRole('manager')}
            >
              🛡️ Brand Manager
            </button>
            <button 
              className={`role-pill-btn ${currentRole === 'legal' ? 'active' : ''}`}
              onClick={() => setCurrentRole('legal')}
            >
              ⚖️ Legal Counsel
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="icon-button"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      {/* Solo Developer & Team Attribution sub-bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '6px auto 0 auto',
        paddingTop: '6px',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          <strong>Team:</strong> STRAW_HAT_CODER &nbsp;|&nbsp; <strong>Lead Architect:</strong> GUDIMETLA ESHWAR PRASAD (Institute of Aeronautical Engineering)
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Active Persona: <strong style={{ color: 'var(--primary-600)', textTransform: 'capitalize' }}>{currentRole}</strong></span>
          <span>Status: <strong style={{ color: 'var(--status-success)' }}>Core Workflow Active (100% Operational)</strong></span>
        </div>
      </div>
    </header>
  );
}
