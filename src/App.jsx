import React, { useState } from 'react'
import { dashboardData as d } from './data.js'

function StatsGrid() {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="label">Coverage</div>
        <div className="value">{d.summary.coverage.percent}%</div>
      </div>
      <div className="stat-card crit">
        <div className="label">Critical open</div>
        <div className="value">{d.severity.find(s => s.level === 'Critical').count}</div>
      </div>
      <div className="stat-card high">
        <div className="label">High open</div>
        <div className="value">{d.severity.find(s => s.level === 'High').count}</div>
      </div>
      <div className="stat-card">
        <div className="label">Defect themes</div>
        <div className="value">{d.summary.defectThemes}</div>
      </div>
      <div className="stat-card">
        <div className="label">Never tested</div>
        <div className="value">{d.summary.neverTested}</div>
      </div>
    </div>
  )
}

function IssueTable({ rows, badgeClass }) {
  return (
    <table>
      <thead>
        <tr><th>#</th><th>Issue</th><th>Screen</th><th>Source</th></tr>
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
        <h2>Open defect themes</h2>
        <ul className="themes">
          {d.defectThemes.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
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
        <IssueTable rows={d.critical} badgeClass="critical" />
      </div>
      <div className="card">
        <h2>High — {d.high.length}</h2>
        <IssueTable rows={d.high} badgeClass="high" />
      </div>
    </>
  )
}

function Runs() {
  return (
    <div className="card">
      <h2>Recent activity — last {d.recentRuns.length} runs</h2>
      <table>
        <thead><tr><th>Date</th><th>Scope</th><th>Outcome</th><th>Report</th></tr></thead>
        <tbody>
          {d.recentRuns.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
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
        <thead><tr><th>Page</th><th>Scope</th></tr></thead>
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
      <div className="tabs">
        {TABS.map(t => (
          <button key={t.key} className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <Active />
    </div>
  )
}
