// --- HS CODE AUTOCOMPLETE LOGIC ---

function setupRowListeners() {
    const inputs = document.querySelectorAll('.hs-input');

    inputs.forEach(input => {
        // Remove old listeners to avoid duplicates if called multiple times
        // (Actually simpler to just ensure we don't double attach, or just call once on load)
        // For safety, better to use a marking class or just assume it's called once.

        input.addEventListener('input', function (e) {
            const val = this.value.toLowerCase();
            const parent = this.parentElement;
            let resultsDiv = parent.querySelector('.search-results-dropdown');

            // Create if missing (shouldn't be, but safe check)
            if (!resultsDiv) {
                resultsDiv = document.createElement('div');
                resultsDiv.className = 'search-results-dropdown';
                parent.appendChild(resultsDiv);
            }

            if (val.length < 2) {
                resultsDiv.style.display = 'none';
                return;
            }

            // SEARCH
            // Limit results to 20 for performance
            const matches = HS_DATA.filter(item =>
                item.hs.toLowerCase().includes(val) ||
                (item.desc && item.desc.toLowerCase().includes(val))
            ).slice(0, 20);

            resultsDiv.innerHTML = '';
            if (matches.length > 0) {
                matches.forEach(m => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    div.innerHTML = `<strong>${m.hs}</strong> - ${m.desc || ''} <span style="float:right; color:purple;">BM: ${m.bm}%</span>`;
                    div.onclick = function () {
                        // FILL INPUT
                        input.value = `${m.hs} - ${m.desc}`;
                        // FILL RATE
                        // ID is hs-{n}, we want bm-{n}
                        const idNum = input.id.split('-')[1];
                        const bmInput = document.getElementById(`bm-${idNum}`);
                        if (bmInput) {
                            bmInput.value = m.bm;
                        }
                        resultsDiv.style.display = 'none';

                        // Auto Calc?
                        // calculate(); 
                    };
                    resultsDiv.appendChild(div);
                });
                resultsDiv.style.display = 'block';
            } else {
                resultsDiv.style.display = 'none';
            }
        });

        // Hide on blur (delayed to allow click)
        input.addEventListener('blur', function () {
            setTimeout(() => {
                const parent = this.parentElement;
                const resultsDiv = parent.querySelector('.search-results-dropdown');
                if (resultsDiv) resultsDiv.style.display = 'none';
            }, 200);
        });
    });
}
