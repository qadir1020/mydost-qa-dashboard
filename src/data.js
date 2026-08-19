// Snapshot of the Dost Portal QA Dashboard (Notion) as of 2026-08-19.
// To refresh: update this file manually, or wire up scripts/sync-notion.js
// (see README) to pull live data via the Notion API.

export const dashboardData = {
  environment: "dev-mydost-webapp-dostui.azurewebsites.net",
  lastRun: "2026-08-19 — Dimensions CRUD & validation: access confirmed working at the correct route (/dimension, not /catalog/dimensions). Prior \"permission-locked\" conclusion was a routing error made on the wrong URL by two earlier runs, not a real permission gate. Full CRUD + validation pass completed on both Dimension and Dimension Values levels — 2 High, 4 Medium findings",
  summary: {
    coverage: { tested: 39, total: 50, percent: 78 },
    neverTested: 11,
    stale: 0,
    defectThemes: 6,
    activeBaselines: 4,
  },
  severity: [
    { level: "Critical", count: 6, note: "All enumerated below — unchanged", exact: true },
    { level: "High", count: 11, note: "All enumerated below — was 9; +2 new from Dimensions run 2026-08-19 (H11, H12)", exact: true },
    { level: "Medium", count: 50, note: "Aggregate across campaigns — dominated by 22 untranslated-copy items and 7 raw-identifier items from the localization sweep, plus the open modal-divider findings and 4 new findings from the Dimensions CRUD/validation run (raw-key toast pattern already counted under High; separately: no numeric validation on Value, no uniqueness on Name/Code, missing Value column on cold nav, plus an informational special-chars-render-safely note)", exact: false },
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
    {
      id: "H11",
      issue: "Raw untranslated i18n key or a raw Yup schema exception shown directly to the user on 3 distinct validation/business-rule failure paths (Add, Edit, cascade-blocked Delete)",
      screen: "Dimensions",
      source: "QA Baseline — Dimensions CRUD & Validation — 2026-08-19",
      url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66",
      detail: {
        steps: [
          "Navigate to /dimension (English UI, 1440x900, logged in as Abdul Qadir).",
          "Click 'Add Dimension'. Type a single space into Name, leave Code/Value/Description empty. Click 'Add'.",
          "Observe toast text.",
          "Separately: open Edit on any dimension, clear Name (Value already empty), click Update.",
          "Separately: create a Dimension, add one Dimension Value under it, then try to delete the parent Dimension and confirm.",
        ],
        expected: "Readable, translated messages in all three cases, e.g. 'Name cannot be blank.' / 'This dimension has values and cannot be deleted.'",
        actual: "Case 1: toast shows the literal string dimension_name_required. Case 2: Value field additionally shows a raw Yup exception: \"value must be a `string` type, but the final value was: `null`. If \\\"null\\\" is intended as an empty value be sure to mark the schema as `.nullable()`\\\". Case 3: 400 response, toast shows the literal string dimension_has_active_values.",
        edgeCases: [
          "Whitespace-only Name on create — triggers case 1.",
          "Empty Value on edit of an existing record — triggers case 2.",
          "Delete-with-children (cascade path) — triggers case 3, business rule itself is correct, only the message is broken.",
          "Not tested: whether other required-field combinations produce further raw keys.",
        ],
        history: "New finding, first observed 2026-08-19. No prior baseline covered Dimensions functionally (the same-day earlier baseline never reached the screen due to a routing error).",
      },
    },
    {
      id: "H12",
      issue: "Value field on Add Dimension is accepted by the form and the create succeeds, but is silently never persisted — list shows \"-\", re-opened Edit dialog shows the field empty",
      screen: "Dimensions",
      source: "QA Baseline — Dimensions CRUD & Validation — 2026-08-19",
      url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66",
      detail: {
        steps: [
          "From /dimension, click 'Add Dimension'.",
          "Fill Name = QA-TEST-Dim1, Code = QAT1, Value = 10, Description = QA test dimension.",
          "Click 'Add'.",
          "Confirm via toast + list row.",
          "Re-open Edit on that row.",
        ],
        expected: "New row shows 10 in the Value column, or the field is rejected/disabled if Value is not settable at Dimension level.",
        actual: "Toast confirms 'Dimension created successfully'; row appears with Value = '-'. Edit dialog reopens with Name/Code/Description correct but Value blank — the 10 was never saved server-side.",
        edgeCases: [
          "Confirmed via Edit dialog re-open (not just list display) that the value is genuinely gone server-side, not a display-only bug.",
          "Not tested: whether the same silent-drop happens when typing a Value into an existing dimension via Edit and saving.",
        ],
        history: "New finding, first observed 2026-08-19. Existing rows 'Abcd'/'Abdsd' both show '-' in Value/Code already, consistent with Value/Code being unsupported at this level — if so, the field should not be offered as editable input at all.",
      },
    },
  ],
  // H6 (Add/Update Individual Mapping had no Save/Cancel) was RESOLVED 2026-08-18
  // and removed from `high`. IDs are intentionally not renumbered so existing
  // references stay valid.
  //
  // Dimensions CRUD & Validation (2026-08-19) added H11 and H12 above. The
  // earlier same-day "permission-locked" finding was a routing error (wrong
  // URL guessed) and has been fully superseded — it is not carried forward
  // as a defect theme or a Top open issue, since it never described real
  // portal behaviour.

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
    { status: "open", text: "Raw untranslated i18n keys and raw Yup schema exceptions leak to the user on validation/business-rule failures. First confirmed on Dimensions across 3 distinct paths (create, edit, cascade-blocked delete) — see H11. Worth checking whether the same error-mapping gap exists on other screens using the same form/validation pattern." },
    { status: "closed", text: "Mapping dialogs have no Save/Cancel — RESOLVED 2026-08-18. Both Add and Update Individual Mapping now render a full footer with divider and a right-aligned Create/Update button." },
    { status: "closed", text: "Confirm-dialog component ships with no dividers — RECLASSIFIED 2026-08-18 as not-a-defect. The divider standard applies to form modals only (input fields + save action). Confirm dialogs have no inputs, so no dividers are expected." },
    { status: "closed", text: "Catalog › Dimensions permission-gated for the test account — RECLASSIFIED 2026-08-19 as a routing error, not a real defect. The correct route is /dimension, not /catalog/dimensions (which genuinely 404s). Two prior runs guessed the wrong URL and wrongly concluded the screen was access-gated. Full CRUD access confirmed working once the correct route was used; see H11/H12 for the real findings this run surfaced." },
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
      title: "Dimensions — CRUD & validation pass, no image evidence committed",
      date: "2026-08-19",
      screen: "Dimensions (/dimension) + Dimension Values",
      status: "open",
      summary:
        "Full CRUD and validation testing completed. Two High findings: raw error keys/exceptions leaking to the UI on 3 paths (H11), and a silently-dropped Value field on Dimension create (H12). Accessibility-tree captures were taken during the run showing the raw toast text and the empty Edit-dialog Value field, but PNG screenshots were not committed here (binary cannot be carried by this sync path). See the linked baseline for full repro steps and the complete validation matrix.",
      before: null,
      beforeLabel: null,
      beforeAlt: null,
      after: null,
      afterLabel: null,
      afterAlt: null,
      url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66",
    },
  ],
  recentRuns: [
    { date: "2026-08-19", scope: "Dimensions CRUD & validation (first pass, correct route /dimension)", outcome: "COMPLETED — full CRUD + validation on Dimension and Dimension Values levels; prior 'permission-locked' conclusion superseded as a routing error. 2 High, 4 Medium new findings; all QA-TEST- records cleaned up", url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66" },
    { date: "2026-08-19", scope: "Catalog › Dimensions CRUD attempt (CRUD-only scope, mid-run trim) — SUPERSEDED", outcome: "Reported as permission-blocked; corrected same day — the screen was tested at the wrong URL (/catalog/dimensions instead of /dimension). See the 2026-08-19 completed run above for the real result", url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66" },
    { date: "2026-08-18", scope: "Modal divider regression (10 prior findings) + profile-menu screens", outcome: "3 FIXED (Add/Update Mapping, Create filtered view) · 6 persisting · 3 NEW (Invitation, Edit Role, plus 3 screens first-tested)", url: null },
    { date: "2026-08-17", scope: "Workflow Templates (first pass) + Documents (regression)", outcome: "New 0 · Fixed 0 · Persisting 3 · 3 new findings on Workflow Templates", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade" },
    { date: "2026-08-17", scope: "Modal consistency — Configuration (12 modals)", outcome: "4 fail: 3 confirm dialogs no dividers, Update Mapping no footer", url: null },
    { date: "2026-08-17", scope: "Modal consistency — Bank + missed screens (15 modals)", outcome: "3 fail: 2 confirm dialogs, Create workflow template", url: null },
    { date: "2026-08-17", scope: "Modal consistency — first sweep (16 modals)", outcome: "4 fail; 2 later ruled N/A", url: null },
    { date: "2026-08-17", scope: "Upload & document creation — Documents, Payables, Receivables", outcome: "2 Critical (500s), oversized-file PERSISTING", url: null },
    { date: "2026-08-17", scope: "Ask Dost — 21-case re-run + Spanish case 20", outcome: "Tables/charts FIXED; approval flow intermittent; approval-card labels NEW", url: null },
    { date: "2026-08-13", scope: "Document upload — Documents + Payables", outcome: "1 Critical (wrong document content), 1 High (extraction)", url: null },
  ],
  quickLinks: [
    { title: "Dost Portal — Master Test Map", url: "https://app.notion.com/p/3bf0f4c873ef8162aa65ddf65409a864", scope: "The index — what was tested, when, against which baseline" },
    { title: "Dost Portal — QA Dashboard (Notion)", url: "https://app.notion.com/p/3bf0f4c873ef81edb33af8daa9ef8501", scope: "The source this file mirrors" },
    { title: "QA Baseline — Spanish Localization Sweep — 2026-08-11", url: "https://app.notion.com/p/3b90f4c873ef81308e5ed90ec632bfff", scope: "Spanish UI, 29 findings" },
    { title: "QA Functional Baseline — 2026-08-12", url: "https://app.notion.com/p/3ba0f4c873ef81cc90fffbc2a3c3250e", scope: "10 screens, functional behaviour" },
    { title: "QA Baseline — Workflow Templates — 2026-08-17", url: "https://app.notion.com/p/3bf0f4c873ef81d3b5adcc2a8406bade", scope: "Workflow Templates first pass" },
    { title: "QA Baseline — Dimensions CRUD & Validation — 2026-08-19", url: "https://app.notion.com/p/3c10f4c873ef81b5aa45e6ad2ae45b66", scope: "Dimensions + Dimension Values, CRUD-and-validation-only scope — full pass completed" },
  ],
  blockers: [
    "Sentry holds no data. Project mydost-web under org dost-sn returned zero events across 90 days. Every \"no matching Sentry issue found\" carries no evidential weight.",
    "Credentials are out of agent scope — login, logout, and new-account testing stay with the human tester permanently.",
    "Real OS drag-and-drop and clipboard paste cannot be automated — synthetic events do not trigger the app's handlers. Manual only.",
    "Upload pipeline currently returns 500, blocking all downstream extraction and classification testing.",
    "5 campaigns have no baseline page (modal consistency, Ask Dost, file upload, document upload, performance) — their findings cannot be regression-compared.",
    "Screenshots cannot be committed by the agent — binary files exceed what the GitHub tool can carry. Evidence images must be added to public/screenshots/ by hand, or the entry uses an SVG mockup instead.",
  ],
};
