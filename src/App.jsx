import React, { useState } from 'react'
import { dashboardData as d } from './data.js'

// defectThemes entries are { status: 'open' | 'closed', text }.
// Closed items stay in the data deliberately so a resolved or reclassified theme
// remains visible rather than silently vanishing from the record — but they must
// not be rendered under an "Open" heading.
// Anything without an explicit status is treated as open, so a malformed entry
// surfaces on the page rather than disappearing from it.
const themes = d.defectThemes.map(t =>
  typeof t === 'string' ? { status: 'open', text: t } : t
)
const openThemes = themes.filter(t => t.status !== 'closed')
const closedThemes = themes.filter(t => t.status === 'closed')

const reports = d.featureReports || []

const sev = level => d.severity.find(s => s.level === level) || { count: 0, exact: true, note: '' }

function StatCard({ label, value, sub, className, title }) {
  return (
    <div className={`stat-card ${className || ''}`} title={title || undefined}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  )
}

function StatsGrid() {
  const c = sev('Critical')
  const h = sev('High')
  const m = sev('Medium')
  const l = sev('Low')
  return (
    <>
      <div className="stats-grid">
        <StatCard
          label="Coverage"
          value={`${d.summary.coverage.percent}%`}
          sub={`${d.summary.coverage.tested} of ${d.summary.coverage.total} tracked`}
        />
        <StatCard label="Critical open" value={c.count} className="crit" title={c.note} />
        <StatCard label="High open" value={h.count} className="high" title={h.note} />
        <StatCard
          label="Medium"
          value={m.exact ? m.count : `~${m.count}`}
          sub={m.exact ? undefined : 'approximate'}
          title={m.note}
        />
        <StatCard
          label="Low"
          value={l.exact ? l.count : `~${l.count}`}
          sub={l.exact ? undefined : 'approximate'}
          title={l.note}
        />
        <StatCard
          label="Open themes"
          value={openThemes.length}
          sub={closedThemes.length ? `${closedThemes.length} closed` : undefined}
        />
        <StatCard label="Never tested" value={d.summary.neverTested} sub="entries" />
      </div>
      <p className="caveat">
        Critical and High are exact and individually enumerated. Medium and Low are
        approximate aggregates — campaigns were scoped differently and some findings
        overlap. Treat them as magnitude, not precision.
      </p>
    </>
  )
}

function IssueTable({ rows, badgeClass, caption }) {
  if (!rows.length) return <p className="muted">None currently open.</p>
  return (
    <table>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr><th scope="col">#</th><th scope="col">Issue</th><th scope="col">Screen</th><th scope="col">Source</th></tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id}>
            <td><span className={`badge ${badgeClass}`}>{r.id}</span></td>
            <td>{r.issue}</td>
            <td>{r.screen}</td>
            <td>{r.url ? <a href={r.url} target="_blank" rel="noreferrer">{r.source}</a> : r.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Overview() {
  return (
    <>
      <div className="card">
        <h2>Open defect themes — {openThemes.length}</h2>
        <ul className="themes">
          {openThemes.map((t, i) => <li key={i}>{t.text}</li>)}
        </ul>
      </div>
      {closedThemes.length > 0 && (
        <div className="card">
          <h2>Recently closed — {closedThemes.length}</h2>
          <p className="muted small">
            Kept visible so a resolved or reclassified theme is not mistaken for one that was never found.
          </p>
          <ul className="themes closed">
            {closedThemes.map((t, i) => <li key={i}>{t.text}</li>)}
          </ul>
        </div>
      )}
      <div className="card">
        <h2>Blockers on the QA process itself</h2>
        <ul className="themes">
          {d.blockers.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </>
  )
}

function Issues() {
  return (
    <>
      <div className="card">
        <h2>Critical — {d.critical.length}</h2>
        <IssueTable rows={d.critical} badgeClass="critical" caption="Open Critical findings" />
      </div>
      <div className="card">
        <h2>High — {d.high.length}</h2>
        <IssueTable rows={d.high} badgeClass="high" caption="Open High findings" />
      </div>
    </>
  )
}

// Renders one image slot. If the file is missing the alt text still describes
// what should be there, so a broken path is obvious rather than silent.
function Shot({ src, alt, label, tone }) {
  return (
    <figure className="shot">
      <figcaption className={`shot-label ${tone || ''}`}>{label}</figcaption>
      {src
        ? <img src={src} alt={alt} loading="lazy" />
        : <div className="shot-missing">No image supplied</div>}
    </figure>
  )
}

function Evidence() {
  if (!reports.length) {
    return (
      <div className="card">
        <h2>Evidence</h2>
        <p className="muted">No before/after comparisons recorded yet.</p>
      </div>
    )
  }
  return (
    <>
      {reports.map((r, i) => (
        <div className="card" key={i}>
          <h2>{r.title}</h2>
          <div className="report-meta">
            <span>{r.date}</span>
            {r.screen && <><span className="dot">·</span><span>{r.screen}</span></>}
            {r.status && <><span className="dot">·</span><span className={`badge ${r.status === 'fixed' ? 'ok' : 'high'}`}>{r.status}</span></>}
            {r.url && <><span className="dot">·</span><a href={r.url} target="_blank" rel="noreferrer">Source report</a></>}
          </div>
          {r.summary && <p className="report-summary">{r.summary}</p>}
          <div className="shots">
            <Shot src={r.before} alt={r.beforeAlt || `Before: ${r.title}`} label={r.beforeLabel || 'Before'} tone="bad" />
            <Shot src={r.after} alt={r.afterAlt || `After: ${r.title}`} label={r.afterLabel || 'After'} tone="good" />
          </div>
        </div>
      ))}
    </>
  )
}

function Runs() {
  return (
    <div className="card">
      <h2>Recent activity — last {d.recentRuns.length} runs</h2>
      <table>
        <caption className="sr-only">Most recent test runs, newest first</caption>
        <thead><tr><th scope="col">Date</th><th scope="col">Scope</th><th scope="col">Outcome</th><th scope="col">Report</th></tr></thead>
        <tbody>
          {d.recentRuns.map((r, i) => (
            <tr key={i}>
              <td className="nowrap">{r.date}</td>
              <td>{r.scope}</td>
              <td>{r.outcome}</td>
              <td>{r.url ? <a href={r.url} target="_blank" rel="noreferrer">Open</a> : <span className="muted">No baseline</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Links() {
  return (
    <div className="card">
      <h2>Quick links</h2>
      <table>
        <caption className="sr-only">Baselines and reference pages</caption>
        <thead><tr><th scope="col">Page</th><th scope="col">Scope</th></tr></thead>
        <tbody>
          {d.quickLinks.map((l, i) => (
            <tr key={i}>
              <td><a href={l.url} target="_blank" rel="noreferrer">{l.title}</a></td>
              <td className="muted">{l.scope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TABS = [
  { key: 'overview', label: 'Overview', render: Overview },
  { key: 'issues', label: 'Issues', render: Issues },
  { key: 'evidence', label: `Evidence${reports.length ? ` (${reports.length})` : ''}`, render: Evidence },
  { key: 'runs', label: 'Recent runs', render: Runs },
  { key: 'links', label: 'Links', render: Links },
]

export default function App() {
  const [tab, setTab] = useState('overview')
  const Active = TABS.find(t => t.key === tab).render
  return (
    <div className="wrap">
      <div className="header">
        <div>
          <h1>aq-agent QA dashboard — MyDost portal</h1>
          <div className="sub">{d.environment} · last run: {d.lastRun}</div>
        </div>
      </div>
      <StatsGrid />
      <div className="tabs" role="tablist" aria-label="Dashboard sections">
        {TABS.map(t => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="tabpanel"
            className={`tab-btn ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <Active />
      </div>
    </div>
  )
}
