function toggleTheme() {
    let currentTheme = document.documentElement.classList.contains("dark-theme") ? "light" : "dark";
    setTheme(currentTheme);
  }
  
  function setTheme(theme) {
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
    document.documentElement.classList.toggle("light-theme", theme === "light");
  
    localStorage.setItem("theme", theme);
  
    // Update toggle switch state
    const toggleSwitch = document.getElementById("theme-toggle");
    if (toggleSwitch) {
      toggleSwitch.checked = theme === "dark";
    }
  }
  
  function getPreferredTheme() {
    return localStorage.getItem("theme") || 
           (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function copyCode(button) {
    const wrapper = button.closest('.highlight-wrapper');
    const codeLines = wrapper.querySelectorAll('.cl');
    
    if (codeLines.length > 0) {
        const textToCopy = Array.from(codeLines)
            .map(line => line.innerText)
            .join('\n');

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = button.innerText;
            button.innerText = "COPIED";
            setTimeout(() => {
                button.innerText = originalText;
            }, 2000);
        });
    } else {
        // Fallback for blocks without .cl
        const codeEl = wrapper.querySelector('pre');
        if (codeEl) {
            navigator.clipboard.writeText(codeEl.innerText).then(() => {
                const originalText = button.innerText;
                button.innerText = "COPIED";
                setTimeout(() => {
                    button.innerText = originalText;
                }, 2000);
            });
        }
    }
  }

  function updateBDCClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const timeMap = { 'h': h, 'm': m, 's': s };
    const clockContainer = document.getElementById('bdc-clock');
    if (!clockContainer) return;

    clockContainer.setAttribute('data-time', `T: ${h}:${m}:${s}`);

    for (const [key, val] of Object.entries(timeMap)) {
        const group = document.getElementById(`group-${key}`);
        if (!group) continue;
        
        let groupHtml = '';
        for (let i = 0; i < 2; i++) {
            const digit = parseInt(val[i]);
            const binary = digit.toString(2).padStart(4, '0');
            groupHtml += '<div class="bdc-col">';
            for (let bit = 0; bit < 4; bit++) {
                const isOn = binary[bit] === '1';
                groupHtml += `<div class="bdc-dot ${isOn ? 'on' : ''}"></div>`;
            }
            groupHtml += '</div>';
        }
        group.innerHTML = groupHtml;
    }
  }

  function openQRModal(imgSrc) {
    const modal = document.getElementById('qr-modal');
    const modalImg = document.getElementById('qr-modal-img');
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.add('active');
    }
  }

  function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.classList.remove('active');
    }
  }

  function initTypewriter() {
    const el = document.getElementById('typewriter-greeting');
    if (!el) return;

    const messages = [
        "VANAKAM..!",
        "I am Jai.",
        "ACCESSING_DATABASE...",
        "WELCOME_TO_JAIDOC"
    ];
    
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let msgIndex = 0;

    function scramble(targetText) {
        let iteration = 0;
        const interval = setInterval(() => {
            el.innerText = targetText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= targetText.length) {
                clearInterval(interval);
                setTimeout(next, 3000); // Wait before next message
            }

            iteration += 1 / 3;
        }, 30);
    }

    function next() {
        msgIndex = (msgIndex + 1) % messages.length;
        scramble(messages[msgIndex]);
    }

    scramble(messages[0]);
  }

  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (!searchInput || !searchResults) return;

    let searchIndex = [];

    // Truly dynamic path resolution for index.json
    const getSearchPath = () => {
        const path = window.location.pathname;
        const base = path.substring(0, path.indexOf('/', 1) + 1);
        if (base.includes('jaidocs')) return '/jaidocs/index.json';
        return '/index.json';
    };

    fetch(getSearchPath())
        .then(response => response.json())
        .then(data => searchIndex = data)
        .catch(err => console.warn("Search index error", err));

    // Open overlay on header input focus/click
    searchInput.addEventListener('mousedown', (e) => {
        e.preventDefault();
        openSearchOverlay();
    });

    function openSearchOverlay() {
        searchResults.innerHTML = `
            <button class="search-close" onclick="closeSearch()">CLOSE</button>
            <div class="search-overlay-header">
                <div class="search-overlay-title">SEARCH JAIDOC</div>
                <input type="text" id="overlay-input" class="search-overlay-input" placeholder="Type here..." autocomplete="off">
            </div>
            <div id="search-items" class="search-items-container"></div>
        `;
        searchResults.classList.add('active');
        const overlayInput = document.getElementById('overlay-input');
        overlayInput.focus();

        overlayInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const itemsContainer = document.getElementById('search-items');
            
            if (query.length === 0) {
                itemsContainer.innerHTML = '';
                return;
            }

            const matches = searchIndex.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.summary.toLowerCase().includes(query)
            ).slice(0, 10);

            renderResults(matches, query);
        });
    }

    function renderResults(results, query) {
        const itemsContainer = document.getElementById('search-items');
        if (results.length === 0) {
            itemsContainer.innerHTML = `<div class="search-item">NO RESULTS FOR: "${query.toUpperCase()}"</div>`;
        } else {
            itemsContainer.innerHTML = results.map(item => `
                <a href="${item.permalink}" class="search-item">
                    <span class="search-item-title">${item.title}</span>
                    <span class="search-item-summary">${item.summary.substring(0, 200)}...</span>
                </a>
            `).join('');
        }
    }
  }

  function closeSearch() {
    const results = document.getElementById('search-results');
    if (results) results.classList.remove('active');
  }

    document.addEventListener("DOMContentLoaded", () => {
    setTheme(getPreferredTheme());
    updateBDCClock();
    setInterval(updateBDCClock, 1000);
    initTypewriter();
    initSearch();

    // Attach listeners to all latest-qrcode images
    document.querySelectorAll('.latest-qrcode img').forEach(img => {
        img.addEventListener('click', () => {
            openQRModal(img.src);
        });
    });

    // Floating Back to Top Visibility
    const topBtn = document.getElementById('floating-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });
  });
