
// --- INIT ---
window.onload = function () {
    // Load HS Data Check
    if (typeof window.HS_DATA_SOURCE !== 'undefined') {
        HS_DATA = window.HS_DATA_SOURCE;
        // Optional: Hint in first row
        document.getElementById('hs-1').placeholder = `Cari dari ${HS_DATA.length.toLocaleString('id-ID')} Data HS...`;
    } else {
        console.error("HS Data not loaded!");
    }

    // Load Kurs Data
    if (typeof window.KURS_DATA !== 'undefined') {
        const kData = window.KURS_DATA;
        if (kData.rate) {
            document.getElementById('kurs').value = kData.rate;
        }
        if (kData.date) {
            document.getElementById('kurs-info').innerHTML = `
                        <small style="color:#27ae60; font-weight:bold;">(Update: ${kData.date})</small> 
                    `;
        }
    }

    // Initial Calc
    reCalcTotalFOB();
};

    </script >

</body >
</html >
