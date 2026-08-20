// Snapshot of the Dost Portal QA Dashboard (Notion) as of 2026-08-20.
// To refresh: update this file manually, or wire up scripts/sync-notion.js
// (see README) to pull live data via the Notion API.

export const dashboardData = {
  environment: "dev-mydost-webapp-dostui.azurewebsites.net",
  lastRun: "2026-08-20 (first pass) — Row/table action menu (kebab) across 7 Payables & Receivables listings (Purchase Invoices, Purchase Orders, Purchase Delivery Notes, Payables Unclassified, Sales Invoices, Sales Orders, Sales Delivery Note), regression-testing the table-menu-actions refactor for behaviour changes. 0 Critical/High findings. 1 new Medium (Sales Orders row menu orders the duplicate/create action after Delete, inconsistent with every other screen tested, which orders it before Delete). 2 new Low (transient stale page <title> after back-navigation that self-corrects; an aria-hidden/focus console warning when View Document opens a new tab). Full expected menu-item superset (Review Document, Download with CSV/JSON/Template submenu, View Document, View Discrepancies, View History, View Reference Documents, View Notes, Assign Workflow, Make Payment, Duplicate/Create actions, Delete) confirmed present and correctly conditional by document type and tax protocol (Verifactu, SDI) on 6 of 7 screens. Purchase Delivery Notes had zero rows in this tenant, so its action menu remains genuinely untested. All safe read-only items click-tested (Review Document, View Document, View History, View Notes, View Reference Documents, all Duplicate/Create-document actions) and confirmed to open/navigate/close cleanly. 0 console errors and 0 failed network requests across all 7 screens. Create Verifactu/SDI/SII credit-note/debit-note/corrective-invoice/replacement-form submenus and Send PA Status could not be evaluated — no document in this tenant's dev data is in a state that surfaces them",
  summary: {
    coverage: { tested: 44, total: 50, percent: 88 },
    neverTested: 10,
    stale: 0,
    defectThemes: 6,
    activeBaselines: 5,
  },
  severity: [
    { level: "Critical", count: 6, note: "All enumerated below — unchanged", exact: true },
    { level: "High", count: 9, note: "All enumerated below — unchanged this run (0 new Critical/High from the 2026-08-20 row-action-menu sweep)", exact: true },
    { level: "Medium", count: 53, note: "Aggregate across campaigns — dominated by 22 untranslated-copy items and 7 raw-identifier items from the localization sweep, plus open modal-divider findings, remaining Dimensions findings, and +1 from the 2026-08-20 row-action-menu run (Sales Orders menu-item ordering inconsistency)", exact: false },
    { level: "Low", count: 11, note: "Cosmetic and polish — +2 from the 2026-08-20 row-action-menu run (transient stale title, aria-hidden focus warning)", exact: false },
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
  // and removed from `high`. H11 and H12 (Dimensions) were added 2026-08-19 on
  // the first-pass baseline and RESOLVED 2026-08-19 on the same-day regression
  // run — both verified by active re-test, not absence. The 2026-08-20 row-
  // action-menu sweep found 0 Critical/High, so no IDs were added or removed
  // this run. IDs are intentionally not renumbered so existing references stay
  // valid.

  // defectThemes: each entry is { status, text }.
  //   status: "open"   — still outstanding
  //           "closed" — resolved or reclassified; kept so a closed theme stays
  //                      visible rather than silently vanishing from the record.
  // Do NOT encode status in the text — the UI filters on this field.
  defectThemes: [
    { status: "open", text: "Form modals missing the footer divider. 3 instances: Create workflow template (buttons sit inside DialogContent rather than a DialogActions footer, so there is no boundary for a divider), Edit Role (header divider added 2026-08-18, footer still absent), and Invitation.tsx (zero <hr> — neither divider). All Medium." },
    { status: "open", text: "Shared DialogComponent does not guarantee correct rendering. Of 7 testable consumers of src/components/Dialog.tsx, 2 render incorrectly (Invitation.tsx; UploadFromDevice.tsx in its empty dropzone state). Identify what UploadByEmail.tsx does differently before treating \"point it at the shared component\" as the fix." },
    { status: "open", text: "Oversized-file upload has no client-side size gate: full transfer then raw CORS error, on 4 surfaces. See C5." },
    { status: "open", text: "Extraction pipeline leaks template artifacts: Vendor Company Name: <id>} <address>} on 6+ documents, plus a shared fallback total of €321,321.00 on every document inspected. Shape reads as an unclosed {{…}} expression." },
    { status: "open", text: "Notification endpoints poll roughly once per second on every screen, idle or not." },
    { status: "open", text: "Session drops silently on a 502 from refreshToken: no message, no retry, work lost. Killed one test run outright." },
    { status: "open", text: "Cold-navigation / deep-link context loss: a screen reached by a fresh address-bar navigation renders with less context than the same screen reached by an in-app SPA transition. First seen on /dimension (Value column present on SPA nav, missing on cold nav — since resolved by removing the Value field entirely) and now recurring on /dimension/{id}/dimension-values (generic \"Dimension Values\" heading on cold nav vs \"{Name}'s Values\" on SPA nav). 2 occurrences across 2 runs — flagged as a shared root-cause candidate rather than two unrelated bugs." },
    { status: "closed", text: "Mapping dialogs have no Save/Cancel — RESOLVED 2026-08-18. Both Add and Update Individual Mapping now render a full footer with divider and a right-aligned Create/Update button." },
    { status: "closed", text: "Confirm-dialog component ships with no dividers — RECLASSIFIED 2026-08-18 as not-a-defect. The divider standard applies to form modals only (input fields + save action). Confirm dialogs have no inputs, so no dividers are expected." },
    { status: "closed", text: "Catalog › Dimensions permission-gated for the test account — RECLASSIFIED 2026-08-19 as a routing error, not a real defect. The correct route is /dimension, not /catalog/dimensions (which genuinely 404s)." },
    { status: "closed", text: "Raw untranslated i18n keys and raw Yup schema exceptions leak to the user on Dimensions validation/business-rule failures (H11) — RESOLVED, verified by active re-test 2026-08-19. Whitespace-Name-on-Add and cascade-blocked Delete now show readable toasts. The third case (raw Yup exception editing an empty Value field) is now moot since the Value field was removed from the Dimension-level form entirely. Worth checking whether the same error-mapping gap exists on other screens using the same pattern." },
    { status: "closed", text: "Value field on Add Dimension silently dropped/not persisted (H12, data loss) — RESOLVED, verified by active re-test 2026-08-19. The Value input and its table column were removed from the Dimension level entirely (Name/Code/Description only); Value remains supported and persists correctly at the Dimension Values level." },
  ],

  // featureReports: visual before/after evidence, rendered on the Evidence tab.
  //   before / after — image paths served from public/ (so "/screenshots/x.svg"
  //                    means the file lives at public/screenshots/x.svg).
  //                    Set to null if no image is available yet; the UI shows a
  //                    placeholder rather than a broken image.
  //   status         — "open" or "fixed", drives the badge colour.
  //
  // NOTE ON IMAGE FORMAT: the entry below uses committed SVG mockups rather than
  // real PNG screenshots. SVG is text, so it can be committed through the same
  // path as code; PNGs cannot (binary exceeds what the tooling can carry) and
  // must be added to public/screenshots/ by hand. Swap the paths to .png once the
  // real captures are committed — nothing else needs to change.
  featureReports: [
    {
      title: "Shared DialogComponent does not guarantee the divider standard",
      date: "2026-08-18",
      screen: "Payables › Receive › Receive via Supplier Portal  vs  Documents › Upload by email",
      status: "open",
      summary:
        "Both dialogs import the same DialogComponent from src/components/Dialog.tsx, yet only one renders the standard correctly. Invitation.tsx has zero <hr> elements — no divider under the header, none above the footer. UploadByEmail.tsx, from the same shared component, renders both correctly. This is why 'point it at the shared component' is not on its own a sufficient fix for the remaining broken dialogs. Images below are annotated mockups of the two measured states, not raw captures.",
      before: "/screenshots/demo-before.svg",
      beforeLabel: "Fails — Invitation.tsx",
      beforeAlt: "Receive via Supplier Portal dialog with no divider below the header and none above the footer, both gaps marked in red",
      after: "/screenshots/demo-after.svg",
      afterLabel: "Passes — UploadByEmail.tsx",
      afterAlt: "Upload by email dialog showing a divider below the header, a divider above the footer, and a right-aligned Close button, both dividers marked in green",
      url: null,
    },
    {
      title: "Dimensions — CRUD & validation regression pass, both High findings verified fixed",
      date: "2026-08-19",
      screen: "Dimensions (/dimension) + Dimension Values",
      status: "fixed",
      summary:
        "Re-tested against the same-day first-pass baseline. Add Dimension → whitespace-only Name now shows a readable toast ('Dimension name is required.') instead of the raw dimension_name_required key. Deleting a Dimension with an active child value now shows 'The dimension has active values and cannot be deleted.' instead of the raw dimension_has_active_values key. The Value field/column was removed from the Dimension-level form and table entirely, so the silent data-loss case (H12) can no longer occur — Value remains supported and persists correctly at the Dimension Values level (confirmed: created '10', reloaded, value present). Two new Medium findings surfaced this run: Code is now a required field at both levels (baseline documented it as optional — undocumented change), and the Dimension Values page shows a generic 'Dimension Values' heading instead of '{Name}'s Values' on cold/deep-link navigation. PNG screenshots were not committed here (binary cannot be carried by this sync path) — see the Notion chat report for accessibility-tree evidence of the before/after toast text.",
      before: null,
      beforeLabel: null,
      beforeAlt: null,
      after: null,
      afterLabel: null,
      afterAlt: null,
      url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66",
    },
    {
      title: "Row/table action menu (kebab) — post-refactor regression pass, 7 Payables & Receivables listings",
      date: "2026-08-20",
      screen: "Payables › Purchase Invoices/Orders/Delivery Notes/Unclassified, Receivables › Sales Invoices/Orders/Delivery Note",
      status: "open",
      summary:
        "First functional baseline at this granularity for the table-menu-actions refactor. Full expected menu-item superset (Review Document, Download with submenu, View Document, View Discrepancies, View History, View Reference Documents, View Notes, Assign Workflow, Make Payment, Duplicate/Create, Delete) confirmed present and correctly conditional by document type and tax protocol on 6 of 7 screens — Purchase Delivery Notes had zero rows in this tenant. One Medium ordering inconsistency found: Sales Orders places the duplicate/create action after Delete, while Purchase Orders and Sales Delivery Note correctly place the equivalent action before Delete. All safe read-only items (Review Document, View Document, View History, View Notes, View Reference Documents, Duplicate actions) were click-tested and confirmed to work cleanly with 0 console errors and 0 failed requests across all 7 screens. Create Verifactu/SDI/SII credit-note/debit-note/corrective-invoice/replacement-form submenus and Send PA Status could not be evaluated — no document in this tenant is in the state that surfaces them. PNG screenshots were captured locally during the run but not committed here (binary cannot be carried by this sync path) — see the Notion baseline for the full menu-item-by-screen table.",
      before: null,
      beforeLabel: null,
      beforeAlt: null,
      after: null,
      afterLabel: null,
      afterAlt: null,
      url: "https://app.notion.com/p/3c20f4c873ef8112bb69de27f7538dbf",
    },
  ],
  recentRuns: [
    { date: "2026-08-20", scope: "Row/table action menu (kebab) — 7 Payables & Receivables listings, regression-testing the table-menu-actions refactor", outcome: "New 3 (1 Medium: Sales Orders duplicate/create action ordered after Delete, inconsistent with every other screen tested. 2 Low: transient stale page title after back-nav, self-correcting; aria-hidden focus-conflict console warning on View Document). Fixed 0 (no prior baseline existed at this granularity). Persisting 0. Full expected menu-item superset confirmed present and correctly conditional by document type/tax protocol on 6 of 7 screens; Purchase Delivery Notes had zero rows, action menu unexercised there. All safe read-only items click-tested and confirmed working. 0 console errors, 0 failed network requests across all 7 screens", url: "https://app.notion.com/p/3c20f4c873ef8112bb69de27f7538dbf" },
    { date: "2026-08-19", scope: "Dimensions CRUD & validation (regression, re-test of same-day baseline) + responsive pass 375/1280/1440/1920px", outcome: "Fixed 3 (H11 raw error keys — verified re-test; H12 Value data-loss — verified re-test; Medium Value-column cold-nav mismatch — resolved as a side effect). New 3 (2 Medium: Code newly required at both levels; generic Dimension Values heading on cold nav. 1 Low: dead whitespace at 1920px). Persisting/not re-tested: numeric validation on Value, Name/Code uniqueness, special-char rendering. No console errors, no failed requests outside expected 400s. All test data cleaned up", url: "https://app.notion.com/p/3c10f4c873ef814087fdd1c0b69c82ec" },
    { date: "2026-08-19", scope: "Dimensions CRUD & validation (first pass, correct route /dimension)", outcome: "COMPLETED — full CRUD + validation on Dimension and Dimension Values levels; prior 'permission-locked' conclusion superseded as a routing error. 2 High, 4 Medium new findings; all QA-TEST- records cleaned up", url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66" },
    { date: "2026-08-19", scope: "Catalog › Dimensions CRUD attempt (CRUD-only scope, mid-run trim) — SUPERSEDED", outcome: "Reported as permission-blocked; corrected same day — the screen was tested at the wrong URL (/catalog/dimensions instead of /dimension). See the completed run above for the real result", url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66" },
    { date: "2026-08-18", scope: "Modal divider regression (10 prior findings) + profile-menu screens", outcome: "3 FIXED (Add/Update Mapping, Create filtered view) · 6 persisting · 3 NEW (Invitation, Edit Role, plus 3 screens first-tested)", url: null },
    { date: "2026-08-17", scope: "Workflow Templates (first pass) + Documents (regression)", outcome: "New 0 · Fixed 0 · Persisting 3 · 3 new findings on Workflow Templates", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade" },
    { date: "2026-08-17", scope: "Modal consistency — Configuration (12 modals)", outcome: "4 fail: 3 confirm dialogs no dividers, Update Mapping no footer", url: null },
    { date: "2026-08-17", scope: "Modal consistency — Bank + missed screens (15 modals)", outcome: "3 fail: 2 confirm dialogs, Create workflow template", url: null },
    { date: "2026-08-17", scope: "Modal consistency — first sweep (16 modals)", outcome: "4 fail; 2 later ruled N/A", url: null },
    { date: "2026-08-17", scope: "Upload & document creation — Documents, Payables, Receivables", outcome: "2 Critical (500s), oversized-file PERSISTING", url: null },
  ],
  quickLinks: [
    { title: "Dost Portal — Master Test Map", url: "https://app.notion.com/p/3bf0f4c873ef8162aa65ddf65409a864", scope: "The index — what was tested, when, against which baseline" },
    { title: "Dost Portal — QA Dashboard (Notion)", url: "https://app.notion.com/p/3bf0f4c873ef81edb33af8daa9ef8501", scope: "The source this file mirrors" },
    { title: "QA Trend Summary — Dost Portal", url: "https://app.notion.com/p/3c10f4c873ef814087fdd1c0b69c82ec", scope: "Per-run regression metrics, appended every regression run" },
    { title: "QA Baseline — Spanish Localization Sweep — 2026-08-11", url: "https://app.notion.com/p/3b90f4c873ef81308e5ed90ec632bfff", scope: "Spanish UI, 29 findings" },
    { title: "QA Functional Baseline — 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e", scope: "10 screens, functional behaviour" },
    { title: "QA Baseline — Workflow Templates — 2026-08-17", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade", scope: "Workflow Templates first pass" },
    { title: "QA Baseline — Dimensions CRUD & Validation — 2026-08-19", url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66", scope: "Dimensions + Dimension Values, CRUD-and-validation-only scope — full pass completed; both High findings fixed as of the 2026-08-19 regression run" },
    { title: "QA Baseline — Row Action Menu — Payables & Receivables — 2026-08-20", url: "https://app.notion.com/p/3c20f4c873ef8112bb69de27f7538dbf", scope: "Row/table kebab action menu, 7 Payables & Receivables listings — first pass, post table-menu-actions refactor regression check" },
  ],
  blockers: [
    "Sentry holds no data. Project mydost-web under org dost-sn returned zero events across 90 days. Every \"no matching Sentry issue found\" carries no evidential weight.",
    "Credentials are out of agent scope — login, logout, and new-account testing stay with the human tester permanently.",
    "Real OS drag-and-drop and clipboard paste cannot be automated — synthetic events do not trigger the app's handlers. Manual only.",
    "Upload pipeline currently returns 500, blocking all downstream extraction and classification testing.",
    "5 campaigns have no baseline page (modal consistency, Ask Dost, file upload, document upload, performance) — their findings cannot be regression-compared.",
    "Screenshots cannot be committed by the agent — binary files exceed what the GitHub tool can carry. Evidence images must be added to public/screenshots/ by hand, or the entry uses an SVG mockup instead.",
    "Payables › Purchase Delivery Notes has zero rows in this dev tenant — its row action menu cannot be exercised until test data exists.",
  ],
};
