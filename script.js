// Navbar auto-hide/show on scroll and hover
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
let isHovered = false;

function handleNavbar() {
    if (!isHovered) {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('hide-navbar');
        } else if (window.scrollY < lastScrollY) {
            header.classList.remove('hide-navbar');
        }
    }
    lastScrollY = window.scrollY;
}

window.addEventListener('scroll', handleNavbar);

header.addEventListener('mouseenter', () => {
    isHovered = true;
    header.classList.remove('hide-navbar');
});
header.addEventListener('mouseleave', () => {
    isHovered = false;
    if (window.scrollY > 100) {
        header.classList.add('hide-navbar');
    }
});

// Scramble Text Animation for About Me
function scrambleText(element, text, speed = 30, scrambleChars = "!<>-_\\/[]{}—=+*^?#________") {
    let iterations = 0;
    let interval = setInterval(() => {
        element.textContent = text
            .split("")
            .map((char, i) => {
                if (i < iterations) return char;
                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("");
        if (iterations >= text.length) clearInterval(interval);
        iterations += 1/3;
    }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    // Scramble nav links ONLY
    document.querySelectorAll('nav a').forEach(link => {
        scrambleText(link, link.textContent.trim());
    });

    // Text Pressure animation for h1 (now only for touch, hover is handled by CSS)
    const pressure = document.querySelector('.pressure-text');
    if (pressure) {
        pressure.addEventListener('touchstart', () => {
            pressure.classList.add('pressed');
        });
        pressure.addEventListener('touchend', () => {
            pressure.classList.remove('pressed');
        });
    }

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    const status = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            status.textContent = "Sending...";
            try {
                const res = await submitContactForm(name, email, message);
                const data = await res.json();
                if (data.success) {
                    status.textContent = "Message sent!";
                    contactForm.reset();
                } else {
                    status.textContent = "Failed to send. Try again.";
                }
            } catch (err) {
                status.textContent = "Error sending message.";
            }
        });
    }
});

// Contact form submission
async function submitContactForm(name, email, message) {
    const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });
    return res;
}