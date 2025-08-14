// Scroll reveal
const observer = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	}
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile nav toggle
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
	toggle.addEventListener('click', () => {
		const isOpen = header.classList.toggle('open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});
}

// Tilt effect for elements with .tilt
const tilts = document.querySelectorAll('.tilt');
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

tilts.forEach(card => {
	const strength = 10; // deg
	card.addEventListener('mousemove', (e) => {
		const r = card.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - 0.5;
		const py = (e.clientY - r.top) / r.height - 0.5;
		const rx = clamp(-py * strength, -strength, strength);
		const ry = clamp(px * strength, -strength, strength);
		card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
	});
	card.addEventListener('mouseleave', () => {
		card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
	});
});

// Copy email button
function copyTextBySelector(selector) {
	const el = document.querySelector(selector);
	if (!el) return;
	const text = el.textContent.trim();
	navigator.clipboard?.writeText(text).then(() => {
		flash('Email copied to clipboard');
	}).catch(() => {
		flash('Select and copy: ' + text);
	});
}

function flash(message) {
	const n = document.createElement('div');
	n.className = 'flash';
	n.textContent = message;
	document.body.appendChild(n);
	requestAnimationFrame(() => n.classList.add('show'));
	setTimeout(() => {
		n.classList.remove('show');
		setTimeout(() => n.remove(), 300);
	}, 1800);
}

document.querySelectorAll('[data-copy]').forEach(btn => {
	btn.addEventListener('click', () => copyTextBySelector(btn.getAttribute('data-copy')));
});

// Dynamic year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();