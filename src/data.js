// Snapshot of the Dost Portal QA Dashboard (Notion) as of 2026-08-18.
// To refresh: update this file manually, or wire up scripts/sync-notion.js
// (see README) to pull live data via the Notion API.

export const dashboardData = {
  environment: "dev-mydost-webapp-dostui.azurewebsites.net",
  lastRun: "2026-08-18 — modal divider regression + profile-menu screens (My Account, Users Management, Companies)",
  summary: {
    coverage: { tested: 37, total: 48, percent: 77 },
    neverTested: 11,
    stale: 0,
    defectThemes: 6,
    activeBaselines: 3,
  },
  severity: [
    { level: "Critical", count: 6, note: "All enumerated below — unchanged", exact: true },
    { level: "High", count: 9, note: "All enumerated below — was 10; H6 resolved 2026-08-18", exact: true },
    { level: "Medium", count: 45, note: "Aggregate across campaigns — dominated by 22 untranslated-copy items and 7 raw-identifier items from the localization sweep, plus the open modal-divider findings", exact: false },
    { level: "Low", count: 8, note: "Cosmetic and polish", exact: false },
  ],
  critical: [
    { id: "C1", issue: "All 7 chart widgets fail — three DynamicAnalyticsParquet endpoints return 404", screen: "Analytics", source: "Functional Baseline 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "C2", issue: "Default tab renders raw .NET exception \"Object reference not set to an instance of an object\"; 500 from /workflowservice/workflows", screen: "Workflow", source: "Functional Baseline 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "C3", issue: "Upload returns 500 and fails silently — no toast, no banner, nothing appears in the list", screen: "Documents", source: "Upload sweep 2026-08-17 (no baseline)", url: null },
    { id: "C4", issue: "Same 500 silent-failure on the second upload surface", screen: "Payables › Purchase Invoices", source: "Upload sweep 2026-08-17 (no baseline)", url: null },
    { id: "C5", issue: "120MB file transfers in full (~90s), then fails with a raw CORS error and no size message. No client-side size gate anywhere. Confirmed on 4 upload surfaces", screen: "Documents, Payables, Ask Dost, Receivables", source: "Upload sweep 2026-08-17 (no baseline)", url: null },
    { id: "C6", issue: "Uploaded document displayed content from a completely different invoice (INV-1007.pdf), with an extracted total matching neither file. Caveat: seeded dev data not ruled out — needs server-log verification before escalating", screen: "Payables", source: "Document upload run 2026-08-13 (no baseline)", url: null },
  ],
  high: [
    { id: "H1", issue: "Bank Transactions is a dead end — selecting the only available bank fires no request; field is labelled \"(Optional)\" but hard-required", screen: "Bank › Bank Transactions", source: "Functional Baseline 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "H2", issue: "Column-header sort is a dead control — no reorder, no indicator. Sorting works correctly on Payables/Receivables, so this is screen-specific", screen: "Suppliers", source: "Functional Baseline 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "H3", issue: "Workflow report throws TypeError: Cannot read properties of undefined (reading 'slice'); two charts render empty axes with no empty-state message", screen: "Reports", source: "Functional Baseline 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "H4", issue: "Extraction produces wrong values — vendor renders as AQ-TEST-4417} }, total as €321,321.00 against a real 1,234.56 EUR", screen: "Documents", source: "Document upload run 2026-08-13 (no baseline)", url: null },
    { id: "H5", issue: "Currency formatter fails on newest rows — bare 45.10 with no symbol; accessible name literally reads \"undefined 45.10\". Throws no exception, so error monitoring will never catch it", screen: "Bank › Invoice Payments", source: "Functional Baseline 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "H7", issue: "Chat hangs on \"Processing\" forever when the stream ends without its done event. No timeout, and the broken state survives a page reload", screen: "Ask Dost", source: "Ask Dost campaign (no baseline)", url: null },
    { id: "H8", issue: "Two endpoints 404 on every load — WorkflowTemplates and WorkflowTemplates/template-types", screen: "Workflow Templates", source: "QA Baseline — Workflow Templates 2026-08-17", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade" },
    { id: "H9", issue: "Document name is an <h6> with a JS onclick and no href — clicking opens a raw consumerapi file-viewer URL, not the review screen", screen: "Documents", source: "Functional Baseline 2026-08-12, re-confirmed 2026-08-17", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
    { id: "H10", issue: "Write-approval flow degrades to \"I'm a bit overloaded\" and renders no approval card. Intermittent — rendered correctly on 2 of 3 attempts", screen: "Ask Dost", source: "Ask Dost campaign (no baseline)", url: null },
  ],
  // H6 (Add/Update Individual Mapping had no Save/Cancel) was RESOLVED 2026-08-18
  // and removed from `high`. IDs are intentionally not renumbered so existing
  // references stay valid.
  defectThemes: [
    "OPEN — Form modals missing the footer divider. 3 instances: Create workflow template (buttons sit inside DialogContent rather than a DialogActions footer, so there is no boundary for a divider), Edit Role (header divider added 2026-08-18, footer still absent), and Invitation.tsx (zero <hr> — neither divider). All Medium.",
    "OPEN — Shared DialogComponent does not guarantee correct rendering. Of 7 testable consumers of src/components/Dialog.tsx, 2 render incorrectly (Invitation.tsx; UploadFromDevice.tsx in its empty dropzone state). Identify what UploadByEmail.tsx does differently before treating \"point it at the shared component\" as the fix.",
    "OPEN — Oversized-file upload has no client-side size gate: full transfer then raw CORS error, on 4 surfaces. See C5.",
    "OPEN — Extraction pipeline leaks template artifacts: Vendor Company Name: <id>} <address>} on 6+ documents, plus a shared fallback total of €321,321.00 on every document inspected. Shape reads as an unclosed {{…}} expression.",
    "OPEN — Notification endpoints poll roughly once per second on every screen, idle or not.",
    "OPEN — Session drops silently on a 502 from refreshToken: no message, no retry, work lost. Killed one test run outright.",
    "CLOSED 2026-08-18 — Mapping dialogs have no Save/Cancel. RESOLVED: both Add and Update Individual Mapping now render a full footer with divider and a right-aligned Create/Update button.",
    "CLOSED 2026-08-18 — Confirm-dialog component ships with no dividers. RECLASSIFIED as not-a-defect: the divider standard applies to form modals only (input fields + save action). Confirm dialogs have no inputs, so no dividers are expected.",
  ],
  recentRuns: [
    { date: "2026-08-18", scope: "Modal divider regression (10 prior findings) + profile-menu screens", outcome: "3 FIXED (Add/Update Mapping, Create filtered view) · 6 persisting · 3 NEW (Invitation, Edit Role, plus 3 screens first-tested)", url: null },
    { date: "2026-08-17", scope: "Workflow Templates (first pass) + Documents (regression)", outcome: "New 0 · Fixed 0 · Persisting 3 · 3 new findings on Workflow Templates", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade" },
    { date: "2026-08-17", scope: "Modal consistency — Configuration (12 modals)", outcome: "4 fail: 3 confirm dialogs no dividers, Update Mapping no footer", url: null },
    { date: "2026-08-17", scope: "Modal consistency — Bank + missed screens (15 modals)", outcome: "3 fail: 2 confirm dialogs, Create workflow template", url: null },
    { date: "2026-08-17", scope: "Modal consistency — first sweep (16 modals)", outcome: "4 fail; 2 later ruled N/A", url: null },
    { date: "2026-08-17", scope: "Upload & document creation — Documents, Payables, Receivables", outcome: "2 Critical (500s), oversized-file PERSISTING", url: null },
    { date: "2026-08-17", scope: "Ask Dost — 21-case re-run + Spanish case 20", outcome: "Tables/charts FIXED; approval flow intermittent; approval-card labels NEW", url: null },
    { date: "2026-08-13", scope: "Document upload — Documents + Payables", outcome: "1 Critical (wrong document content), 1 High (extraction)", url: null },
    { date: "2026-08-13", scope: "Ask Dost file attachments (8 cases)", outcome: "6 pass, 3 defects; no hallucination on PDF or Excel", url: null },
    { date: "2026-08-12", scope: "Functional sweep batches 1–2 (10 screens)", outcome: "2 Critical, 3 High, 4 Medium, 2 Low, 1 retracted", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e" },
  ],
  quickLinks: [
    { title: "Dost Portal — Master Test Map", url: "https://app.notion.com/p/3bf0f4c873ef8162aa65ddf65409a864", scope: "The index — what was tested, when, against which baseline" },
    { title: "Dost Portal — QA Dashboard (Notion)", url: "https://app.notion.com/p/3bf0f4c873ef81edb33af8daa9ef8501", scope: "The source this file mirrors" },
    { title: "QA Baseline — Spanish Localization Sweep — 2026-08-11", url: "https://app.notion.com/p/3b90f4c873ef81308e5ed90ec632bfff", scope: "Spanish UI, 29 findings" },
    { title: "QA Functional Baseline — 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e", scope: "10 screens, functional behaviour" },
    { title: "QA Baseline — Workflow Templates — 2026-08-17", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade", scope: "Workflow Templates first pass" },
  ],
  blockers: [
    "Sentry holds no data. Project mydost-web under org dost-sn returned zero events across 90 days. Every \"no matching Sentry issue found\" carries no evidential weight.",
    "Credentials are out of agent scope — login, logout, and new-account testing stay with the human tester permanently.",
    "Real OS drag-and-drop and clipboard paste cannot be automated — synthetic events do not trigger the app's handlers. Manual only.",
    "Upload pipeline currently returns 500, blocking all downstream extraction and classification testing.",
    "5 campaigns have no baseline page (modal consistency, Ask Dost, file upload, document upload, performance) — their findings cannot be regression-compared.",
  ],
};
