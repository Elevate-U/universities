# Plan for Updating universitydata.csv (v8 - Nuanced Data Handling & Verification)

This plan outlines the steps to update `universitydata.csv` by filling empty cells with detailed, nuanced information gathered from local files and online research, while ensuring consistency with `universitydata.xlsx`.

## 1. Interpretive Local Source Analysis:
- Analyze `universitydata.csv`, the text view of `universitydata.xlsx`, and relevant PDFs in `../university letter PDFS/`.
- Aim to understand information in context, looking for corroborating details and potential date stamps.

## 2. Nuanced Gap & Discrepancy Report (Verification 1):
- Present a report detailing:
    - Data points potentially filled from local sources (CSV/XLSX/PDF name).
    - Significant discrepancies found (e.g., different tuition figures presented as ranges or summaries).
    - A list of data points still lacking sufficient detail across local sources.
- **Ask user:** "Based on local files, here's what I've gathered, including potential discrepancies [mention specific examples]. How should we represent these discrepancies, and does the list of remaining gaps look right before I search online?"

## 3. Contextual Online Research:
- For confirmed gaps, research will focus on gathering contextual understanding, aiming for a 4-10 sentence meaningful summary where appropriate.
- If conflicting information is found online (e.g., different class sizes), note this.
- Prioritize official university websites.

## 4. Synthesized Research Review (Verification 2):
- Present researched information, synthesizing findings into detailed summaries (4-10 sentences where applicable).
- Explicitly highlight ranges, conflicting qualitative points, and cite sources within the summary.
- **Ask user:** "Here's a synthesis of the online findings, including ranges and differing perspectives. How would you like this nuanced information represented in the final CSV cells? (e.g., use the range '40-50', summarize both perspectives?)"

## 5. Handling Unfound Data:
- If comprehensive information remains elusive after checking all sources, mark the cell `"Info Not Found (Multiple Sources Checked)"`.

## 6. Reflective CSV Change Preview (Verification 3):
- Present a diff or summary showing how the nuanced data (ranges, synthesized summaries reflecting user guidance from Verif. 2) will appear in the CSV (rows 2-24).
- **Ask user:** "Here's how the CSV will look incorporating the detailed summaries, ranges, and perspectives as discussed. Do you approve these specific representations?"

## 7. Nuanced Data for Manual XLSX Update:
- After CSV update, provide a clearly formatted list `(Row Number, Column Name, Approved Nuanced Value)` for each change, matching the approved CSV representation, to facilitate manual XLSX entry.

## 8. Detailed Instructions for XLSX Update:
- (Alternative to #7 if chosen by user) Generate a markdown file (`userInstructions/update_xlsx.md`) with explicit, step-by-step guidance for inputting the nuanced, approved text into the correct XLSX cells.

## 9. Pre-Write Confirmation:
- Before writing the CSV, issue a final confirmation: "Confirming intent to write the approved nuanced changes to `universitydata.csv`."

## 10. Post-Write Spot Check (Optional):
- After successful CSV write, optionally read back the header and first few updated data rows for visual confirmation.

## Process Flow Diagram:

```mermaid
graph TD
    A[Start: Task Clarified] --> B[Read CSV];
    B --> C[Read XLSX (Text)];
    C --> D[List/Read PDFs];
    D --> E[Compare Sources & Identify Gaps];
    E --> F[Verification Point 1: Review Gaps/Inconsistencies];
    F -- Confirmed --> G[Define/Execute Online Research (Rows 2-24)];
    G --> H[Verification Point 2: Review Researched Data];
    H -- Confirmed --> I[Prepare Proposed Full CSV Content];
    I --> J[Verification Point 3: Approve CSV Content];
    J -- Confirmed --> K[Inform XLSX Limitation];
    K --> L[Verification Point 4: Choose XLSX Update Method];
    L -- Method Chosen --> M[Offer to Save Plan?];
    M -- Yes --> N[Save Plan to MD];
    M -- No --> O[Switch to Code Mode (if needed)];
    N --> O;
    O --> P[Execute Plan (Write CSV, Provide XLSX Info/Instructions)];
    P --> Q[End: Task Complete];
    F -- Needs Clarification --> E;
    H -- Needs Clarification --> G;
    J -- Needs Changes --> I;
    L -- Needs Clarification --> K;