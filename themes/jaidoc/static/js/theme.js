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
    const code = wrapper.querySelector('pre').innerText;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerText;
        button.innerText = "COPIED";
        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    });
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
  
  document.addEventListener("DOMContentLoaded", () => {
    setTheme(getPreferredTheme());
    updateBDCClock();
    setInterval(updateBDCClock, 1000);
    initTypewriter();

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
