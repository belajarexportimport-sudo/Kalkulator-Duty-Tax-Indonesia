
// UPS Constants
// UPS Constants (Exact match to ups-calculator/script.js COSTS_DEFAULT)
const UPS_COSTS = {
    FUEL_SURCHARGE: 0.30, 
    VAT_RATE: 0.011,
    AHS: 243460, // Default Value
    LPS: 1058200,
    OMX: 4121800,
    PEAK_SURCHARGE: 56640,
    BROKERAGE_IMPORT: 118647, // Fixed Brokerage
    SURGE: {
        TO_EUR: 16280,
        FROM_EUR: 7252,
        FROM_AMERICAS: 6512,
        TO_AMERICAS_ISMEA: 16280,
        ASIA: 1480,
        ISRAEL: 9620
    }
};

// Country Region Mapping (for Surge Logic)
const COUNTRY_REGION_ZONES = {
    "anguilla": "americas", "antigua and barbuda": "americas", "argentina": "americas", "aruba": "americas",
    "bahamas": "americas", "barbados": "americas", "belize": "americas", "bermuda": "americas", "bolivia": "americas",
    "bonaire": "americas", "st. eustatius": "americas", "saba": "americas", "brazil": "americas",
    "british virgin islands": "americas", "canada": "americas", "cayman islands": "americas", "chile": "americas",
    "colombia": "americas", "costa rica": "americas", "curacao": "americas", "dominica": "americas",
    "dominican republic": "americas", "ecuador": "americas", "el salvador": "americas", "french guiana": "americas",
    "grenada": "americas", "guadeloupe": "americas", "guatemala": "americas", "guyana": "americas", "haiti": "americas",
    "honduras": "americas", "jamaica": "americas", "martinique": "americas", "mexico": "americas",
    "montserrat": "americas", "nicaragua": "americas", "panama": "americas", "paraguay": "americas", "peru": "americas",
    "puerto rico": "americas", "st. barthelemy": "americas", "st. christopher": "americas", "st. kitts": "americas",
    "st. lucia": "americas", "st. martin": "americas", "st. maarten": "americas",
    "st. vincent and the grenadines": "americas", "suriname": "americas", "trinidad and tobago": "americas",
    "turks and caicos islands": "americas", "u.s. virgin islands": "americas", "united states": "americas", "usa": "americas",
    "us": "americas",
    "andorra": "eur", "albania": "eur", "armenia": "eur", "austria": "eur", "belarus": "eur", "belgium": "eur",
    "bosnia and herzegovina": "eur", "bulgaria": "eur", "croatia": "eur", "cyprus": "eur", "czech republic": "eur",
    "denmark": "eur", "estonia": "eur", "finland": "eur", "france": "eur", "georgia": "eur", "germany": "eur",
    "gibraltar": "eur", "greece": "eur", "guernsey": "eur", "hungary": "eur", "iceland": "eur", "ireland": "eur",
    "italy": "eur", "jersey": "eur", "kosovo": "eur", "latvia": "eur", "lithuania": "eur", "luxembourg": "eur",
    "north macedonia": "eur", "malta": "eur", "moldova": "eur", "montenegro": "eur", "netherlands": "eur",
    "norway": "eur", "poland": "eur", "portugal": "eur", "romania": "eur", "russia": "eur", "san marino": "eur",
    "serbia": "eur", "slovakia": "eur", "slovenia": "eur", "spain": "eur", "sweden": "eur", "switzerland": "eur",
    "turkey": "eur", "ukraine": "eur", "united kingdom": "eur", "uk": "eur", "great britain": "eur",
    "afghanistan": "ismea", "algeria": "ismea", "angola": "ismea", "azerbaijan": "ismea", "bahrain": "ismea",
    "bangladesh": "ismea", "benin": "ismea", "botswana": "ismea", "burkina faso": "ismea", "burundi": "ismea",
    "cameroon": "ismea", "cape verde": "ismea", "chad": "ismea", "comoros": "ismea", "republic of congo": "ismea",
    "democratic republic of the congo": "ismea", "djibouti": "ismea", "egypt": "ismea", "guinea": "ismea",
    "eritrea": "ismea", "ethiopia": "ismea", "gabon": "ismea", "gambia": "ismea", "ghana": "ismea",
    "guinea-bissau": "ismea", "iraq": "ismea", "cote d'ivoire": "ismea", "ivory coast": "ismea", "jordan": "ismea",
    "kazakhstan": "ismea", "kenya": "ismea", "kuwait": "ismea", "kyrgyzstan": "ismea", "lebanon": "ismea",
    "lesotho": "ismea", "liberia": "ismea", "madagascar": "ismea", "malawi": "ismea", "maldives": "ismea",
    "mali": "ismea", "mauritania": "ismea", "mauritius": "ismea", "mayotte": "ismea", "morocco": "ismea",
    "mozambique": "ismea", "namibia": "ismea", "nepal": "ismea", "niger": "ismea", "nigeria": "ismea",
    "oman": "ismea", "pakistan": "ismea", "qatar": "ismea", "reunion": "ismea", "rwanda": "ismea",
    "saudi arabia": "ismea", "senegal": "ismea", "seychelles": "ismea", "sierra leone": "ismea",
    "south africa": "ismea", "sri lanka": "ismea", "swaziland": "ismea", "tajikistan": "ismea", "tanzania": "ismea",
    "togo": "ismea", "tunisia": "ismea", "turkmenistan": "ismea", "united arab emirates": "ismea", "uae": "ismea",
    "uganda": "ismea", "uzbekistan": "ismea", "zambia": "ismea", "zimbabwe": "ismea",
    "american samoa": "asia", "brunei": "asia", "cambodia": "asia", "china": "asia", "fiji": "asia",
    "french polynesia": "asia", "guam": "asia", "hong kong": "asia", "hong kong sar": "asia", "indonesia": "asia",
    "india": "asia", "japan": "asia", "south korea": "asia", "laos": "asia", "macau": "asia", "macau sar": "asia",
    "malaysia": "asia", "mongolia": "asia", "myanmar": "asia", "new caledonia": "asia", "northern mariana islands": "asia",
    "philippines": "asia", "samoa": "asia", "singapore": "asia", "taiwan": "asia", "thailand": "asia", "vietnam": "asia",
    "israel": "israel"
};



// Extracted from ups-calculator/script.js
const COUNTRY_SERVICE_ZONES = {
    "afghanistan": { saverImport: 9 },
    "aland island": { saverImport: 7 },
    "albania": { saverImport: 9 },
    "algeria": { saverImport: 8 },
    "american samoa": { saverImport: 9 },
    "andorra": { saverImport: null },
    "angola": { saverImport: 9 },
    "anguilla": { saverImport: 9 },
    "antigua and barbuda": { saverImport: 9 },
    "argentina": { saverImport: 9 },
    "armenia": { saverImport: 9 },
    "aruba": { saverImport: 9 },
    "australia": { saverImport: 2 },
    "austria": { saverImport: 7 },
    "azerbaijan": { saverImport: 8 },
    "azores": { saverImport: 7 },
    "bahamas": { saverImport: 9 },
    "bahrain": { saverImport: 9 },
    "bangladesh": { saverImport: 4 },
    "barbados": { saverImport: 9 },
    "belarus": { saverImport: 8 },
    "belgium": { saverImport: 6 },
    "belize": { saverImport: null },
    "benin": { saverImport: 9 },
    "bermuda": { saverImport: 9 },
    "bolivia": { saverImport: 9 },
    "bonaire": { saverImport: 9 },
    "bosnia and herzegovina": { saverImport: 8 },
    "botswana": { saverImport: 9 },
    "brazil": { saverImport: 7 },
    "british virgin islands": { saverImport: 9 },
    "brunei": { saverImport: 2 },
    "bulgaria": { saverImport: 7 },
    "burkina faso": { saverImport: 9 },
    "burundi": { saverImport: 9 },
    "cambodia": { saverImport: 4 },
    "cameroon": { saverImport: 8 },
    "canada": { saverImport: 5 },
    "canary islands": { saverImport: 7 },
    "cape verde": { saverImport: 9 },
    "cayman islands": { saverImport: 9 },
    "central african republic": { saverImport: null },
    "chad": { saverImport: 9 },
    "chile": { saverImport: 9 },
    "china": { saverImport: 3 },
    "southern china": { saverImport: 10 },
    "cn southern": { saverImport: 10 },
    "colombia": { saverImport: 9 },
    "comoros": { saverImport: 9 },
    "congo": { saverImport: 9 },
    "costa rica": { saverImport: 9 },
    "cote d'ivoire": { saverImport: 9 },
    "ivory coast": { saverImport: 9 },
    "croatia": { saverImport: 8 },
    "curacao": { saverImport: 9 },
    "cyprus": { saverImport: 9 },
    "czech republic": { saverImport: 7 },
    "denmark": { saverImport: 7 },
    "djibouti": { saverImport: 9 },
    "dominica": { saverImport: 9 },
    "dominican republic": { saverImport: 9 },
    "ecuador": { saverImport: 9 },
    "egypt": { saverImport: 9 },
    "el salvador": { saverImport: 9 },
    "england": { saverImport: 6 },
    "eritrea": { saverImport: 9 },
    "estonia": { saverImport: 9 },
    "ethiopia": { saverImport: 8 },
    "faroe islands": { saverImport: null },
    "finland": { saverImport: 7 },
    "france": { saverImport: 6 },
    "french guiana": { saverImport: null },
    "gabon": { saverImport: 9 },
    "gambia": { saverImport: 9 },
    "georgia": { saverImport: 9 },
    "germany": { saverImport: 6 },
    "ghana": { saverImport: 8 },
    "gibraltar": { saverImport: 8 },
    "greece": { saverImport: 7 },
    "greenland": { saverImport: null },
    "grenada": { saverImport: 9 },
    "guadeloupe": { saverImport: 9 },
    "guam": { saverImport: 4 },
    "guatemala": { saverImport: 8 },
    "guernsey": { saverImport: 8 },
    "guinea": { saverImport: 9 },
    "guinea-bissau": { saverImport: 9 },
    "guyana": { saverImport: 9 },
    "haiti": { saverImport: 9 },
    "honduras": { saverImport: 9 },
    "hong kong": { saverImport: 3 },
    "hungary": { saverImport: 7 },
    "iceland": { saverImport: 8 },
    "india": { saverImport: 3 },
    "iraq": { saverImport: 9 },
    "ireland": { saverImport: 7 },
    "israel": { saverImport: 8 },
    "italy": { saverImport: 6 },
    "jamaica": { saverImport: 9 },
    "japan": { saverImport: 3 },
    "jersey": { saverImport: 8 },
    "jordan": { saverImport: 8 },
    "kazakhstan": { saverImport: 9 },
    "kenya": { saverImport: 8 },
    "korea": { saverImport: 2 },
    "south korea": { saverImport: 2 },
    "kosovo": { saverImport: 9 },
    "kuwait": { saverImport: 8 },
    "kyrgyzstan": { saverImport: 9 },
    "laos": { saverImport: 4 },
    "latvia": { saverImport: 8 },
    "lebanon": { saverImport: 9 },
    "lesotho": { saverImport: 9 },
    "liberia": { saverImport: 9 },
    "liechtenstein": { saverImport: 7 },
    "lithuania": { saverImport: 8 },
    "luxembourg": { saverImport: 6 },
    "macau": { saverImport: 3 },
    "madagascar": { saverImport: 9 },
    "madeira": { saverImport: 7 },
    "malawi": { saverImport: 9 },
    "malaysia": { saverImport: 3 },
    "maldives": { saverImport: 9 },
    "mali": { saverImport: 9 },
    "malta": { saverImport: 9 },
    "martinique": { saverImport: 9 },
    "mauritania": { saverImport: 9 },
    "mauritius": { saverImport: 9 },
    "mayotte": { saverImport: 9 },
    "mexico": { saverImport: 5 },
    "moldova": { saverImport: 8 },
    "monaco": { saverImport: 6 },
    "mongolia": { saverImport: 9 },
    "montenegro": { saverImport: 9 },
    "montserrat": { saverImport: 9 },
    "morocco": { saverImport: 9 },
    "mozambique": { saverImport: 9 },
    "myanmar": { saverImport: 4 },
    "namibia": { saverImport: 9 },
    "nepal": { saverImport: 9 },
    "netherlands": { saverImport: 6 },
    "holland": { saverImport: 6 },
    "new caledonia": { saverImport: 9 },
    "new zealand": { saverImport: 2 },
    "nicaragua": { saverImport: 9 },
    "niger": { saverImport: 9 },
    "nigeria": { saverImport: 9 },
    "norfolk island": { saverImport: null },
    "north macedonia": { saverImport: 8 },
    "northern ireland": { saverImport: 6 },
    "northern mariana islands": { saverImport: 9 },
    "norway": { saverImport: 7 },
    "oman": { saverImport: 9 },
    "pakistan": { saverImport: 4 },
    "panama": { saverImport: 9 },
    "paraguay": { saverImport: 9 },
    "peru": { saverImport: 9 },
    "philippines": { saverImport: 2 },
    "poland": { saverImport: 7 },
    "portugal": { saverImport: 7 },
    "puerto rico": { saverImport: 5 },
    "qatar": { saverImport: 8 },
    "reunion": { saverImport: 8 },
    "romania": { saverImport: 7 },
    "russia": { saverImport: 8 },
    "rwanda": { saverImport: 9 },
    "samoa": { saverImport: 9 },
    "san marino": { saverImport: 6 },
    "saudi arabia": { saverImport: 9 },
    "scotland": { saverImport: 6 },
    "senegal": { saverImport: 9 },
    "serbia": { saverImport: 9 },
    "seychelles": { saverImport: 9 },
    "sierra leone": { saverImport: 9 },
    "singapore": { saverImport: 1 },
    "slovakia": { saverImport: 7 },
    "slovenia": { saverImport: 8 },
    "south africa": { saverImport: 9 },
    "spain": { saverImport: 7 },
    "sri lanka": { saverImport: 4 },
    "st. barthelemy": { saverImport: 9 },
    "st. kitts": { saverImport: 9 },
    "st. lucia": { saverImport: 9 },
    "st. maarten": { saverImport: 9 },
    "st. vincent": { saverImport: 9 },
    "suriname": { saverImport: 9 },
    "swaziland": { saverImport: 9 },
    "sweden": { saverImport: 7 },
    "switzerland": { saverImport: 7 },
    "taiwan": { saverImport: 2 },
    "tanzania": { saverImport: 8 },
    "thailand": { saverImport: 3 },
    "togo": { saverImport: 9 },
    "trinidad and tobago": { saverImport: 9 },
    "trinidad & tobago": { saverImport: 9 },
    "tunisia": { saverImport: null },
    "turkey": { saverImport: 8 },
    "turkmenistan": { saverImport: 9 },
    "turks and caicos": { saverImport: 9 },
    "uganda": { saverImport: 8 },
    "ukraine": { saverImport: 9 },
    "united arab emirates": { saverImport: 8 },
    "uae": { saverImport: 8 },
    "united kingdom": { saverImport: 6 },
    "uk": { saverImport: 6 },
    "united states": { saverImport: 5 },
    "usa": { saverImport: 5 },
    "us": { saverImport: 5 },
    "uruguay": { saverImport: 9 },
    "uzbekistan": { saverImport: 9 },
    "vatican city": { saverImport: 6 },
    "venezuela": { saverImport: 9 },
    "vietnam": { saverImport: 2 },
    "wales": { saverImport: 6 },
    "yemen": { saverImport: 9 },
    "zambia": { saverImport: 8 },
    "zimbabwe": { saverImport: 8 }
};

/**
 * Parses and Cleans Import Weight Tier
 * Matches exact logic from ups-calculator lookup
 */
function getRate(zone, weight, serviceRates) {
    if (!serviceRates || !serviceRates[zone]) return 0;

    // Convert Rate String "1.234.567" to Number 1234567
    let rateStr = serviceRates[zone];
    // Assuming RATES structure in rates_data.js comes as raw numbers or formatted strings?
    // In ups-calculator/rates_data.js it processes raw strings into objects. 
    // Wait, RATES object in ups-calculator/script.js is built from raw strings. 
    // rates_data.js in this folder might just be the raw strings if I copied it directly?
    // checking rates_data.js content: It has const RAW_EXPORT_ENVELOPE = `...`
    // It DOES NOT have the parsing logic. The parsing logic is IN script.js.

    return rateStr;
}

// We need to initialize the RATES object from the raw strings since rates_data.js only has raw strings.
// This init logic is copied from ups-calculator/script.js

let UPS_RATES_PARSED = {
    import: {
        saver: {}
    }
};

function initUpsRates() {
    if (typeof RAW_IMPORT_SAVER !== 'undefined') {
        UPS_RATES_PARSED.import.saver = parseRawRates(RAW_IMPORT_SAVER);
    } else {
        console.error("UPS Raw Data not found!");
    }
}

function parseRawRates(rawString) {
    const lines = rawString.trim().split('\n');
    const table = []; 

    lines.forEach(line => {
        const parts = line.split(/\t+/);
        if (parts.length < 2) return;

        let weightStr = parts[0].trim().replace(',', '.');
        let weight = 0;

        // Handle Ranges (e.g., "21-44", "300+")
        if (weightStr.includes('-')) {
            const rangeParts = weightStr.split('-');
            weight = parseFloat(rangeParts[1]); // Use Upper Bound
        } else if (weightStr.includes('+')) {
            weight = 99999; // Represents infinity/max
        } else {
            weight = parseFloat(weightStr);
        }

        let rates = {};
        for (let i = 1; i <= 10; i++) {
            if (parts[i]) {
                let rawVal = parts[i].replace(/\./g, '');
                rates[i] = parseFloat(rawVal);
            }
        }

        table.push({ weight, rates });
    });
    // Ensure sorted by weight
    table.sort((a, b) => a.weight - b.weight);
    return table;
}



function calculateUPSImportRate(originCountry, weightKg) {
    if (!originCountry) return { error: "Negara asal belum dipilih" };
    
    // Ensure Init runs if empty
    if (typeof UPS_RATES_PARSED === 'undefined' || !UPS_RATES_PARSED.import || !UPS_RATES_PARSED.import.saver || Object.keys(UPS_RATES_PARSED.import.saver).length === 0) {
        if (typeof initUpsRates === 'function') initUpsRates();
    }

    const countryKey = originCountry.toLowerCase().trim();
    const zoneData = COUNTRY_SERVICE_ZONES[countryKey];

    if (!zoneData) return { error: "Negara tidak didukung oleh UPS atau nama salah" };

    const zone = zoneData.saverImport;
    if (!zone) return { error: "Layanan Import Saver tidak tersedia dari negara ini" };

    const table = UPS_RATES_PARSED.import.saver;
    if (!table || table.length === 0) return { error: "Data Rate UPS belum dimuat" };

    // Find Weight Tier
    let match = table.find(row => row.weight >= weightKg);
    let baseRate = 0;
    
    if (match) {
        baseRate = match.rates[zone];
    } else {
        const lastEntry = table[table.length - 1];
        if (lastEntry.weight >= 99999) {
             baseRate = lastEntry.rates[zone];
        } else {
             return { error: "Berat melebihi batas tabel (" + lastEntry.weight + "kg)" };
        }
    }

    if (!baseRate) return { error: "Rate tidak ditemukan untuk zona ini" };

    // 1. Base Cost (Flat or Per Kg)
    let totalBaseCost = baseRate;
    if (weightKg > 20.0) {
        const billedWeight = Math.ceil(weightKg);
        totalBaseCost = baseRate * billedWeight;
    }

    // 2. Surge (Demand Surcharge)
    let surgeRate = 0;
    const originRegion = COUNTRY_REGION_ZONES[countryKey] || 'ismea'; // Default to ISMEA if unknown? Or Asia?
    // Destination is always Indonesia (Asia)
    const destinationRegion = 'asia';

    if (destinationRegion === 'eur') surgeRate = UPS_COSTS.SURGE.TO_EUR;
    else if (originRegion === 'eur') surgeRate = UPS_COSTS.SURGE.FROM_EUR;
    else if (originRegion === 'americas') surgeRate = UPS_COSTS.SURGE.FROM_AMERICAS;
    else if (destinationRegion === 'americas' || destinationRegion === 'ismea') surgeRate = UPS_COSTS.SURGE.TO_AMERICAS_ISMEA;
    else if (originRegion === 'israel' || destinationRegion === 'israel') surgeRate = UPS_COSTS.SURGE.ISRAEL;
    else if (originRegion === 'asia' || destinationRegion === 'asia') surgeRate = UPS_COSTS.SURGE.ASIA;

    const billedWeightSurge = Math.ceil(weightKg);
    const surgeTotal = surgeRate * billedWeightSurge;

    // 3. Brokerage (Import)
    const brokerage = UPS_COSTS.BROKERAGE_IMPORT;

    // 4. Subtotal (Base + Surge + Brokerage)
    // Wait, FSI logic in script.js:
    // fsiBase = (basicCost + totalSurcharge) - brokerageCost
    // basicCost = totalBaseCost
    // totalSurcharge includes surgeTotal + brokerage
    // So fsiBase = totalBaseCost + surgeTotal.
    
    // FSI Calculation
    const fsiBase = totalBaseCost + surgeTotal;
    const fuel = fsiBase * UPS_COSTS.FUEL_SURCHARGE;

    // VAT Calculation
    // vatAmount = (subtotal + fsiAmount) * 0.011
    // subtotal = totalBaseCost + surgeTotal + brokerage
    const subtotal = totalBaseCost + surgeTotal + brokerage;
    const vatBase = subtotal + fuel;
    const vat = vatBase * UPS_COSTS.VAT_RATE;

    const finalTotal = subtotal + fuel + vat;

    return {
        baseRate: totalBaseCost,
        surge: surgeTotal,
        brokerage: brokerage,
        fuel: fuel,
        vat: vat,
        total: finalTotal,
        zone: zone,
        details: {
            originRegion: originRegion,
            surgeRate: surgeRate
        }
    };
}


