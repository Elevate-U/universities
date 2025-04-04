// Global variable to hold the university data once loaded
let universities = [];
let currentlySelectedRow = null;
let currentSortColumn = null;
let currentSortDirection = 'asc'; // 'asc' or 'desc'

const tableBody = document.querySelector("#universityTable tbody");
const tableHead = document.querySelector("#universityTable thead");
const detailsDiv = document.getElementById("universityDetails");
const sortableColumns = [0, 1, 2, 3]; // Define sortable columns once

// --- CSV Parsing Function ---
// Basic CSV parser, handles quoted fields containing commas.
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return []; // Need header + at least one data row

    const parseLine = (line) => {
        const values = [];
        let currentVal = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (inQuotes) {
                // Check for escaped quote ("")
                if (char === '"' && i + 1 < line.length && line[i+1] === '"') {
                    currentVal += '"'; // Add one quote to the value
                    i++; // Skip the next quote
                } else if (char === '"') {
                    // End of quoted field
                    inQuotes = false;
                } else {
                    // Character inside quoted field
                    currentVal += char;
                }
            } else {
                // Outside quotes
                if (char === '"') {
                    // Start of quoted field
                    inQuotes = true;
                } else if (char === ',') {
                    // End of field
                    values.push(currentVal.trim()); // Keep surrounding quotes if they were part of the data
                    currentVal = '';
                } else {
                    // Regular character
                    currentVal += char;
                }
            }
        }
        values.push(currentVal.trim().replace(/^"|"$/g, '')); // Add the last value
        return values;
    };

    const headers = parseLine(lines[0]).map(h => h.trim()); // Trim headers
    const data = [];

    // Map CSV headers to JS object keys
    // Ensure these CSV headers exactly match your universitydata.csv file
    const headerMap = {
        "University": "name",
        "Scholarship": "scholarship",
        "Tuition": "tuition",
        "TuitionDisplay": "tuitionDisplay",
        "ProgramLength": "programLength",
        "FAFSA Code": "fafsaCode", // Added FAFSA Code mapping
        "Location": "location",
        "TransitionInfo": "transitionInfo",
        "Website": "website",
        "CostBreakdown": "costBreakdown",
        "Links": "linksJson", // Added Links mapping
        "TotalPopulation": "totalPopulation",
        "Demographics": "demographics",
        "AvgClassSize": "avgClassSize",
        "PTClassSize": "ptClassSize",
        "RMP_Score": "rmpScore",
        "RMP_Link": "rmpLink",
        "RMP_Summary": "rmpSummary",
        "RMP_PT_Profs": "rmpPtProfs",
        "RMP_FirstYear_Recs": "rmpFirstYearRecs"
    };

    // Find the index for each required header
    const indices = {};
    Object.keys(headerMap).forEach(csvHeader => {
        const index = headers.indexOf(csvHeader);
        if (index !== -1) {
            indices[headerMap[csvHeader]] = index;
        } else {
            console.warn(`CSV Header "${csvHeader}" not found.`);
        }
    });

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue; // Skip empty lines
        const values = parseLine(lines[i]);
        const university = {};
        Object.keys(indices).forEach(jsKey => {
            const index = indices[jsKey];
            // Assign value or empty string if index is out of bounds for the row
            university[jsKey] = values[index] !== undefined ? values[index] : '';
        });
        // Add the raw index for potential stable sorting later if needed
        university.originalIndex = i - 1;
        data.push(university);
    }

    return data;
}


// --- Data Loading Function ---
async function loadAndDisplayData() {
    try {
        // Add cache-busting query parameter to prevent stale data
        const response = await fetch('universitydata.csv?cachebust=' + Date.now());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        universities = parseCSV(csvText); // Update the global universities array

        if (universities.length === 0) {
             console.warn("CSV parsing resulted in empty data array.");
             tableBody.innerHTML = `<tr><td colspan="8">No data loaded from CSV. Check file format and content.</td></tr>`; // Adjust colspan
             return;
        }

        // --- Calculate Min/Max Net Cost for Data Bars ---
        let minCost = Infinity;
        let maxCost = -Infinity;
        universities.forEach(uni => {
            const cost = calculateNetCost(uni);
            if (!isNaN(cost)) {
                if (cost < minCost) minCost = cost;
                if (cost > maxCost) maxCost = cost;
            }
        });
        // Handle case where no valid costs are found
        if (minCost === Infinity || maxCost === -Infinity) {
            minCost = 0;
            maxCost = 0;
        }
        const costRange = maxCost - minCost;
        // --- End Min/Max Calculation ---

        populateTable(universities, minCost, costRange); // Pass minCost and costRange
        updateHeaderSortIndicators(); // Update sort indicators
        // Clear details and selection when data reloads initially
        detailsDiv.innerHTML = '';
        if (currentlySelectedRow) {
            currentlySelectedRow.classList.remove('selected-row');
            currentlySelectedRow = null;
        }
    } catch (error) {
        console.error("Error loading or parsing CSV:", error);
        // Display error in the table body
        tableBody.innerHTML = `<tr><td colspan="8">Error loading data. Please check console and CSV file. (${error.message})</td></tr>`; // Adjust colspan
    }
}


// --- Helper Functions (parseValue, calculateNetCost, formatNetCost) ---
// (Keep these functions as they were, they operate on the university object)
function parseValue(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value !== 'string' || !value) { // Added check for empty string
        return NaN;
    }

    let total = 0;
    let foundNumber = false;

    const parts = value.split('+');

    for (const part of parts) {
        const cleanedPart = part.replace(/[$,]/g, '');
        const numberMatches = cleanedPart.match(/(\d+(\.\d+)?)\s*k?/gi);

        if (numberMatches) {
            for (const match of numberMatches) {
                foundNumber = true;
                let num = 0;
                const lowerMatch = match.toLowerCase();

                if (lowerMatch.includes('k')) {
                    num = parseFloat(lowerMatch.replace(/k/i, '')) * 1000;
                } else {
                    num = parseFloat(lowerMatch);
                }

                if (!isNaN(num)) {
                    total += num;
                }
            }
        }
    }

    if (!foundNumber) {
        // If the string doesn't contain 'k' or '+', try parsing it directly as a number
        const directNum = parseFloat(value.replace(/[$,]/g, ''));
        if (!isNaN(directNum)) {
            return directNum;
        }
        return NaN;
    }

    return total;
}

function calculateNetCost(university) {
    let tuitionNum;
    const scholarshipNum = parseValue(university.scholarship);
    let netCost = NaN;

    // Convert tuition string from CSV to number if necessary
    const rawTuition = university.tuition;
    let parsedTuition = NaN;

    // Prioritize TuitionDisplay for Widener calculation if available
    if (university.name === "Widener University" && university.tuitionDisplay) {
         const tuitionParts = university.tuitionDisplay.match(/\$\s*([\d,]+(\.\d+)?)/g); // Improved regex for decimals
         if (tuitionParts && tuitionParts.length === 3) {
             const year1 = parseFloat(tuitionParts[0].replace(/[$,\s]/g, ''));
             const year2 = parseFloat(tuitionParts[1].replace(/[$,\s]/g, ''));
             const year3 = parseFloat(tuitionParts[2].replace(/[$,\s]/g, ''));
             if (!isNaN(year1) && !isNaN(year2) && !isNaN(year3)) {
                 tuitionNum = (year1 + year2 + year3) / 3; // Use average for net cost calculation
             }
         }
    }

    // If Widener average wasn't calculated or it's another university, parse the main tuition field
    if (isNaN(tuitionNum)) {
        if (typeof rawTuition === 'string') {
            parsedTuition = parseFloat(rawTuition.replace(/[$,]/g, ''));
        } else if (typeof rawTuition === 'number') {
            parsedTuition = rawTuition;
        }
        tuitionNum = parsedTuition;
    }


    if (!isNaN(tuitionNum) && !isNaN(scholarshipNum)) {
        netCost = tuitionNum - scholarshipNum;
    }

    return netCost; // Return the number or NaN
}

// Format net cost for display
function formatNetCost(netCost, universityName) {
     if (isNaN(netCost)) {
         return "N/A";
     }
     // Always show two decimal places for Widener average, zero for others
     const formatOptions = (universityName === "Widener University")
         ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
         : { minimumFractionDigits: 0, maximumFractionDigits: 0 };
     let formatted = `$${netCost.toLocaleString('en-US', formatOptions)}`;
     if (universityName === "Widener University") {
         formatted += " (Avg)";
     }
     return formatted;
}

// --- RMP Score Bar Generation ---
function generateRmpScoreHtml(rmpScore, rmpLink) {
    const scoreValue = parseFloat(rmpScore);
    const maxScore = 5.0; // Assuming RMP max score is 5.0
    let scoreText = rmpScore || 'N/A';
    let barPercent = 0;
    let linkHtml = rmpLink && rmpLink !== 'N/A' ? ` (<a href="${rmpLink}" target="_blank">Link</a>)` : '';

    if (!isNaN(scoreValue)) {
        barPercent = Math.max(0, Math.min(100, (scoreValue / maxScore) * 100));
        scoreText = `${scoreValue.toFixed(1)} / ${maxScore.toFixed(1)}`; // Display as X.X / 5.0
    } else {
        scoreText = 'N/A'; // Ensure consistent N/A display
    }

    return `
        <p><strong>Overall Score:</strong>
            <span class="rmp-score-value">${scoreText}</span>${linkHtml}
            <div class="rmp-score-bar-container" title="RMP Score: ${scoreText}">
                <div class="rmp-score-bar" style="width: ${barPercent.toFixed(2)}%;" aria-valuenow="${scoreValue}" aria-valuemin="0" aria-valuemax="${maxScore}" role="progressbar"></div>
            </div>
        </p>
    `;
}


// --- Table Population Function ---
function populateTable(data, minCost, costRange) { // Added minCost, costRange params
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((university) => { // No need for index here anymore unless for debugging
        const row = tableBody.insertRow();
        // Store the university object directly on the row for easy access in click handler
        row.dataset.university = JSON.stringify(university);

        const nameCell = row.insertCell();
        const scholarshipCell = row.insertCell();
        const tuitionCell = row.insertCell();
        const netCostCell = row.insertCell();
        // Add new cells
        const populationCell = row.insertCell();
        const demographicsCell = row.insertCell();
        const avgClassSizeCell = row.insertCell();
        const ptClassSizeCell = row.insertCell();


        nameCell.textContent = university.name || 'N/A'; // Add fallback
        scholarshipCell.textContent = university.scholarship || 'N/A';

        // Use tuitionDisplay if available, otherwise format tuition from the main field
        const tuitionValue = parseValue(university.tuition);
        tuitionCell.textContent = university.tuitionDisplay ? university.tuitionDisplay
            : (!isNaN(tuitionValue) ? `$${tuitionValue.toLocaleString()}` : (university.tuition || 'N/A'));

        // Calculate and display Net Cost
        const netCost = calculateNetCost(university);
        // Store the raw numeric net cost for sorting FIRST
        netCostCell.dataset.value = isNaN(netCost) ? -Infinity : netCost; // Use -Infinity for N/A

        // --- Create Data Bar HTML ---
        const netCostText = formatNetCost(netCost, university.name);
        let barPercent = 0;
        if (!isNaN(netCost) && costRange > 0) {
            barPercent = Math.max(0, Math.min(100, ((netCost - minCost) / costRange) * 100));
        } else if (!isNaN(netCost) && costRange === 0 && maxCost > 0 && netCost === maxCost) {
             // Handle case where all valid costs are the same positive value
             barPercent = 100;
        } else if (!isNaN(netCost) && costRange === 0 && maxCost <= 0 && netCost === maxCost) {
             // Handle case where all valid costs are the same non-positive value
             barPercent = 0; // Or decide how to represent this visually
        }
        // If netCost is NaN, barPercent remains 0

        netCostCell.innerHTML = `
            <div class="net-cost-cell-wrapper" title="Net Cost: ${netCostText}">
              <span class="net-cost-value">${netCostText}</span>
              <div class="net-cost-bar-container">
                 <div class="net-cost-bar" style="width: ${barPercent.toFixed(2)}%;" aria-hidden="true"></div>
              </div>
            </div>
        `;
        // --- End Data Bar HTML ---

        // Populate new cells with fallbacks
        populationCell.textContent = university.totalPopulation || 'N/A';
        demographicsCell.textContent = university.demographics || 'N/A';
        avgClassSizeCell.textContent = university.avgClassSize || 'N/A';
        ptClassSizeCell.textContent = university.ptClassSize || 'N/A';


        row.addEventListener("click", () => {
            // Retrieve the university data stored on the row
            const clickedUniversity = JSON.parse(row.dataset.university);
            displayDetails(clickedUniversity);
            // Highlight selected row
            if (currentlySelectedRow) {
                currentlySelectedRow.classList.remove('selected-row');
            }
            row.classList.add('selected-row');
            currentlySelectedRow = row;
        });
    });
}

// --- Details Display Function ---
function displayDetails(university) {
    const netCost = calculateNetCost(university);
    const netCostText = formatNetCost(netCost, university.name);

    // Use tuitionDisplay if available for the details section as well
    const tuitionValue = parseValue(university.tuition);
    const tuitionDisplayText = university.tuitionDisplay ? university.tuitionDisplay
        : (!isNaN(tuitionValue) ? `$${tuitionValue.toLocaleString()}` : (university.tuition || 'N/A'));


    let detailsHTML = `
        <div class="university-details">
            <h2>${university.name || 'N/A'}</h2>
            <h3>University Info</h3>
            <p><strong>Location:</strong> ${university.location || 'N/A'}</p>
            <h3>Program Details</h3>
            <p><strong>Program Length:</strong> ${university.programLength || 'N/A'}</p>
            <p><strong>Scholarship Amount:</strong> ${university.scholarship || 'N/A'}</p>
            <p><strong>Estimated Annual Tuition:</strong> ${tuitionDisplayText}</p>
            <p><strong>Estimated Net Cost:</strong> ${netCostText}</p>
            <h3>Student Body</h3>
            <p><strong>Total Population:</strong> ${university.totalPopulation || 'N/A'}</p>
            <p><strong>Demographics:</strong> ${university.demographics || 'N/A'}</p>
            <p><strong>Avg Class Size/Ratio:</strong> ${university.avgClassSize || 'N/A'}</p>
            <p><strong>PT Class Size:</strong> ${university.ptClassSize || 'N/A'}</p>
            <h3>Rate My Professors Info</h3>
            ${generateRmpScoreHtml(university.rmpScore, university.rmpLink)}
            <p><strong>School Summary:</strong> ${university.rmpSummary || 'N/A'}</p>
            <div class="rmp-prof-list"><strong>PT/Related Professors:</strong> ${formatProfessorList(university.rmpPtProfs)}</div>
            <p><strong>First Year Recs:</strong> ${university.rmpFirstYearRecs || 'N/A'}</p>
    `;
            // RMP section already has H3

    // Handle Cost Breakdown - Check if it looks like HTML or needs simple formatting
    if (university.costBreakdown) {
        const trimmedBreakdown = university.costBreakdown.trim();
        if (trimmedBreakdown.startsWith('<') && trimmedBreakdown.endsWith('>')) {
             // Assume it's pre-formatted HTML (like DePaul's original entry)
             detailsHTML += `<h3>Cost Breakdown:</h3>${university.costBreakdown}`;
        } else if (trimmedBreakdown.includes(':') && trimmedBreakdown.includes(';')) {
             // Assume semicolon-separated key:value pairs (like some CSV entries)
             detailsHTML += `<h3>Cost Breakdown:</h3><div class="cost-breakdown">`;
             trimmedBreakdown.split(';').forEach(item => {
                 const parts = item.split(':');
                 if (parts.length === 2) {
                     detailsHTML += `<div class="cost-item"><span>${parts[0].trim()}</span><span>${parts[1].trim()}</span></div>`;
                 }
             });
             detailsHTML += `</div>`;
        } else if (trimmedBreakdown) {
             // Otherwise, display as simple text
             detailsHTML += `<h3>Cost Breakdown:</h3><p>${trimmedBreakdown}</p>`;
        }
    }

    // --- Add Categorized Links ---
    detailsHTML += `<h3>Helpful Links:</h3>`;
    try {
        const links = JSON.parse(university.linksJson || '{}');
        if (Object.keys(links).length > 0) {
            detailsHTML += `<ul class="details-links-list">`;
            for (const key in links) {
                // Convert camelCase key to Title Case for display
                const titleCaseKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                detailsHTML += `<li><a href="${links[key]}" target="_blank">${titleCaseKey}</a></li>`;
            }
            detailsHTML += `</ul>`;
        } else {
            detailsHTML += `<p>No specific links available.</p>`;
        }
    } catch (e) {
        console.error("Error parsing links JSON for", university.name, e);
        detailsHTML += `<p>Error loading links.</p>`;
    }
    // --- End Categorized Links ---

    detailsHTML += `
            <p><strong>FAFSA Code:</strong> ${university.fafsaCode || 'N/A'}</p>
            <p><strong>Transition Info:</strong> ${university.transitionInfo || 'N/A'}</p>
            ${university.website ? `<p><a href="${university.website}" target="_blank">Visit Main University Website</a></p>` : ''}
        </div>
    `;

    detailsDiv.innerHTML = detailsHTML;
}

// --- Helper function to format professor list ---
function formatProfessorList(profString) {
    if (!profString || profString === 'N/A' || profString === 'None found on RMP.' || profString === 'Data unavailable due to RMP scrape failure.') {
        return ' N/A'; // Add space for alignment if no data
    }

    const profs = profString.split(';');
    let htmlList = '<ul>';

    profs.forEach(prof => {
        prof = prof.trim();
        if (prof) {
            let name = prof; // Default to full string
            let ratingInfo = '';
            let link = null;
            let snippet = '';

            // 1. Try to extract URL
            const urlMatch = prof.match(/https?:\/\/[^\s\)]+/);
            if (urlMatch) {
                link = urlMatch[0];
                // Remove URL from string to simplify further parsing
                prof = prof.replace(link, '').replace(/,\s+\):?/, '):'); // Clean up trailing comma/space before closing paren
            }

            // 2. Try to extract Name (everything before the first '(' )
            const nameMatch = prof.match(/^([^(]+)/);
            if (nameMatch) {
                name = nameMatch[1].trim();
            }

            // 3. Try to extract Rating Info (inside parentheses)
            const ratingMatch = prof.match(/\(([^)]+)\)/);
            if (ratingMatch) {
                ratingInfo = ratingMatch[1].trim();
                // Clean up name if rating info was successfully extracted
                name = prof.substring(0, prof.indexOf('(')).trim();
            }

             // 4. Try to extract Snippet (after colon, if any)
             const snippetMatch = prof.match(/:\s*(.*)$/);
             if (snippetMatch) {
                 snippet = `: ${snippetMatch[1].trim()}`;
                 // Clean up ratingInfo if snippet was found after colon
                 if (ratingInfo && ratingInfo.includes(':')) {
                    ratingInfo = ratingInfo.substring(0, ratingInfo.indexOf(':')).trim();
                 }
             }


            // 5. Construct list item
            let linkHtml = link ? ` (<a href="${link}" target="_blank">RMP</a>)` : '';
            let ratingHtml = ratingInfo ? ` (${ratingInfo})` : '';

            // Ensure we don't render the raw URL if parsing failed badly
            if (name.includes('http')) {
                 console.error("Failed to properly parse name, potential raw URL:", name, "Original:", profString);
                 htmlList += `<li>Error parsing professor data</li>`;
            } else {
                 htmlList += `<li>${name}${ratingHtml}${linkHtml}${snippet}</li>`;
            }
        }
    });
    htmlList += '</ul>';
    return htmlList;
}

// --- Sorting Functions ---
function sortTable(columnIndex) {
    // Check if the column index is valid (0-7 for the 8 columns)
    if (columnIndex < 0 || columnIndex > 7) { // Adjusted for 8 columns
        console.warn("Sorting not implemented for this column index:", columnIndex);
        return;
    }

    // Define which columns are numeric/parsable
    const numericColumns = [2, 3]; // Tuition (index 2), Net Cost (index 3)
    const parsableColumns = [1]; // Scholarship (index 1) needs parseValue
    // Add indices for new sortable columns if needed (e.g., Population)
    // const populationColumnIndex = 4;

    const isNumeric = numericColumns.includes(columnIndex);
    const isParsable = parsableColumns.includes(columnIndex);
    // const isPopulation = columnIndex === populationColumnIndex;

    // Determine sort direction
    if (currentSortColumn === columnIndex) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortDirection = 'asc';
        currentSortColumn = columnIndex;
    }

    // Update header styles
    updateHeaderSortIndicators();

    // Sort the global universities array directly
    universities.sort((a, b) => {
        let valA, valB;

        // Extract values based on column index
        switch (columnIndex) {
            case 0: // University Name
                valA = a.name?.toLowerCase() || '';
                valB = b.name?.toLowerCase() || '';
                break;
            case 1: // Scholarship
                valA = parseValue(a.scholarship);
                valB = parseValue(b.scholarship);
                break;
            case 2: // Tuition
                 valA = parseValue(a.tuition); // Use parseValue for consistency
                 valB = parseValue(b.tuition);
                 break;
            case 3: // Net Cost
                valA = calculateNetCost(a);
                valB = calculateNetCost(b);
                break;
            // Add cases for new sortable columns here
            // case 4: // Total Population
            //     valA = parseInt(a.totalPopulation?.replace(/,/g, ''), 10);
            //     valB = parseInt(b.totalPopulation?.replace(/,/g, ''), 10);
            //     break;
            default: // Default to string comparison for other columns for now
                // This requires getting the text content, which is less efficient.
                // Consider adding specific parsing for other columns if needed.
                const keys = ["name", "scholarship", "tuition", "netCost", "totalPopulation", "demographics", "avgClassSize", "ptClassSize"];
                const key = keys[columnIndex];
                valA = a[key]?.toString().toLowerCase() || '';
                valB = b[key]?.toString().toLowerCase() || '';
        }

        // Handle NaN or non-numeric values for numeric/parsable columns
        if (isNumeric || isParsable /* || isPopulation */) {
            valA = isNaN(valA) ? (currentSortDirection === 'asc' ? Infinity : -Infinity) : valA;
            valB = isNaN(valB) ? (currentSortDirection === 'asc' ? Infinity : -Infinity) : valB;
        }


        // Comparison logic
        if (valA < valB) {
            return currentSortDirection === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return currentSortDirection === 'asc' ? 1 : -1;
        }
        // If values are equal, maintain original order (stable sort)
        return a.originalIndex - b.originalIndex;
    });

    // Repopulate the table with the sorted data
    populateTable(universities);

    // Clear details and selection after sorting
    detailsDiv.innerHTML = '';
    if (currentlySelectedRow) {
        currentlySelectedRow.classList.remove('selected-row');
        currentlySelectedRow = null;
    }
}

function updateHeaderSortIndicators() {
    const headers = tableHead.querySelectorAll('th');
    headers.forEach((th, index) => {
        th.classList.remove('sort-asc', 'sort-desc', 'sortable'); // Reset classes

        // Define which columns are currently sortable
        const sortableColumns = [0, 1, 2, 3]; // Example: Name, Scholarship, Tuition, Net Cost
        // Add indices of other columns you want to make sortable

        if (sortableColumns.includes(index)) {
             th.classList.add('sortable');
             if (index === currentSortColumn) {
                 th.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
             }
        }
    });
}


// --- Initial Setup ---

// Add event listeners to table headers for sorting
tableHead.querySelectorAll('th').forEach((th, index) => {
    // Only add listener to columns defined as sortable (using the global definition)
    if (sortableColumns.includes(index)) {
        th.addEventListener('click', () => sortTable(index));
    }
});

// Load data when the DOM is ready
document.addEventListener('DOMContentLoaded', loadAndDisplayData);