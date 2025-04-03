const universities = [
    {
        name: "DePaul University",
        scholarship: "31k + DePaul grant 4,800",
        tuition: 46776,
        website: "https://www.depaul.edu/Pages/default.aspx",
        programLength: "N/A", // No DPT program
        location: "Chicago, IL",
        transitionInfo: "DePaul does not offer a DPT program. However, they offer resources for undergraduate students, including academic advising, technology support, and career services.",
        costBreakdown: `
            <div class="cost-breakdown">
                <div class="cost-item"><span>TUITION</span><span>$46,776</span></div>
                <div class="cost-item"><span>STUDENT FEES</span><span>$480</span></div>
                <div class="cost-item"><span>ORIENTATION FEES</span><span>$250</span></div>
                <div class="cost-item"><span>ON-CAMPUS HOUSING & FOOD</span><span>$19,896</span></div>
                <div class="cost-item"><span>HEALTH INSURANCE **</span><span>$2,400</span></div>
                <div class="total-cost"><span>TOTAL BILLABLE COSTS</span><span>$69,802</span></div>
            </div>
        `,
        totalPopulation: "20,917 (Fall 2022)",
        demographics: "White: 41-55%; Hispanic: 20-25%; Asian: 11-13%; Black/AA: 7-9%; Multi: 4-5%; Other/Unk: ~5-13%",
        avgClassSize: "Majority < 40 students",
        ptClassSize: "N/A"
    },
    {
        name: "University of Illinois Chicago (UIC)",
        scholarship: "8k",
        tuition: 49170,
        website: "https://www.uic.edu/",
        programLength: "33 months",
        location: "Chicago, IL",
        transitionInfo: "Check class registration dates, familiarize yourself with major requirements, and explore campus life.",
        totalPopulation: "33,906 (Fall 2024)",
        demographics: "Hispanic: 28-36%; White: 23-28%; Asian: 18-21%; Black/AA: ~8%; Intl: ~8%; Multi: ~3%; Other/Unk: ~2-14%",
        avgClassSize: "S/F Ratio 17:1; 34% classes < 20",
        ptClassSize: "60"
    },
    {
        name: "University of Michigan-Flint",
        scholarship: "3k",
        tuition: 40679,
        website: "https://www.umflint.edu/",
        programLength: "3 years",
        location: "Flint, MI",
        transitionInfo: "Plan your schedule, track tuition deadlines, and get involved in campus activities.",
        totalPopulation: "6,130",
        demographics: "White: 67-69%; Black/AA: ~13%; Hispanic: ~5%; Asian: ~3%; Multi: ~3%; Other/Unk: ~7-8%",
        avgClassSize: "Most frequent 10-19",
        ptClassSize: "60"
    },
    {
        name: "University of Texas at Dallas",
        scholarship: "6k",
        tuition: 38000, // Estimated graduate tuition for UTD
        website: "https://www.utdallas.edu/",
        programLength: "N/A", // No DPT program
        location: "Dallas, TX",
        transitionInfo: "Check the university website for exact tuition rates and program details.",
        totalPopulation: "29,886 (Fall 2024)",
        demographics: "Asian: 29-35%; White: 20-37%; Hispanic: 13-18%; Intl: 4-19%; Black/AA: 5-6%; Multi: 3-4%; Other/Unk: ~3-10%",
        avgClassSize: "S/F Ratio 25:1; 26% classes < 20",
        ptClassSize: "N/A" // No DPT program
    },
    {
        name: "Ithaca College",
        scholarship: "30k + 2k residential experience scholarship",
        tuition: 51630,
        website: "https://www.ithaca.edu/",
        programLength: "6 years (BS/DPT) or 3 years (Grad Entry)",
        location: "Ithaca, NY",
        transitionInfo: "Prioritize time management, explore health resources, and utilize the career center.",
        totalPopulation: "~5,000",
        demographics: "White: 71-72%; Hispanic: ~10%; Black/AA: ~5%; Asian: ~4%; Multi: ~4%; Other/Unk: ~5-6%",
        avgClassSize: "S/F Ratio 11:1; 63.8% classes < 20",
        ptClassSize: "80"
    },
    {
        name: "University of Hartford",
        scholarship: "37000", // From PDF (35k Regents + 2k FAFSA Incentive)
        tuition: 41291, // Note: CSV had 47052, JS had 41291. Keeping JS value for now.
        website: "https://www.hartford.edu/about/offices-divisions/finance-administration/financial-affairs/bursar-office/tuition-fees/graduate-tuition.aspx",
        programLength: "3 years",
        location: "West Hartford, CT",
        transitionInfo: "Familiarize yourself with campus resources, develop life skills, and maintain well-being.",
        totalPopulation: "6,022 (Fall 2024)",
        demographics: "White: 50-53%; Black/AA: 14-17%; Hispanic: 11-19%; Asian: 3-5%; Multi: ~2%; Other/Unk: ~7-15%",
        avgClassSize: "S/F Ratio 11:1; 69% classes < 20",
        ptClassSize: "50-70" // Based on DPT 510 course size
    },
    {
        name: "Saint Louis University",
        scholarship: "39k",
        tuition: 55000,
        website: "https://www.slu.edu/financial-aid/tuition-and-costs/index.php",
        programLength: "6 years (BS/DPT)",
        location: "Saint Louis, MO",
        transitionInfo: "Plan your finances, get involved in campus life, and prioritize your health.",
        totalPopulation: "~15,200+ (2023)",
        demographics: "White: 51-68%; Asian: 9-11%; Black/AA: 6-7%; Hispanic: 5-6%; Multi: ~4%; Other/Unk: ~10-25%",
        avgClassSize: "Avg 26; S/F Ratio: 9:1",
        ptClassSize: "95"
    },
    {
        name: "Duquesne University",
        scholarship: "56k", // Note: CSV had 27k, JS had 56k. Keeping JS value for now.
        tuition: 56266,
        website: "https://www.duq.edu/admission-and-aid/tuition-and-fees/graduate-tuition/healthsciences-grad-tuition.php",
        programLength: "6 years (BS/DPT) or 3 years (Grad Entry)",
        location: "Pittsburgh, PA",
        transitionInfo: "Check class registration, explore career services, and focus on your well-being.",
        totalPopulation: "8,179 (Fall 2023)",
        demographics: "White: 77-81%; Black/AA: ~5%; Hispanic: 3-5%; Asian: 2-4%; Multi: 3-4%; Other/Unk: ~5-10%",
        avgClassSize: "Most frequent 20-29; S/F Ratio: 13:1",
        ptClassSize: "~43-54"
    },
    {
        name: "Widener University",
        scholarship: "44000", // From PDF (38k Presidential + 4k Alumni + 2k Honors)
        tuition: 47560, // Original: "Year 1: 47560, Year 2: 44080, Year 3: 41760"
        tuitionDisplay: "Year 1: $47,560, Year 2: $44,080, Year 3: $41,760", // Optional: for detailed display
        website: "https://www.widener.edu/admissions-aid/graduate-admissions/tuition-financial-aid",
        programLength: "3 years", // Assumed typical length
        location: "Chester, PA",
        transitionInfo: "Manage your time effectively, learn basic life skills, and connect with campus resources.",
        totalPopulation: "5,610",
        demographics: "White: 61-62%; Black/AA: 13-27%; Hispanic: 7-9%; Asian: 3-4%; Multi: 1-2%; Other/Unk: ~1-15%",
        avgClassSize: "Avg 25; S/F Ratio: 12:1",
        ptClassSize: "48"
    },
    {
        name: "Gonzaga University",
        scholarship: "28k",
        tuition: 56140,
        website: "https://www.gonzaga.edu/admission/tuition-scholarships-aid/student-accounts/tuition-fees",
        programLength: "N/A", // Likely no direct DPT program
        location: "Spokane, WA",
        transitionInfo: "Prepare for the transition by checking class registration, exploring financial aid, and getting involved in campus life.",
        totalPopulation: "7,306 (Fall 2023)",
        demographics: "White: 63-72%; Hispanic: 10-12%; Asian: 5-7%; Multi: ~6%; Black/AA: 1-2%; Other/Unk: ~5-13%",
        avgClassSize: "Avg 18; S/F Ratio: 12:1",
        ptClassSize: "N/A" // Specific cohort size not found
    },
    // Adding UNM, Daemen, Baylor from CSV as they were missing in the original JS array
     {
        name: "University of New Mexico",
        scholarship: "22900",
        tuition: 34129,
        website: "https://www.unm.edu/",
        programLength: "3 years",
        location: "Albuquerque, NM",
        transitionInfo: "UNM offers a 3-year full-time Doctor of Physical Therapy (DPT) program (post-baccalaureate). Check admissions requirements and financial aid options via provided links. No specific 3+3/4+3 pathway found.",
        costBreakdown: "Tuition: $34,129; Scholarship: $22,900; Net Cost: $11,210", // From CSV
        totalPopulation: "23,228 (Fall 2024)",
        demographics: "Hispanic: 45-47%; White: 31-35%; AmInd/AK: 5-6%; Asian: 3-4%; Multi: ~4%; Black/AA: 2-3%; Intl: ~3%; Other/Unk: ~1-6%",
        avgClassSize: "S/F Ratio 21:1; 49% classes < 20",
        ptClassSize: "Small (Qualitative); 1:6 S/F Ratio" // Specific cohort size not found, keeping original description
    },
    {
        name: "Daemen University",
        scholarship: "Scholarships Available (Amount Varies)", // Specific amount not found
        tuition: 33724, // Approx from CSV
        website: "https://www.daemen.edu/",
        programLength: "3+3 years",
        location: "Amherst, NY",
        transitionInfo: "Daemen offers a 3+3 BS/DPT program. Application reference number: 880077867. Apply via PTCAS. Check website for specific program details and costs.",
        costBreakdown: "Undergraduate Tuition (2023-24): ~$33,724/year. DPT phase costs may differ. Check official sources.", // From CSV
        totalPopulation: "2,540 (Fall 2024)",
        demographics: "White: 74-75%; Black/AA: ~9%; Hispanic: ~5%; Asian: ~4%; Multi: ~2%; Other/Unk: ~5-6%",
        avgClassSize: "Undergrad: 14; Grad: 25",
        ptClassSize: "Not Found" // Specific cohort size not found
    },
    {
        name: "Baylor University",
        scholarship: "25k/year",
        tuition: 57000, // Approx from CSV
        website: "https://physicaltherapy.robbins.baylor.edu/",
        programLength: "24-26 months (Hybrid)",
        location: "Waco, TX (Hybrid Program)",
        transitionInfo: "Baylor offers a 24-26 month hybrid DPT program. Apply via PTCAS (Code 2219). User-provided scholarship ($25k/year for 4 years) duration may differ from 2-year program length; verify details.",
        costBreakdown: "Estimated total tuition ~$114,000 ($19k/trimester for 6 trimesters). Check official sources.", // From CSV
        totalPopulation: "20,626 (Fall 2024)",
        demographics: "White: 60-64%; Hispanic: 14-16%; Asian: 6-9%; Black/AA: 5-7%; Multi: 4-5%; Other/Unk: ~5-11%",
        avgClassSize: "Avg 27; S/F Ratio: 15:1",
        ptClassSize: "100"
    }
];

const tableBody = document.querySelector("#universityTable tbody");
const tableHead = document.querySelector("#universityTable thead");
const detailsDiv = document.getElementById("universityDetails");
let currentSortColumn = null;
let currentSortDirection = 'asc'; // 'asc' or 'desc'
let currentlySelectedRow = null;

// Helper function to parse monetary values (handles 'k', additions, and extracts numbers from text)
function parseValue(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value !== 'string') {
        return NaN;
    }

    let total = 0;
    let foundNumber = false; // Flag to track if any number was found

    // Split by '+' to handle additive parts like "31k + grant 4,800"
    const parts = value.split('+');

    for (const part of parts) {
        // Remove currency symbols and commas from the part
        const cleanedPart = part.replace(/[$,]/g, '');

        // Find all number-like sequences, potentially followed by 'k'
        const numberMatches = cleanedPart.match(/(\d+(\.\d+)?)\s*k?/gi);

        if (numberMatches) {
            for (const match of numberMatches) {
                foundNumber = true; // Mark that we found at least one number
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
        // Note: This approach sums up ALL numbers found within a part.
        // E.g., "grant 4,800 and fee 200" would result in 5000 for that part.
    }

    // If no numbers were found in the entire string, return NaN
    if (!foundNumber) {
        return NaN;
    }

    return total;
}

// Calculate net cost for a university object
function calculateNetCost(university) {
    let tuitionNum;
    const scholarshipNum = parseValue(university.scholarship);
    let netCost = NaN;

    if (university.name === "Widener University") {
        // Specific calculation for Widener using average tuition
        const widenerAvgTuition = (47560 + 44080 + 41760) / 3;
        tuitionNum = widenerAvgTuition;
        if (!isNaN(scholarshipNum)) {
            netCost = tuitionNum - scholarshipNum;
        }
    } else {
        // Standard calculation for other universities
        tuitionNum = parseValue(university.tuition);
        if (!isNaN(tuitionNum) && !isNaN(scholarshipNum)) {
            netCost = tuitionNum - scholarshipNum;
        }
    }
    return netCost; // Return the number or NaN
}

// Format net cost for display
function formatNetCost(netCost, universityName) {
     if (isNaN(netCost)) {
         return "N/A";
     }
     const formatOptions = (universityName === "Widener University")
         ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
         : { minimumFractionDigits: 0, maximumFractionDigits: 0 };
     let formatted = `$${netCost.toLocaleString('en-US', formatOptions)}`;
     if (universityName === "Widener University") {
         formatted += " (Avg)";
     }
     return formatted;
}


// Function to populate the table
function populateTable(data) {
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((university, index) => {
        const row = tableBody.insertRow();
        row.dataset.universityIndex = index; // Store original index if needed

        const nameCell = row.insertCell();
        const scholarshipCell = row.insertCell();
        const tuitionCell = row.insertCell();
        const netCostCell = row.insertCell();
        // Add new cells
        const populationCell = row.insertCell();
        const demographicsCell = row.insertCell();
        const avgClassSizeCell = row.insertCell();
        const ptClassSizeCell = row.insertCell();


        nameCell.textContent = university.name;
        scholarshipCell.textContent = university.scholarship;

        // Use tuitionDisplay if available, otherwise format tuition
        tuitionCell.textContent = university.tuitionDisplay ? university.tuitionDisplay
            : (typeof university.tuition === 'number' ? `$${university.tuition.toLocaleString()}` : university.tuition);

        // Calculate and display Net Cost
        const netCost = calculateNetCost(university);
        netCostCell.textContent = formatNetCost(netCost, university.name);
        // Store the raw numeric net cost for sorting
        netCostCell.dataset.value = isNaN(netCost) ? -Infinity : netCost; // Use -Infinity for N/A to sort them last/first depending on direction

        // Populate new cells
        populationCell.textContent = university.totalPopulation || 'N/A';
        demographicsCell.textContent = university.demographics || 'N/A';
        avgClassSizeCell.textContent = university.avgClassSize || 'N/A';
        ptClassSizeCell.textContent = university.ptClassSize || 'N/A';


        row.addEventListener("click", () => {
            displayDetails(university);
            // Highlight selected row
            if (currentlySelectedRow) {
                currentlySelectedRow.classList.remove('selected-row');
            }
            row.classList.add('selected-row');
            currentlySelectedRow = row;
        });
    });
}

// Function to display university details
function displayDetails(university) {
    const netCost = calculateNetCost(university);
    const netCostText = formatNetCost(netCost, university.name);

    // Use tuitionDisplay if available for the details section as well
    const tuitionDisplayText = university.tuitionDisplay ? university.tuitionDisplay
        : (typeof university.tuition === 'number' ? `$${university.tuition.toLocaleString()}` : university.tuition);


    let detailsHTML = `
        <div class="university-details">
            <h2>${university.name}</h2>
            <p><strong>Location:</strong> ${university.location}</p>
            <p><strong>Program Length:</strong> ${university.programLength}</p>
            <p><strong>Scholarship Amount:</strong> ${university.scholarship}</p>
            <p><strong>Estimated Annual Tuition:</strong> ${tuitionDisplayText}</p>
            <p><strong>Estimated Net Cost:</strong> ${netCostText}</p>
            <p><strong>Total Population:</strong> ${university.totalPopulation || 'N/A'}</p>
            <p><strong>Demographics:</strong> ${university.demographics || 'N/A'}</p>
            <p><strong>Avg Class Size/Ratio:</strong> ${university.avgClassSize || 'N/A'}</p>
            <p><strong>PT Class Size:</strong> ${university.ptClassSize || 'N/A'}</p>
    `;

    if (university.costBreakdown) {
        // Check if costBreakdown is already HTML or needs formatting
        if (university.costBreakdown.trim().startsWith('<')) {
             detailsHTML += `<h3>Cost Breakdown:</h3>${university.costBreakdown}`;
        } else {
             // Simple text formatting if not HTML
             detailsHTML += `<h3>Cost Breakdown:</h3><p>${university.costBreakdown.replace(/;/g, '<br>')}</p>`;
        }
    }

    detailsHTML += `
            <p><strong>Transition Info:</strong> ${university.transitionInfo}</p>
            ${university.website ? `<p><a href="${university.website}" target="_blank">Visit University Website</a></p>` : ''}
        </div>
    `;

    detailsDiv.innerHTML = detailsHTML;
}

// Function to sort the table
function sortTable(columnIndex) {
    // Check if the column index is valid (within the original 4 columns)
    if (columnIndex < 0 || columnIndex > 3) {
        console.log("Sorting not implemented for this column index:", columnIndex);
        return; // Exit if trying to sort new columns
    }

    const isNumeric = [2, 3].includes(columnIndex); // Tuition (index 2) and Net Cost (index 3) are numeric
    const isScholarship = columnIndex === 1; // Scholarship needs special parsing

    // Determine sort direction
    if (currentSortColumn === columnIndex) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortDirection = 'asc';
        currentSortColumn = columnIndex;
    }

    // Update header styles
    updateHeaderSortIndicators();

    // Sort the data array
    const sortedUniversities = [...universities].sort((a, b) => {
        let valA, valB;

        if (columnIndex === 0) { // University Name
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
        } else if (isScholarship) { // Scholarship
            valA = parseValue(a.scholarship);
            valB = parseValue(b.scholarship);
            valA = isNaN(valA) ? -Infinity : valA;
            valB = isNaN(valB) ? -Infinity : valB;
        } else if (columnIndex === 2) { // Tuition
             valA = parseValue(a.tuition);
             valB = parseValue(b.tuition);
             valA = isNaN(valA) ? -Infinity : valA;
             valB = isNaN(valB) ? -Infinity : valB;
        } else if (columnIndex === 3) { // Net Cost
            valA = calculateNetCost(a);
            valB = calculateNetCost(b);
            valA = isNaN(valA) ? -Infinity : valA;
            valB = isNaN(valB) ? -Infinity : valB;
        }

        if (valA < valB) {
            return currentSortDirection === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return currentSortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Repopulate the table with sorted data
    populateTable(sortedUniversities);

    // Clear details and selection after sorting
    detailsDiv.innerHTML = '';
    if (currentlySelectedRow) {
        currentlySelectedRow.classList.remove('selected-row');
        currentlySelectedRow = null;
    }
}

// Function to update sort indicators on headers
function updateHeaderSortIndicators() {
    const headers = tableHead.querySelectorAll('th');
    headers.forEach((th, index) => {
        th.classList.remove('sort-asc', 'sort-desc');
        // Only make original columns sortable visually for now
        if (index <= 3) {
             th.classList.add('sortable');
             if (index === currentSortColumn) {
                 th.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
             }
        } else {
             th.classList.remove('sortable'); // Remove sortable class from new headers
        }
    });
}


// Add event listeners to table headers for sorting (only for original columns)
tableHead.querySelectorAll('th').forEach((th, index) => {
    if (index <= 3) { // Only add listener to original sortable columns
        th.addEventListener('click', () => sortTable(index));
    }
});

// Initial population of the table
populateTable(universities);
updateHeaderSortIndicators(); // Set initial sortable look