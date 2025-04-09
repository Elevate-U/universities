// Global variable to hold the university data once loaded
let universities = [];
let currentlySelectedRow = null;
let currentSortColumn = null;
let currentSortDirection = 'asc'; // 'asc' or 'desc'
let globalMinCost = 0; // Global variable for min cost
let globalCostRange = 0; // Global variable for cost range

const tableBody = document.querySelector("#universityTable tbody");
const tableHead = document.querySelector("#universityTable thead");
const detailsDiv = document.getElementById("universityDetails");
const sortableColumns = [0, 1, 2, 3]; // Define sortable columns once


// --- Food Summaries Data ---
const foodSummaries = {
    "DePaul University": `Student feedback regarding dining options at DePaul University, as reflected in Rate My Professors reviews, often includes notable criticism. A recurring theme centers specifically on the quality of the food served in campus dining facilities. Many reviewers express dissatisfaction regarding the taste, preparation, or overall value perceived. While the vibrant Chicago location offers countless off-campus alternatives, the on-campus experience appears inconsistent according to this feedback. Positive comments about the food itself are scarce within the provided RMP summaries, making the critiques on quality stand out. These dining concerns contribute to the list of practical challenges some students report experiencing alongside issues like safety or bureaucracy. Prospective students evaluating DePaul might consider budgeting for off-campus meals or thoroughly investigating current dining hall offerings during a campus visit, given the trend in these reviews. Exploring menus online or sampling food during a tour could offer valuable firsthand insight.`,
    "University of Illinois Chicago": `Dining at the University of Illinois Chicago receives mixed, though often critical, commentary in Rate My Professors reviews. The term "hit or miss" is used in the summary, suggesting significant inconsistency in the quality of food provided. Students report variability in meal preparation and taste across different locations or times. Beyond quality, limited options or inconvenient hours might also contribute to dissatisfaction, especially considering UIC's reputation as a commuter school where campus life can quiet down significantly on weekends. While specific positive reviews might exist, the overall trend from the provided data indicates that food is not generally considered a highlight of the UIC experience. Given the university's location within Chicago, students have numerous external dining choices in nearby neighborhoods like Little Italy. However, reliance on campus dining appears to be met with inconsistent satisfaction according to these RMP summaries. Investigating current dining plans and locations via the UIC Dining Services website is advisable.`,
    "University of Michigan-Flint": `The culinary experience at the University of Michigan-Flint appears to be a significant point of dissatisfaction according to Rate My Professors reviews. Feedback strongly indicates that food quality and options are poorly rated by students. This criticism stands in contrast to generally positive remarks about academics and faculty support found in the same reviews. The summaries suggest that students find the on-campus dining choices lacking in taste, variety, or overall appeal. For a campus sometimes described as having a 'commuter feel,' limited or unappetizing food options could further detract from the on-campus experience, particularly for residential students. While the campus itself is noted as safe and having good facilities otherwise, dining seems to be a consistent area needing improvement based on this RMP feedback. Prospective students should directly investigate current UM-Flint Dining options, menus, and hours, and explore nearby off-campus alternatives in downtown Flint.`,
    "University of Texas at Dallas": `Dining experiences at the University of Texas at Dallas are frequently criticized according to Rate My Professors reviews. The feedback highlights issues with both food quality and operational hours. Chartwells, the university's food service provider, is sometimes mentioned in relation to concerns about taste and preparation standards. Limited dining hours are another significant point of frustration noted in the reviews, exemplified by complaints about the Student Union (SU) closing relatively early. This lack of late-night or potentially weekend availability can negatively impact students, particularly on a campus sometimes described as having a less active social or residential scene. While UTD boasts strong academics, the dining situation appears to be a consistent drawback based on this student feedback. Exploring the current offerings on the UTD Dining website and checking the numerous off-campus options in the surrounding Richardson area would be wise for prospective students.`,
    "Ithaca College": `Ithaca College's dining services receive notable criticism in Rate My Professors reviews, despite general praise for academics. Students frequently mention issues with poor food quality and high costs associated with meal plans. The variety and taste of offerings in the dining halls seem to be common points of dissatisfaction. These complaints about food contribute to broader concerns sometimes raised about campus life aspects, contrasting with the positive educational experience many report. While Ithaca offers off-campus dining, the on-campus options appear to be a significant drawback for many students according to these reviews. Reliability of dining hall hours or specific location availability might also be factors, though quality and cost are the most prominent themes in the provided RMP summaries. Prospective students should review current Ithaca Dining Services information, including menus and pricing, and potentially budget for off-campus meals.`,
    "University of Hartford": `Dining at the University of Hartford is frequently cited as a point of concern in Rate My Professors reviews. Alongside complaints about outdated facilities and high costs, poor food quality and limited variety are common themes in student feedback. Reviews suggest dissatisfaction with the taste, preparation, and options available through campus dining services. For a campus sometimes described as having a weaker social life or being somewhat isolated, unappealing food options can significantly impact the residential experience. While academic programs like PT might be strong, the day-to-day aspect of campus dining appears to be a consistent area needing improvement based on this RMP data. Students considering UHart should investigate the current Dining Services offerings, locations, and meal plan structures, keeping in mind the trend of criticism found in these reviews. Exploring off-campus options in nearby West Hartford might also be necessary.`,
    "Saint Louis University": `Saint Louis University's dining hall food is frequently criticized in Rate My Professors reviews, representing a notable drawback mentioned alongside safety concerns. Students often express dissatisfaction with the quality, taste, and potentially the variety of meals offered through campus dining. This seems to be a consistent theme contrasting with generally positive feedback about academics and specific professors, particularly within the PT program. While the university has good facilities overall, the culinary experience appears to be lacking according to this student sentiment. Given that reviewers sometimes feel a car is needed to fully access St. Louis, reliance on potentially subpar campus food could be a significant factor for residential students. Prospective students should examine current menus, locations, and hours via SLU Dining Services and consider the recurring critiques highlighted in the RMP feedback when evaluating their options.`,
    "Duquesne University": `Food at Duquesne University is commonly identified as an area for improvement based on feedback found in Rate My Professors reviews. Alongside high costs and social scene critiques, poor food quality or limited options are frequently mentioned downsides. Students seem generally unsatisfied with the taste, variety, or value provided by campus dining services. While the university's location offers access to Pittsburgh's culinary scene, the on-campus dining experience itself appears to be a source of complaint according to these reviews. The consistency and appeal of meals served in dining halls seem to fall short of expectations for a number of students reporting on RMP. It would be advisable for prospective students to look into the current offerings via Duquesne Dining, consider meal plan costs relative to perceived quality, and explore off-campus alternatives.`,
    "Widener University": `Widener University's dining services face criticism regarding quality according to Rate My Professors reviews. The RMP summary highlights poor food as a common complaint, listed alongside issues like high cost, facility conditions, and weak social life. This suggests that the meals provided on campus may lack appeal in terms of taste, preparation, or variety. For students living on campus, particularly given concerns sometimes raised about the surrounding Chester area limiting off-campus ventures, unsatisfactory food can significantly impact daily life. While the university might offer strong academic or co-op opportunities, dining appears to be a consistent point of negative feedback. Prospective students should carefully review the options, menus, and costs provided by Widener Dining and factor the reported quality issues from RMP into their decision-making process.`,
    "Gonzaga University": `Dining at Gonzaga University receives notable criticism for being both poor in quality and expensive, according to Rate My Professors reviews. While the university is praised for its strong community, campus beauty, and supportive professors, the food service appears to be a significant drawback for many students. Reviews suggest dissatisfaction with the taste, variety, and overall value of the meals provided on campus relative to their cost. This is mentioned alongside concerns about the surrounding Spokane area and occasional critiques of dorms or academics not matching the high price tag. The consistency of negative food comments suggests it's a widespread issue impacting the student experience. Prospective students should investigate current meal plans and options via Zag Dining by Sodexo but be aware of the recurring critiques regarding quality and cost found in the RMP feedback.`,
    "Daemen University": `Daemen University's food services are heavily criticized in Rate My Professors reviews, often described as "terrible." Complaints focus on poor quality, limited hours, lack of variety, and, alarmingly, mentions of food poisoning incidents in some reviews. This negative feedback stands in stark contrast to praise for academics in specific programs like PT/PA/Nursing. For a campus already criticized for a poor social life and lack of activities, subpar and potentially unsafe food options represent a major detractor from the overall student experience, especially for residents. The consistency and severity of these complaints suggest systemic issues with campus dining based on this RMP data. Prospective students must carefully investigate current Daemen Dining options, hours, and safety records, and strongly consider alternatives in the Amherst area, given the strong negative sentiment in reviews.`,
    "Baylor University": `Dining at Baylor University is identified as an area of weakness in Rate My Professors reviews. While the university receives praise for its community, faculty support, and facilities, the food quality and cost are frequently criticized. Students express dissatisfaction with the taste, variety, and expense of meals provided through campus dining services. This negative feedback is listed alongside concerns about an exclusive campus culture and safety in the surrounding Waco area. For students living on campus, the perceived poor quality and high cost of mandatory meal plans can be a significant source of frustration. Prospective students should explore the current Baylor Dining Services locations, menus, and meal plan costs, while keeping in mind the recurring critiques regarding food quality highlighted in the RMP feedback.`
    // Add other universities here if needed
};

// --- Data Loading Function (Using Papa Parse) ---
async function loadAndDisplayData() {
    // Define expected headers based on the headerMap used later
    const expectedHeaders = [
        "University", "Scholarship", "Tuition", "TuitionDisplay", "ProgramLength",
        "FAFSA Code", "Location", "TransitionInfo", "Website", "CostBreakdown",
        "Links", "TotalPopulation", "Demographics", "AvgClassSize", "PTClassSize",
        "RMP_Score", "RMP_Link", "RMP_Summary", "RMP_PT_Profs", "RMP_FirstYear_Recs",
        "RMP_Positive_Reviews", "RMP_Negative_Reviews", "publicTransitInfo",
        "drivingParkingInfo", "cyclingInfo", "walkingInfo", "rideShareTaxiInfo",
        "airportAccessInfo", "campusShuttleInfo"
    ];
    const expectedFieldCount = expectedHeaders.length;

    try {
        Papa.parse('universitydata.csv?cachebust=' + Date.now(), {
            download: true, // Fetch the file
            header: true,   // Use the first row as headers
            skipEmptyLines: true, // Skip empty lines
            dynamicTyping: false, // Treat all values as strings initially
            // REMOVED step function to avoid modifying data during stream
            // REMOVED step function to avoid modifying data during stream
            // REMOVED step function to avoid modifying data during stream

            complete: function(results) {
                console.log("Papa Parse Results:", results); // Log Papa Parse output

                // Log field count errors but proceed, as we will pad the data
                const fieldCountErrors = results.errors.filter(e => e.code === 'TooFewFields' || e.code === 'TooManyFields');
                if (fieldCountErrors.length > 0) {
                    console.warn("Papa Parse Field Count Errors (will attempt to pad):", fieldCountErrors);
                }
                // Log other critical errors
                const otherErrors = results.errors.filter(e => e.code !== 'TooFewFields' && e.code !== 'TooManyFields');
                if (otherErrors.length > 0) {
                    console.error("Papa Parse Critical Errors:", otherErrors);
                    tableBody.innerHTML = `<tr><td colspan="12">Error parsing CSV. Check console. (${otherErrors[0].message})</td></tr>`;
                    return; // Stop processing for critical errors
                }

                // --- ADDED: Pad missing fields in results.data ---
                if (results.data && results.data.length > 0) {
                    results.data.forEach((row, index) => {
                        const actualFields = Object.keys(row);
                        if (actualFields.length < expectedFieldCount) {
                            // console.log(`Padding row index ${index} (CSV row ${index + 2})`); // CSV row is index + header + 1
                            expectedHeaders.forEach(header => {
                                if (!row.hasOwnProperty(header)) {
                                    row[header] = ''; // Add missing field with empty string
                                }
                            });
                        }
                    });
                }
                // --- End Padding ---
                // Map Papa Parse data (keys are headers) to our expected object structure
                const headerMap = {
                    "University": "name",
                    "Scholarship": "scholarship",
                    "Tuition": "tuition",
                    "TuitionDisplay": "tuitionDisplay",
                    "ProgramLength": "programLength",
                    "FAFSA Code": "fafsaCode",
                    "Location": "location",
                    "TransitionInfo": "transitionInfo",
                    "Website": "website",
                    "CostBreakdown": "costBreakdown",
                    "Links": "linksJson",
                    "TotalPopulation": "totalPopulation",
                    "Demographics": "demographics",
                    "AvgClassSize": "avgClassSize",
                    "PTClassSize": "ptClassSize",
                    "RMP_Score": "rmpScore",
                    "RMP_Link": "rmpLink",
                    "RMP_Summary": "rmpSummary",
                    "RMP_Positive_Reviews": "rmpPositive", // Corrected mapping
                    "RMP_Negative_Reviews": "rmpNegative", // Corrected mapping
                    "RMP_PT_Profs": "rmpPtProfs",
                    "RMP_FirstYear_Recs": "rmpFirstYearRecs",
                    "PublicTransitInfo": "publicTransitInfo", // Corrected mapping
                    "DrivingParkingInfo": "drivingParkingInfo", // Corrected mapping
                    "CyclingInfo": "cyclingInfo",
                    "WalkingInfo": "walkingInfo",
                    "RideShareTaxiInfo": "rideShareTaxiInfo",
                    "AirportAccessInfo": "airportAccessInfo",
                    "CampusShuttleInfo": "campusShuttleInfo"
                };

                // Now map the potentially padded data
                universities = results.data.map((row, index) => {
                    console.log(`[Papa Parse Map] Index ${index}: Raw Row Review Data - Positive:`, row['RMP_Positive_Reviews'], 'Negative:', row['RMP_Negative_Reviews']); // DEBUG LOG
                    const university = {};
                    // Map CSV headers to JS keys using headerMap
                    Object.keys(headerMap).forEach(csvHeader => {
                        const jsKey = headerMap[csvHeader];
                        // Access the potentially padded row data
                        university[jsKey] = row[csvHeader] !== undefined ? String(row[csvHeader]).trim() : '';
                    });
                    university.originalIndex = index; // Keep original index
                    return university;
                    console.log(`[Papa Parse Map] Index ${index}: Mapped University Review Data - Positive:`, university.rmpPositive, 'Negative:', university.rmpNegative); // DEBUG LOG
                });

                // Check for empty array AFTER padding and mapping attempt
                if (universities.length === 0 && results.data.length > 0) {
                     console.error("Data mapping failed after parsing. Check headerMap and CSV headers.");
                     tableBody.innerHTML = `<tr><td colspan="12">Error processing parsed data. Check console.</td></tr>`;
                     return;
                } else if (universities.length === 0) {
                     console.warn("CSV parsing resulted in empty data array (or file is empty).");
                     tableBody.innerHTML = `<tr><td colspan="12">No data loaded from CSV. Check file format and content.</td></tr>`;
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
                // Store globally
                globalMinCost = minCost;
                globalCostRange = costRange;
                // --- End Min/Max Calculation ---

                populateTable(universities, globalMinCost, globalCostRange); // Use global values
                updateHeaderSortIndicators(); // Update sort indicators
                // Clear details and selection when data reloads initially
                detailsDiv.innerHTML = '';

                if (currentlySelectedRow) {
                    currentlySelectedRow.classList.remove('selected-row');
                    currentlySelectedRow = null;
                }
            },
            error: function(error) {
                console.error("Error fetching or parsing CSV with Papa Parse:", error);
                // Display error in the table body
                tableBody.innerHTML = `<tr><td colspan="12">Error loading data. Please check console and CSV file. (${error.message || error})</td></tr>`;
            }
        });

    } catch (error) {
        // This catch block might still be useful for errors outside Papa Parse's scope,
        // but Papa Parse's error callback handles fetch/parse errors primarily.
        console.error("Unexpected error in loadAndDisplayData:", error);
        tableBody.innerHTML = `<tr><td colspan="12">An unexpected error occurred. Check console. (${error.message})</td></tr>`;
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
    if (university.name === "Widener University") {
    }
    if (university.name === "Widener University" && university.tuitionDisplay) {
         const tuitionParts = university.tuitionDisplay.match(/\$\s*([\d,]+(\.\d+)?)/g); // Improved regex for decimals
         if (tuitionParts && tuitionParts.length === 3) {
             const year1 = parseFloat(tuitionParts[0].replace(/[$,\s]/g, ''));
             const year2 = parseFloat(tuitionParts[1].replace(/[$,\s]/g, ''));
             const year3 = parseFloat(tuitionParts[2].replace(/[$,\s]/g, ''));
             if (!isNaN(year1) && !isNaN(year2) && !isNaN(year3)) {
                 tuitionNum = (year1 + year2 + year3) / 3; // Use average for net cost calculation
             }
         } else { // Corresponds to: if (tuitionParts && tuitionParts.length === 3)
         }
    } // Closes: if (university.name === "Widener University" && university.tuitionDisplay)

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
    let linkHtml = '';
    // console.log(`generateRmpScoreHtml: Received rmpLink: "${rmpLink}"`); // Debug log
    if (rmpLink && rmpLink !== 'N/A') {
        // console.log(`generateRmpScoreHtml: Creating link with href: "${rmpLink}"`); // Debug log
        linkHtml = ` (<a href="${rmpLink}" target="_blank">Link</a>)`;
    }

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

function populateTable(data, minCost, costRange) {
    tableBody.innerHTML = '';

    // Define the keys corresponding to the columns to display in the main table
    // These keys match the properties in the `university` object after mapping
    const keysToDisplayInTable = [
        "name",         // "University"
        "scholarship",  // "Scholarship Amount (Annual)"
        "tuition",      // "Estimated Annual Tuition (2025)"
        "netCost",      // "Estimated Net Cost (Annual)" - Calculated
        "totalPopulation", // "Total Population"
        "demographics", // "Demographics"
        "avgClassSize", // "Avg Class Size/Ratio"
        "ptClassSize"   // "PT Class Size"
    ];

    data.forEach((university) => {
        const row = tableBody.insertRow();
        // Store the *entire* university object for the details view
        row.dataset.university = JSON.stringify(university);

        keysToDisplayInTable.forEach(key => {
            const cell = row.insertCell();
            let cellValue = '';

            switch (key) {
                case "name":
                    cellValue = university.name || 'N/A';
                    cell.textContent = cellValue;
                    break;
                case "scholarship":
                    const scholarshipValue = parseValue(university.scholarship);
                    cellValue = !isNaN(scholarshipValue) ? `$${scholarshipValue.toLocaleString()}` : (university.scholarship || 'N/A');
                    cell.textContent = cellValue;
                    break;
                case "tuition":
                    const tuitionValue = parseValue(university.tuition);
                    // Always use the 'Tuition' column value, formatted
                    if (!isNaN(tuitionValue)) {
                        cellValue = `$${tuitionValue.toLocaleString()}`;
                    } else {
                        // Fallback if numeric parsing failed, use the raw string if available
                        cellValue = university.tuition || 'N/A';
                    }
                    cell.textContent = cellValue;
                    break;
                case "netCost":
                    const netCost = calculateNetCost(university);
                    cell.dataset.value = isNaN(netCost) ? -Infinity : netCost; // Store numeric value for sorting
                    const netCostText = formatNetCost(netCost, university.name);
                    let barPercent = 0;
                    if (!isNaN(netCost) && costRange > 0) {
                        barPercent = Math.max(0, Math.min(100, ((netCost - minCost) / costRange) * 100));
                    } else if (!isNaN(netCost) && costRange === 0 && maxCost > 0 && netCost === maxCost) {
                         barPercent = 100;
                    } else if (!isNaN(netCost) && costRange === 0 && maxCost <= 0 && netCost === maxCost) {
                         barPercent = 0;
                    }
                    // Display Net Cost with bar
                    cell.innerHTML = `
                        <div class="net-cost-cell-wrapper" title="Net Cost: ${netCostText}">
                          <span class="net-cost-value">${netCostText}</span>
                          <div class="net-cost-bar-container">
                             <div class="net-cost-bar" style="width: ${barPercent.toFixed(2)}%;" aria-hidden="true"></div>
                          </div>
                        </div>
                    `;
                    break; // innerHTML was set, no need for textContent
                case "totalPopulation":
                    cellValue = university.totalPopulation || 'N/A';
                    cell.textContent = cellValue;
                    break;
                case "demographics":
                    cellValue = university.demographics || 'N/A';
                    cell.textContent = cellValue;
                    break;
                case "avgClassSize":
                    cellValue = university.avgClassSize || 'N/A';
                    cell.textContent = cellValue;
                    break;
                case "ptClassSize":
                    cellValue = university.ptClassSize || 'N/A';
                    cell.textContent = cellValue;
                    break;
                default:
                    cell.textContent = 'N/A'; // Fallback for unexpected keys
            }
        });

        row.addEventListener("click", () => {
            // Retrieve the university data stored on the row
            const clickedUniversity = JSON.parse(row.dataset.university);
            // console.log("Row clicked. University data:", clickedUniversity); // Debug log
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
// --- Entity Map and Hyperlinking Helper ---
const entityUrlMap = {
    // Cities / Locations
    "Chicago": "https://en.wikipedia.org/wiki/Chicago",
    "Flint, MI": "https://en.wikipedia.org/wiki/Flint,_Michigan",
    "Flint": "https://en.wikipedia.org/wiki/Flint,_Michigan", // Alias
    "Dallas, TX": "https://en.wikipedia.org/wiki/Dallas",
    "Dallas": "https://en.wikipedia.org/wiki/Dallas", // Alias
    "Ithaca, NY": "https://en.wikipedia.org/wiki/Ithaca,_New_York",
    "Ithaca": "https://en.wikipedia.org/wiki/Ithaca,_New_York", // Alias
    "West Hartford, CT": "https://en.wikipedia.org/wiki/West_Hartford,_Connecticut",
    "Saint Louis, MO": "https://en.wikipedia.org/wiki/St._Louis",
    "St. Louis": "https://en.wikipedia.org/wiki/St._Louis", // Alias
    "STL": "https://en.wikipedia.org/wiki/St._Louis", // Alias
    "Pittsburgh, PA": "https://en.wikipedia.org/wiki/Pittsburgh",
    // "Pittsburgh": "https://en.wikipedia.org/wiki/Pittsburgh", // Alias - Removed due to causing nested link issue
    "Chester, PA": "https://en.wikipedia.org/wiki/Chester,_Pennsylvania",
    "Chester": "https://en.wikipedia.org/wiki/Chester,_Pennsylvania", // Alias
    "Philadelphia": "https://en.wikipedia.org/wiki/Philadelphia",
    "Spokane, WA": "https://en.wikipedia.org/wiki/Spokane,_Washington",
    "Spokane": "https://en.wikipedia.org/wiki/Spokane,_Washington", // Alias
    "Albuquerque, NM": "https://en.wikipedia.org/wiki/Albuquerque,_New_Mexico",
    "Albuquerque": "https://en.wikipedia.org/wiki/Albuquerque,_New_Mexico", // Alias
    "Amherst, NY": "https://en.wikipedia.org/wiki/Amherst,_New_York",
    "Buffalo": "https://en.wikipedia.org/wiki/Buffalo,_New_York", // Alias
    "Waco, TX": "https://en.wikipedia.org/wiki/Waco,_Texas",
    // "Waco": "https://en.wikipedia.org/wiki/Waco,_Texas", // Alias - Removed due to causing nested link issue
    "Lincoln Park": "https://en.wikipedia.org/wiki/Lincoln_Park,_Chicago",
    "Loop": "https://en.wikipedia.org/wiki/Chicago_Loop",
    // Universities - Main sites and program-specific links
    "DePaul University": "https://www.depaul.edu/",
    "DePaul DPT": "https://csh.depaul.edu/academics/graduate/health-sciences/Pages/default.aspx",
    "University of Illinois Chicago": "https://www.uic.edu/",
    "UIC DPT": "https://ahs.uic.edu/physical-therapy/",
    "UIC": "https://www.uic.edu/",
    "University of Michigan-Flint": "https://www.umflint.edu/",
    "UM-Flint DPT": "https://www.umflint.edu/physicaltherapy/",
    "UM-Flint": "https://www.umflint.edu/",
    "University of Texas at Dallas": "https://www.utdallas.edu/",
    "UTD DPT": "https://www.utdallas.edu/ah/programs/dpt/",
    "UTD": "https://www.utdallas.edu/",
    "UT Southwestern": "https://www.utsouthwestern.edu/",
    "UTSW DPT": "https://www.utsouthwestern.edu/education/school-of-health-professions/programs/doctor-physical-therapy/",
    "Ithaca College": "https://www.ithaca.edu/",
    "Ithaca DPT": "https://www.ithaca.edu/hs/depts/pt/",
    "University of Hartford": "https://www.hartford.edu/",
    "UHart DPT": "https://www.hartford.edu/hps/academics/graduate/physical-therapy/",
    "UHart": "https://www.hartford.edu/",
    "Saint Louis University": "https://www.slu.edu/",
    "SLU DPT": "https://www.slu.edu/doisy/degrees/undergraduate/physical-therapy.php",
    "SLU": "https://www.slu.edu/",
    "Duquesne University": "https://www.duq.edu/",
    "Duquesne DPT": "https://www.duq.edu/academics/schools/health-sciences/academics/departments-and-programs/physical-therapy",
    "Duquesne": "https://www.duq.edu/",
    "Widener University": "https://www.widener.edu/",
    "Widener DPT": "https://www.widener.edu/academics/programs/physical-therapy",
    "Widener": "https://www.widener.edu/",
    "Gonzaga University": "https://www.gonzaga.edu/",
    "Gonzaga DPT": "https://www.gonzaga.edu/school-of-health-sciences/departments/physical-therapy",
    "Gonzaga": "https://www.gonzaga.edu/",
    "University of New Mexico": "https://www.unm.edu/",
    "UNM DPT": "https://hsc.unm.edu/pharmacy/academics/physical-therapy/",
    "UNM": "https://www.unm.edu/",
    "Daemen University": "https://www.daemen.edu/",
    "Daemen DPT": "https://www.daemen.edu/academics/areas-study/physical-therapy",
    "Daemen": "https://www.daemen.edu/",
    "Baylor University": "https://www.baylor.edu/",
    "Baylor DPT": "https://www.baylor.edu/pt/",
    "Baylor": "https://www.baylor.edu/",
    // Transit Agencies & Systems
    "CTA": "https://www.transitchicago.com/",
    "Chicago Transit Authority": "https://www.transitchicago.com/",
    "Metra": "https://metra.com/",
    "MTA": "https://www.mtaflint.org/", // Assuming Flint MTA contextually
    "Mass Transportation Authority": "https://www.mtaflint.org/", // Flint
    "DART": "https://www.dart.org/", // Dallas
    "Dallas Area Rapid Transit": "https://www.dart.org/",
    "TRE": "https://trinityrailwayexpress.org/",
    "TCAT": "https://tcatbus.com/",
    "Tompkins Consolidated Area Transit": "https://tcatbus.com/",
    "CTtransit": "https://www.cttransit.com/",
    "Metro Transit St. Louis": "https://www.metrostlouis.org/",
    "MetroLink": "https://www.metrostlouis.org/metrolink/", // St Louis Light Rail
    "MetroBus": "https://www.metrostlouis.org/metrobus/", // St Louis Bus
    "PRT": "https://www.rideprt.org/", // Pittsburgh
    "Pittsburgh Regional Transit": "https://www.rideprt.org/",
    "SEPTA": "https://www.septa.org/",
    "STA": "https://www.spokanetransit.com/", // Spokane
    "Spokane Transit Authority": "https://www.spokanetransit.com/",
    "ABQ RIDE": "https://www.cabq.gov/transit",
    "NFTA Metro": "https://metro.nfta.com/", // Buffalo/Niagara
    "Waco Transit System": "https://www.waco-texas.com/Departments/Transit-System",
    // Specific Services/Passes
    "U-Pass": "https://www.transitchicago.com/upass/", // Default to CTA, context might refine
    "U-Pass CT": "https://ctrides.com/u-pass-ct/",
    "Ventra card": "https://www.ventrachicago.com/",
    "Divvy": "https://divvybikes.com/",
    "SpotHero": "https://spothero.com/",
    "Campus Connect": "https://campusconnect.depaul.edu/", // DePaul Portal
    "Night Ride": "https://transportation.uic.edu/night-ride/", // UIC
    "Your Ride": "https://www.mtaflint.org/your-ride/", // Flint Paratransit
    "Campus Safe Ride": "https://www.umflint.edu/safety/safe-ride/", // UM-Flint
    "TransLoc": "https://transloc.com/",
    "Comet Cruiser": "https://services.utdallas.edu/transit/cruiser/", // UTD
    "Comet Cab": "https://services.utdallas.edu/transit/cab/", // UTD
    "Zipcar": "https://www.zipcar.com/",
    "Tfare": "https://tcatbus.com/ride/real-time-information-apps/apps/", // Ithaca App
    "ParkMobile": "https://parkmobile.io/",
    "Ithaca Carshare": "https://ithacacarshare.org/",
    "OurBus": "https://www.ourbus.com/",
    "30-Bradley Flyer": "https://www.cttransit.com/services/bradley-flyer",
    "Billiken Shuttle": "https://www.slu.edu/parking/on-campus-transportation/shuttle-services.php", // SLU
    "SLU Ride": "https://www.slu.edu/parking/on-campus-transportation/slu-ride.php", // SLU
    "ConnectCard": "https://www.connectcard.org/", // Pittsburgh
    "POGOH": "https://pogoh.com/", // Pittsburgh Bike Share
    "28X Airport Flyer": "https://www.rideprt.org/all-schedules/28X/", // Pittsburgh
    "SEPTA Key": "https://www.septakey.org/",
    "ZagCard": "https://www.gonzaga.edu/student-life/zagcard-services", // Gonzaga ID/Pass
    "UNM LoboMobile": "https://appstore.unm.edu/app/lobomobile",
    "Enterprise CarShare": "https://www.enterprisecarshare.com/",
    "Collegiate Village": "https://www.collegiatevillagewny.com/", // Daemen Housing Partner
    "Baylor University Shuttle": "https://dps.web.baylor.edu/parking-transportation/alternative-transportation/baylor-university-shuttle-bus-service", // BUS
    "BUS": "https://dps.web.baylor.edu/parking-transportation/alternative-transportation/baylor-university-shuttle-bus-service", // Alias
    "BUS Tracker App": "https://dps.web.baylor.edu/parking-transportation/alternative-transportation/baylor-university-shuttle-service/bus-tracker-app",
    // Airports (Codes & Names)
    "O'Hare (ORD)": "https://www.flychicago.com/ohare/home/pages/default.aspx",
    "ORD": "https://www.flychicago.com/ohare/home/pages/default.aspx",
    "Midway (MDW)": "https://www.flychicago.com/midway/home/pages/default.aspx",
    "MDW": "https://www.flychicago.com/midway/home/pages/default.aspx",
    "Bishop International Airport (FNT)": "https://www.bishopairport.org/",
    "FNT": "https://www.bishopairport.org/",
    "DFW": "https://www.dfwairport.com/",
    "Dallas/Fort Worth": "https://www.dfwairport.com/",
    "DAL": "https://www.dallas-lovefield.com/",
    "Dallas Love Field": "https://www.dallas-lovefield.com/",
    "ITH": "https://flyithaca.com/",
    "Ithaca Tompkins": "https://flyithaca.com/",
    "SYR": "https://syracuseairport.org/",
    "Syracuse Hancock": "https://syracuseairport.org/",
    "BDL": "https://bradleyairport.com/",
    "Bradley International": "https://bradleyairport.com/",
    "STL": "https://www.flystl.com/", // Airport Code & City Alias
    "St. Louis Lambert International": "https://www.flystl.com/",
    "PIT": "https://flypittsburgh.com/",
    "Pittsburgh International": "https://flypittsburgh.com/",
    "PHL": "https://www.phl.org/",
    "Philadelphia International": "https://www.phl.org/",
    "GEG": "https://spokaneairports.net/",
    "Spokane International": "https://spokaneairports.net/",
    "ABQ": "https://abqsunport.com/", // Airport Code & City Alias
    "Albuquerque International Sunport": "https://abqsunport.com/",
    "BUF": "https://www.buffaloairport.com/",
    "Buffalo Niagara International": "https://www.buffaloairport.com/",
    "ACT": "https://www.waco-texas.com/Departments/Aviation",
    "Waco Regional": "https://www.waco-texas.com/Departments/Aviation",
    "AUS": "https://www.austintexas.gov/airport",
    "Austin-Bergstrom": "https://www.austintexas.gov/airport",
    // Concepts / General Terms
    "BS": "https://en.wikipedia.org/wiki/Bachelor_of_Science",
    "RMP": "https://www.ratemyprofessors.com/",
    "Rate My Professors": "https://www.ratemyprofessors.com/",
    "CS": "https://en.wikipedia.org/wiki/Computer_science",
    "STEM": "https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics",
    "commuter school": "https://en.wikipedia.org/wiki/Commuter_campus",
    "college town": "https://en.wikipedia.org/wiki/College_town",
    "Greek life": "https://en.wikipedia.org/wiki/Fraternities_and_sororities",
    "Co-op": "https://en.wikipedia.org/wiki/Cooperative_education",
    // "PA": "https://en.wikipedia.org/wiki/Physician_assistant", // REMOVED - Too ambiguous, conflicts with state abbreviation. Rely on specific city, state keys.
    "Physical Therapy": "https://en.wikipedia.org/wiki/Physical_therapy",
    "Kinesiology": "https://en.wikipedia.org/wiki/Kinesiology",
    "Exercise Science": "https://en.wikipedia.org/wiki/Exercise_physiology",
    "APTA": "https://www.apta.org/",
    "CAPTE": "https://www.capteonline.org/",
    "NPTE": "https://www.fsbpt.org/Secondary-Pages/Exam-Candidates/National-Physical-Therapy-Examination",
    "Clery Act": "https://www2.ed.gov/admins/lead/safety/clery.html",
    "PTCAS": "https://www.ptcas.org/home.aspx",
    "EV Charging": "https://en.wikipedia.org/wiki/Charging_station",
    "Amtrak": "https://www.amtrak.com/",
    "Greyhound": "https://www.greyhound.com/",
    // Add more entities as needed...
};

// Helper to escape regex special characters in entity names
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// --- REVISED addHyperlinks Function ---
// --- REVISED addHyperlinks Function (Markdown Only) ---
function addHyperlinks(text) { // Removed linkedEntities parameter as it's no longer needed
    if (!text || typeof text !== 'string') return text;

    // Convert Markdown links ([text](url) and ([text](url))) to HTML
    // Handle parenthesized Markdown links first: ([Text](URL))
    let processedText = text.replace(/\(\[\s*([^\]\s][^\]]*)\s*\]\(\s*([^\s\)]+)\s*\)\)/g, '<a href="$2" target="_blank">$1</a>');
    // Handle standard Markdown links: [Text](URL)
    processedText = processedText.replace(/\[\s*([^\]\s][^\]]*)\s*\]\(\s*([^\s\)]+)\s*\)/g, '<a href="$2" target="_blank">$1</a>');

    // Return text after only Markdown links are converted
    return processedText;
}


// --- Details Display Function ---


// Removed parseTransportationData as data is now plain text in CSV

// Helper function to render transportation data as HTML (e.g., definition list)
// Updated renderTransportationHTML to handle plain text and apply hyperlinks
function renderTransportationHTML(title, textData, linkedEntities) {
    let icon = getIconForTitle(title);
    let contentHtml = '<p>N/A</p>'; // Default if no data

    if (textData && typeof textData === 'string' && textData.trim() !== '' && textData.trim() !== 'N/A') {
        // Apply hyperlinking to the entire text block
        contentHtml = `<p>${addHyperlinks(textData, linkedEntities)}</p>`;
    } else {
         contentHtml = `<p>N/A</p>`; // Explicitly set N/A if data is missing or just "N/A"
    }


    return `<div class="transport-category"><h3>${icon} ${title}</h3>${contentHtml}</div>`;
}

// Helper function to get icon based on title
function getIconForTitle(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle === 'public transit') return '🚌';
    if (lowerTitle === 'driving & parking') return '🚗';
    if (lowerTitle === 'cycling') return '🚲';
    if (lowerTitle === 'walking') return '🚶';
    if (lowerTitle === 'ride sharing & taxis') return '🚕';
    if (lowerTitle === 'airport access') return '✈️';
    if (lowerTitle === 'campus shuttles') return '🚐';
    return ''; // Default no icon
}

function displayDetails(university) {
    console.log(`[displayDetails] Data for ${university.name}: Positive Reviews:`, university.rmpPositive, 'Negative Reviews:', university.rmpNegative); // DEBUG LOG
    // Keep track of entities linked within this specific details view
    const linkedEntitiesInView = new Set();
    const netCost = calculateNetCost(university);
    const netCostText = formatNetCost(netCost, university.name);
    console.log(`[displayDetails] University: ${university.name}, RMP Score Input: ${university.rmpScore}`);
    console.log(`[displayDetails] University: ${university.name}, Raw Cost Breakdown: ${university.costBreakdown}`);
    console.log(`[displayDetails] University: ${university.name}, Raw Links JSON: ${university.linksJson}`);

    // Use tuitionDisplay if available for the details section as well
    const tuitionValue = parseValue(university.tuition);
    const tuitionDisplayText = university.tuitionDisplay ? university.tuitionDisplay
        : (!isNaN(tuitionValue) ? `$${tuitionValue.toLocaleString()}` : (university.tuition || 'N/A'));

    // Transportation data is now plain text, no parsing needed here

    // Apply hyperlinking to text fields individually
    const linkedLocation = addHyperlinks(university.location || 'N/A', new Set());
    const linkedTransitionInfo = addHyperlinks(university.transitionInfo || 'N/A', new Set());
    // Apply hyperlinking to RMP reviews and other text fields individually
    const linkedRmpSummary = addHyperlinks(university.rmpSummary || 'N/A', new Set());
    const linkedRmpPositive = university.rmpPositive || ''; // Pass raw string to formatReviewBox
    const linkedRmpNegative = university.rmpNegative || ''; // Pass raw string to formatReviewBox
    const formattedProfList = formatProfessorList(university.rmpPtProfs); // Keep as is for now
    const linkedFirstYearRecs = addHyperlinks(university.rmpFirstYearRecs || 'N/A', new Set()); // Use new set


    let detailsHTML = `
        <div class="university-details">
            <h2>${university.name || 'N/A'}</h2>
            <h3>University Info</h3>
            <p><strong>Location:</strong> ${linkedLocation}</p>
            <h3>Program Details</h3>
            <p><strong>Program Length:</strong> ${university.programLength || 'N/A'}</p>
            <!-- Placeholder for specific program link -->
            <p><strong>Scholarship Amount:</strong> ${university.scholarship || 'N/A'}</p>
            <p><strong>Estimated Annual Tuition:</strong> ${!isNaN(parseValue(university.tuition)) ? `$${parseValue(university.tuition).toLocaleString()}` : (university.tuition || 'N/A')}</p>
            <p><strong>Estimated Net Cost:</strong> ${netCostText}</p>
            <h3>Student Body</h3>
            <p><strong>Total Population:</strong> ${university.totalPopulation || 'N/A'}</p>
            <p><strong>Demographics:</strong> ${university.demographics || 'N/A'}</p>
            <p><strong>Avg Class Size/Ratio:</strong> ${university.avgClassSize || 'N/A'}</p>
            <p><strong>PT Class Size:</strong> ${university.ptClassSize || 'N/A'}</p>
            <h3>Rate My Professors Info</h3>
            ${generateRmpScoreHtml(university.rmpScore, university.rmpLink)}
            <p><strong>RMP Summary:</strong> ${addHyperlinks(university.rmpSummary || 'N/A', linkedEntitiesInView)}</p>
            ${formatReviewBox('👍 Positive Feedback', linkedRmpPositive, 'positive')}
            ${formatReviewBox('👎 Negative Feedback', linkedRmpNegative, 'negative')}
            <div class="rmp-prof-list"><strong>PT/Related Professors:</strong> ${formattedProfList}</div>
            <p><strong>First Year Recs:</strong> ${linkedFirstYearRecs}</p>

            <h3>Campus Dining Summary (from RMP Reviews)</h3>
            <p>${addHyperlinks(foodSummaries[university.name] || 'N/A', new Set())}</p>
    `;

    // --- Handle Cost Breakdown (Using JSON.parse) ---
    detailsHTML += `<h3>Cost Breakdown:</h3>`;
    if (university.costBreakdown && university.costBreakdown.trim()) {
        try {
            const costData = JSON.parse(university.costBreakdown);
            if (Object.keys(costData).length === 0) {
                 detailsHTML += `<p>N/A</p>`;
            } else if (costData.Note) {
                 // Handle the specific {"Note": "..."} case
                 detailsHTML += `<p>${addHyperlinks(costData.Note, new Set())}</p>`;
            } else {
                 detailsHTML += `<ul class="details-links-list">`;
                 for (const key in costData) {
                     const value = costData[key];
                     // Format key (add spaces before caps, capitalize first letter)
                     const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                     // Create link or text
                     if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
                         detailsHTML += `<li><a href="${value}" target="_blank">${formattedKey}</a></li>`;
                     } else {
                         detailsHTML += `<li>${formattedKey}: ${addHyperlinks(String(value), new Set())}</li>`; // Ensure value is string for hyperlinking
                     }
                 }
                 detailsHTML += `</ul>`;
            }
        } catch (e) {
            console.error(`Error parsing Cost Breakdown JSON for ${university.name}. String was: "${university.costBreakdown}"`, e);
            // Fallback: Display raw string only if JSON parsing fails
            detailsHTML += `<p>${addHyperlinks(university.costBreakdown, new Set())}</p>`;
        }
    } else {
        detailsHTML += `<p>N/A</p>`;
    }
    // --- End Cost Breakdown ---

    // --- Add Transportation Details ---
    detailsHTML += `<div class="transportation-details"><h2>Transportation Information</h2>`;
    // Pass the raw text data and NEW sets to the updated renderTransportationHTML
    detailsHTML += renderTransportationHTML("Public Transit", university.publicTransitInfo, new Set());
    detailsHTML += renderTransportationHTML("Driving & Parking", university.drivingParkingInfo, new Set());
    detailsHTML += renderTransportationHTML("Cycling", university.cyclingInfo, new Set());
    detailsHTML += renderTransportationHTML("Walking", university.walkingInfo, new Set());
    detailsHTML += renderTransportationHTML("Ride Sharing & Taxis", university.rideShareTaxiInfo, new Set());
    detailsHTML += renderTransportationHTML("Airport Access", university.airportAccessInfo, new Set());
    detailsHTML += renderTransportationHTML("Campus Shuttles", university.campusShuttleInfo, new Set());
    detailsHTML += `</div>`; // Close transportation-details
    // --- End Transportation Details ---

    // --- Handle Links (Revised Parsing & Handling Non-JSON) ---
    let specificProgramLinkHtml = '';
    let helpfulLinksHtml = '<h3>Helpful Links:</h3>'; // Initialize with header
    let linksFound = false; // Flag to track if any links/data were processed

    if (university.linksJson && university.linksJson.trim()) {
        const rawLinksString = university.linksJson.trim();
        console.log(`[displayDetails] University: ${university.name}, Raw Links Data: ${rawLinksString}`);

        try {
            const links = JSON.parse(rawLinksString);
            linksFound = true; // Assume parsing means we found something

            // Check if the parsed object is empty
            if (Object.keys(links).length === 0) {
                 linksFound = false; // Treat empty JSON object as no links found
            } else {
                // Check for specific "DPT Program" link first (case-insensitive key search)
                const dptProgramKey = Object.keys(links).find(k => k.toLowerCase().includes('dpt') && k.toLowerCase().includes('program')); // More flexible search
                if (dptProgramKey && links[dptProgramKey]) {
                    const formattedKey = dptProgramKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    specificProgramLinkHtml = `<p><strong>Program Link:</strong> <a href="${links[dptProgramKey]}" target="_blank">${formattedKey} Page</a></p>`;
                    delete links[dptProgramKey]; // Remove from general list
                }

                // Generate the rest of the list
                if (Object.keys(links).length > 0) {
                    helpfulLinksHtml += `<ul class="details-links-list">`;
                    for (const key in links) {
                        const titleCaseKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        helpfulLinksHtml += `<li><a href="${links[key]}" target="_blank">${titleCaseKey}</a></li>`;
                    }
                    helpfulLinksHtml += `</ul>`;
                } else if (!specificProgramLinkHtml) {
                    // If only DPT link existed and was removed, mark as no *other* links found
                    linksFound = false;
                }
            }

        } catch (e) {
            console.error(`Error parsing links JSON for ${university.name}. String was: "${rawLinksString}"`, e);
            // Fallback: Display raw string only if JSON parsing fails
            helpfulLinksHtml += `<p>${addHyperlinks(rawLinksString, new Set())}</p>`;
            linksFound = true; // We are displaying something, even if it's raw text
        }
    }

    // If after all attempts, no links or relevant text was found
    if (!linksFound && !specificProgramLinkHtml) {
        helpfulLinksHtml += `<p>No specific links available.</p>`;
    } else if (!linksFound && specificProgramLinkHtml) {
         // If only the DPT link was found, clear the "Helpful Links" header/list placeholder
         helpfulLinksHtml = '';
    }
    // --- End Links Processing ---

    // Insert the specific program link at its placeholder
    detailsHTML = detailsHTML.replace('<!-- Placeholder for specific program link -->', specificProgramLinkHtml);

    // Add the "Helpful Links" section (header is now included above)
    detailsHTML += helpfulLinksHtml;

    detailsHTML += `
            <p><strong>FAFSA Code:</strong> ${university.fafsaCode || 'N/A'}</p>
            <p><strong>Transition Info:</strong> ${linkedTransitionInfo}</p>
            ${university.website ? `<p><a href="${university.website}" target="_blank">Visit Main University Website</a></p>` : ''}
        </div>
    `;

    detailsDiv.innerHTML = detailsHTML;
}
// --- Helper function to format review boxes ---
// --- Helper function to format review boxes (Improved Splitting) ---
function formatReviewBox(title, reviewString, type) {
    console.log(`[formatReviewBox] Received title: "${title}", type: "${type}", reviewString:`, reviewString); // DEBUG LOG
    if (!reviewString || reviewString.trim() === '' || reviewString.trim().toLowerCase() === 'n/a') {
        return ''; // Don't display box if no reviews or just N/A
    }

    // Split by newline followed by optional whitespace and '*'
    // This handles cases where '*' might not be the very first char on a line
    let items = reviewString.split(/\n\s*\*\s*/).filter(item => item.trim() !== ''); // Changed const to let

    // If splitting by newline didn't work (e.g., single line with multiple '*'), try splitting by '* '
    if (items.length <= 1 && reviewString.includes('* ')) {
         const potentialItems = reviewString.split('* ').filter(item => item.trim() !== '');
         // Only use this split if it results in more than one item
         if (potentialItems.length > 1) {
             items = potentialItems;
         } else if (potentialItems.length === 1 && !potentialItems[0].startsWith('*')) {
             // If only one item resulted and it doesn't start with '*', use it
             items = potentialItems;
         } else {
              // Otherwise, treat the whole string as one item if it doesn't start with '*'
              items = [reviewString.trim().replace(/^\*\s*/, '')].filter(item => item); // Remove leading '*' if present
         }
    } else if (items.length === 1 && !items[0].startsWith('*')) {
         // If split by newline resulted in one item not starting with '*', use it
         items = [items[0].trim()];
    } else {
         // Clean up items from newline split (remove leading '*' if present)
         items = items.map(item => item.trim().replace(/^\*\s*/, '')).filter(item => item);
    }


    if (items.length === 0) {
        return ''; // Don't display if no valid items found after splitting
    }

    let listHtml = '<ul>';
    items.forEach(item => {
        let cleanedItem = item.trim();
        // Handle potential quote formatting like ""Quote:""
        cleanedItem = cleanedItem.replace(/""Quote:""\s*/gi, '<em>Quote:</em> ');
        // Handle simpler quotes like "Quote: ..."
        cleanedItem = cleanedItem.replace(/Quote:\s*""([^"]+)""/g, '<em>"$1"</em>');
        // Apply hyperlinking
        let formattedItem = addHyperlinks(cleanedItem, new Set());
        listHtml += `<li>${formattedItem}</li>`;
    });
    listHtml += '</ul>';

    const glyph = type === 'positive' ? '👍' : '👎';

    return `
        <div class="rmp-reviews-box rmp-reviews-${type}">
            <h4>${glyph} ${title}</h4>
            ${listHtml}
        </div>
    `;
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
            let linkHtml = '';
            // console.log(`formatProfessorList: Extracted link: "${link}" for prof string: "${prof}"`); // Debug log
            if (link) {
                 // console.log(`formatProfessorList: Creating link with href: "${link}"`); // Debug log
                 linkHtml = ` (<a href="${link}" target="_blank">RMP</a>)`;
            }
            let ratingHtml = ratingInfo ? ` (${ratingInfo})` : '';

            // Ensure we don't render the raw URL if parsing failed badly
            if (name.includes('http')) {
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

    // Repopulate the table with the sorted data using global min/max cost
    populateTable(universities, globalMinCost, globalCostRange); // Pass global values

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