import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

# Locate start
for i, line in enumerate(lines):
    if 'function calculate() {' in line:
        start_idx = i
        break

# Locate end
# We look for the end of the function. 
# Based on file view, it ends around line 1450 with '}'
# The line before it is: document.getElementById('logic-note').style.display = 'block';
# Let's search for that specific line to be safe, then find the next '}'
if start_idx != -1:
    for i in range(start_idx, len(lines)):
        if "document.getElementById('logic-note').style.display = 'block';" in line:
             # Check next few lines for closing brace
             # Actually, let's just look for the first '}' after this line? 
             # No, this line is inside the function.
             pass
        if "document.getElementById('logic-note').style.display = 'block';" in lines[i]:
            # The closing brace should be shortly after
            # Let's assume it's the next line with just indentation and '}'
            # verification:
            # 1449: document...
            # 1450: }
            if i + 1 < len(lines) and '}' in lines[i+1]:
                end_idx = i + 1
                break

if start_idx == -1 or end_idx == -1:
    print(f"Could not find function bounds. Start: {start_idx}, End: {end_idx}")
    exit(1)

# New Content
new_calculate_code = r"""        // --- MAIN CALCULATION (PMK 96/2023) ---
        function calculate() {
            // 1. Get Settings & Rates
            let insuranceInput = parseLocaleNumber(document.getElementById('val-insurance').value);
            let freightInput = parseLocaleNumber(document.getElementById('val-freight').value);
            let currency = document.getElementById('currency-select').value;
            let kurs = parseLocaleNumber(document.getElementById('kurs').value) || 16500; // Prevent div by zero

            // 2. Parse Items & Normalize to USD
            let totalFobUsd = 0;
            let items = [];
            
            for (let i = 1; i <= 5; i++) {
                let valStr = document.getElementById(`val-${i}`).value;
                let bmStr = document.getElementById(`bm-${i}`).value;
                let hsStr = document.getElementById(`hs-${i}`).value;

                let val = parseLocaleNumber(valStr);
                let bmRate = parseFloat(bmStr) || 0; 

                if (val > 0 || hsStr.trim() !== '') {
                    if (val > 0) { 
                        let hsClean = (hsStr) ? hsStr.trim() : "";
                        
                        // CONVERSION LOGIC
                        let itemFobUsd = 0;
                        if (currency === 'IDR') {
                            itemFobUsd = val / kurs;
                        } else {
                            itemFobUsd = val;
                        }

                        items.push({
                            id: i,
                            fobUsd: itemFobUsd, // Normalized Value
                            bmRate: bmRate,
                            hs: hsClean
                        });
                        totalFobUsd += itemFobUsd;
                    }
                }
            }

            if (totalFobUsd === 0) {
                alert("Mohon masukkan data barang (Nilai $) minimal satu baris.");
                return;
            }

            // Normalize Freight & Insurance to USD
            let insuranceUsd = (currency === 'IDR') ? (insuranceInput / kurs) : insuranceInput;
            let freightUsd = (currency === 'IDR') ? (freightInput / kurs) : freightInput;

            // 3. Determine Thresholds (Based on USD)
            // PMK 96 Limits are in USD (FOB $3, CIF $1500)
            let totalCifUsd = totalFobUsd + insuranceUsd + freightUsd;
            
            let isDeMinimis = (totalFobUsd <= 3); 
            let isFlatRateRange = (!isDeMinimis && totalCifUsd <= 1500);

            // PPh Rate Setup
            let pphRateNormal = 0;
            let importerType = document.getElementById('importer-type').value;
            
            if (importerType === 'company') {
                let apiStatus = document.getElementById('has-api').value;
                pphRateNormal = (apiStatus === 'yes') ? 0.025 : 0.075; 
            } else {
                let npwpStatus = document.getElementById('has-npwp-personal').value;
                pphRateNormal = (npwpStatus === 'yes') ? 0.075 : 0.150; 
            }

            // 4. Calculate Duties Per Item (Prorated)
            let totalBmRaw = 0;
            let totalPphRaw = 0;
            let totalDppRaw = 0; // Total Nilai Impor

            // Logic Note Builder
            let logicHtml = `<strong>Logika Perhitungan (PMK 96/2023):</strong><br>`;
            logicHtml += `<div style="margin-bottom:5px; font-size:0.85em; color:#555;">
                Total FOB: $${totalFobUsd.toLocaleString('en-US', {maximumFractionDigits:2})} | 
                CIF: $${totalCifUsd.toLocaleString('en-US', {maximumFractionDigits:2})}
            </div>`;

            items.forEach(item => {
                // A. Proration (by Value/FOB)
                let weightProportion = item.fobUsd / totalFobUsd;
                
                let itemFreightUsd = freightUsd * weightProportion;
                let itemInsUsd = insuranceUsd * weightProportion;
                let itemCifUsd = item.fobUsd + itemFreightUsd + itemInsUsd;
                
                // Base for Duty is CIF in IDR
                let itemCifIdr = itemCifUsd * kurs;

                // B. Determine Rates
                let appliedBmRate = 0;
                let appliedPphRate = 0;
                let logicNote = "";
                let itemColor = "";

                if (isDeMinimis) {
                    appliedBmRate = 0;
                    appliedPphRate = 0;
                    logicNote = "De Minimis";
                    itemColor = "#27ae60"; 
                } 
                else if (isFlatRateRange) {
                    if (isMfnException(item.hs)) {
                        appliedBmRate = item.bmRate; 
                        appliedPphRate = pphRateNormal; 
                        logicNote = "Pengecualian (MFN Rate)";
                        itemColor = "#c0392b"; 
                    } else {
                        appliedBmRate = 7.5;
                        appliedPphRate = 0;
                        logicNote = "Flat Rate 7.5%";
                        itemColor = "#f39c12"; 
                    }
                } 
                else {
                    // Normal (>1500)
                    appliedBmRate = item.bmRate;
                    appliedPphRate = pphRateNormal;
                    logicNote = "Normal (CIF > 1500)";
                    itemColor = "#2980b9"; 
                }

                // C. Calculate Item Duties
                let itemBm = Math.ceil(itemCifIdr * (appliedBmRate / 100));
                let itemDpp = itemCifIdr + itemBm;
                let itemPph = Math.ceil(itemDpp * appliedPphRate);

                // Accumulate
                totalBmRaw += itemBm;
                totalPphRaw += itemPph;
                totalDppRaw += itemDpp;

                // Add to Logic Log
                logicHtml += `<div style="font-size:0.85em; border-bottom:1px dashed #eee; padding:4px 0;">
                    <span style="font-weight:bold; color:${itemColor};">Item #${item.id}</span> [${item.hs || '?'}] 
                    (FOB $${item.fobUsd.toFixed(2)}) &rarr; <span style="font-style:italic;">${logicNote}</span><br>
                    CIF: Rp ${itemCifIdr.toLocaleString('id-ID')} | BM: ${Math.round(appliedBmRate)}% | PPh: ${(appliedPphRate*100).toFixed(1)}%
                </div>`;
            });

            // 5. PPN Calculation (11% of Total DPP)
            let ppn = Math.ceil(totalDppRaw * 0.11);

            // 6. Update UI Results
            document.getElementById('result').style.display = 'block';

            const fmt = (n) => "Rp " + n.toLocaleString('id-ID', { maximumFractionDigits: 0 });
            const fmtUsd = (n) => "$ " + n.toLocaleString('en-US', { maximumFractionDigits: 2 });

            document.getElementById('res-cif-usd').innerText = fmtUsd(totalCifUsd);
            document.getElementById('res-cif').innerText = fmt(totalCifUsd * kurs); 
            document.getElementById('res-bm').innerText = fmt(totalBmRaw);
            document.getElementById('res-dpp').innerText = fmt(totalDppRaw);
            document.getElementById('res-ppn').innerText = fmt(ppn);
            document.getElementById('res-pph').innerText = fmt(totalPphRaw);

            // Courier Handling Fees
            let courierTotal = 0;
            if (document.getElementById('courier-section-container').style.display !== 'none') {
                let taxes = totalBmRaw + ppn + totalPphRaw;
                let handling = Math.max(200000, Math.ceil(taxes * 0.025));
                document.getElementById('res-h-handling').innerText = fmt(handling);

                let disbursement = Math.max(94159, Math.ceil(taxes * 0.059));
                document.getElementById('res-h-disb').innerText = fmt(disbursement);

                let adminDoc = 50000;
                document.getElementById('res-h-doc').innerText = fmt(adminDoc);

                let warehouse = 0;
                let weight = parseFloat(document.getElementById('val-weight').value) || 1;
                let days = parseFloat(document.getElementById('val-days').value) || 0;
                if (days >= 3) {
                    warehouse = Math.ceil(3016 * weight * days);
                }
                document.getElementById('res-h-warehouse').innerText = fmt(warehouse);

                let nonRoutine = 0;
                document.getElementById('res-h-nonroutine').innerText = fmt(nonRoutine);

                courierTotal = handling + disbursement + adminDoc + warehouse + nonRoutine;
                document.getElementById('surcharge-section').style.display = 'block';
            } else {
                document.getElementById('surcharge-section').style.display = 'none';
            }

            document.getElementById('res-total').innerText = fmt(totalBmRaw + ppn + totalPphRaw + courierTotal);

            // Logic Note Footer
            logicHtml += `<div style="margin-top:10px; padding:5px; background:#f0f7fa; font-size:0.8em; color:#666;">
                <em>*Kurs: Rp ${kurs.toLocaleString()}/USD. <br>
                ${(currency==='IDR') ? '*Input dalam IDR dikonversi ke USD untuk pengecekan batas (Threshold).' : '*Input dalam USD.'}
                </em>
            </div>`;

            document.getElementById('logic-note').innerHTML = logicHtml;
            document.getElementById('logic-note').style.display = 'block';
        }
"""

# Replace
# We start from start_idx.
# BUT we need to check if the old function had the comment line " // --- MAIN CALCULATION (PMK 96/2023) ---"
# If we keep it in new code, we should replace from start_idx.
# The new code starts with that comment indentation.
# If the file has that comment at start_idx-1, we should probably start replacing from start_idx-1 if we want to be clean, Or just replace the function itself.
# My new code HAS the comment.
# So I will check if lines[start_idx-1] contains the comment.
if "MAIN CALCULATION" in lines[start_idx-1]:
    start_idx = start_idx - 1

new_lines = lines[:start_idx] + [new_calculate_code + "\n"] + lines[end_idx+1:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Successfully replaced calculate() function. Lines {start_idx} to {end_idx} replaced.")
