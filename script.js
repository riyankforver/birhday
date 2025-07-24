/** @format */

// Global Variables
let currentSection = 0;
const sections = ["countdown-section", "message-section", "gift-section"];
let typingComplete = false;
let musicPlaying = false;

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
	initializeWebsite();
	startCountdown();
	createFloatingHearts();
	initializeHeartTrail();
	initializeMusicControl();
});

// Initialize Website
function initializeWebsite() {
	// Set birthday date - CHANGE THIS TO RIYA'S ACTUAL BIRTHDAY
	window.birthdayDate = new Date("2004-12-25T00:00:00").getTime(); // Format: YYYY-MM-DDTHH:mm:ss

	// Navigation event listeners
	document.getElementById("next-btn").addEventListener("click", function () {
		nextSection();
		setTimeout(startTypingAnimation, 500);
	});

	document.getElementById("gift-btn").addEventListener("click", function () {
		nextSection();
	});

	document.getElementById("gift-box").addEventListener("click", function () {
		openGiftBox();
	});
}

// Section Navigation
function nextSection() {
	document.getElementById(sections[currentSection]).classList.remove("active");
	currentSection++;
	if (currentSection < sections.length) {
		document.getElementById(sections[currentSection]).classList.add("active");
	}
}

// Countdown Timer
function startCountdown() {
	const countdownTimer = setInterval(function () {
		const now = new Date().getTime();
		const distance = window.birthdayDate - now;

		if (distance < 0) {
			clearInterval(countdownTimer);
			document.getElementById("countdown").innerHTML =
				"🎉 IT'S YOUR BIRTHDAY! 🎉";
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById("days").textContent = String(days).padStart(2, "0");
		document.getElementById("hours").textContent = String(hours).padStart(
			2,
			"0"
		);
		document.getElementById("minutes").textContent = String(minutes).padStart(
			2,
			"0"
		);
		document.getElementById("seconds").textContent = String(seconds).padStart(
			2,
			"0"
		);
	}, 1000);
}

// Typing Animation
function startTypingAnimation() {
	const message = `Hey Ririii 💖\n\nToday is your day, my Tigress...\n\nYou've made my world more beautiful than I ever imagined.\n\nHere's a little something from your someone...`;
	const typedElement = document.getElementById("typed-message");
	const cursor = document.querySelector(".cursor");
	let i = 0;

	typedElement.textContent = "";

	function typeChar() {
		if (i < message.length) {
			if (message.charAt(i) === "\n") {
				typedElement.innerHTML += "<br>";
			} else {
				typedElement.textContent += message.charAt(i);
			}
			i++;
			setTimeout(typeChar, 80);
		} else {
			typingComplete = true;
			setTimeout(() => {
				cursor.style.display = "none";
				document.getElementById("gift-btn").classList.remove("hidden");
			}, 1000);
		}
	}

	typeChar();
}

// Gift Box Animation
function openGiftBox() {
	const giftBox = document.getElementById("gift-box");
	const giftContent = document.getElementById("gift-content");

	// Trigger confetti
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { y: 0.6 },
		colors: ["#ff6b6b", "#ff8e8e", "#ff69b4", "#ffb3b3"],
	});

	// Additional confetti bursts
	setTimeout(() => {
		confetti({
			particleCount: 50,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: ["#ff6b6b", "#ff8e8e", "#ff69b4"],
		});
	}, 200);

	setTimeout(() => {
		confetti({
			particleCount: 50,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: ["#ff6b6b", "#ff8e8e", "#ff69b4"],
		});
	}, 400);

	// Hide gift box and show content
	giftBox.style.animation = "fadeInUp 0.5s ease-out reverse";
	setTimeout(() => {
		giftBox.style.display = "none";
		giftContent.classList.remove("hidden");
		createSparkles();
	}, 500);
}

// Create Floating Hearts
function createFloatingHearts() {
	const heartsContainer = document.querySelector(".floating-hearts");

	setInterval(() => {
		const heart = document.createElement("div");
		heart.className = "floating-heart";
		heart.innerHTML = Math.random() > 0.5 ? "💖" : "💕";
		heart.style.left = Math.random() * 100 + "vw";
		heart.style.animationDuration = Math.random() * 3 + 4 + "s";
		heart.style.fontSize = Math.random() * 10 + 15 + "px";

		heartsContainer.appendChild(heart);

		setTimeout(() => {
			heart.remove();
		}, 7000);
	}, 3000);
}

// Heart Cursor Trail
function initializeHeartTrail() {
	const trailContainer = document.getElementById("heart-trail");
	let mouseX = 0,
		mouseY = 0;

	document.addEventListener("mousemove", function (e) {
		mouseX = e.clientX;
		mouseY = e.clientY;

		// Create custom cursor
		createCustomCursor(mouseX, mouseY);

		// Create heart trail (throttled)
		if (Math.random() > 0.8) {
			createHeartParticle(mouseX, mouseY);
		}
	});

	function createCustomCursor(x, y) {
		// Remove old cursor
		const oldCursor = document.querySelector(".custom-cursor");
		if (oldCursor) oldCursor.remove();

		const cursor = document.createElement("div");
		cursor.className = "custom-cursor";
		cursor.style.cssText = `
            position: fixed;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #ff69b4, #ff8e8e);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease;
        `;
		document.body.appendChild(cursor);
	}

	function createHeartParticle(x, y) {
		const heart = document.createElement("div");
		heart.className = "heart-particle";
		heart.innerHTML = "💖";
		heart.style.left = x + "px";
		heart.style.top = y + "px";

		trailContainer.appendChild(heart);

		setTimeout(() => {
			heart.remove();
		}, 1000);
	}
}

// Create Sparkles for Gift Opening
function createSparkles() {
	const sparkleContainer = document.querySelector(".gift-content");

	for (let i = 0; i < 20; i++) {
		setTimeout(() => {
			const sparkle = document.createElement("div");
			sparkle.innerHTML = "✨";
			sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${Math.random() * 10 + 15}px;
                pointer-events: none;
                animation: sparkleFloat 2s ease-out forwards;
                z-index: 100;
            `;

			sparkleContainer.style.position = "relative";
			sparkleContainer.appendChild(sparkle);

			setTimeout(() => {
				sparkle.remove();
			}, 2000);
		}, i * 100);
	}
}

// Music Control
function initializeMusicControl() {
	const musicBtn = document.getElementById("musicToggle");
	const bgMusic = document.getElementById("bgMusic");

	musicBtn.addEventListener("click", function () {
		if (musicPlaying) {
			bgMusic.pause();
			musicBtn.innerHTML = "🎵";
			musicPlaying = false;
		} else {
			bgMusic.play().catch((e) => {
				console.log("Audio autoplay prevented by browser");
			});
			musicBtn.innerHTML = "🔇";
			musicPlaying = true;
		}
	});

	// Try to autoplay (may be blocked by browser)
	setTimeout(() => {
		bgMusic.play().catch((e) => {
			console.log("Audio autoplay prevented by browser");
		});
	}, 1000);
}

// Add sparkle animation to CSS
const sparkleCSS = `
@keyframes sparkleFloat {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px) scale(0.5);
    }
}
`;

const style = document.createElement("style");
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Add coupon interaction
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(() => {
		const coupons = document.querySelectorAll(".coupon");
		coupons.forEach((coupon) => {
			coupon.addEventListener("click", function () {
				this.style.background = "rgba(255, 107, 107, 0.3)";
				this.style.transform = "scale(0.95)";

				// Create notification
				const notification = document.createElement("div");
				notification.innerHTML = "✨ Coupon Activated! ✨";
				notification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 107, 107, 0.9);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    font-weight: bold;
                    z-index: 10000;
                    animation: fadeInUp 0.5s ease-out;
                `;

				document.body.appendChild(notification);

				setTimeout(() => {
					notification.remove();
				}, 2000);

				setTimeout(() => {
					this.style.background = "rgba(255, 255, 255, 0.2)";
					this.style.transform = "scale(1)";
				}, 200);
			});
		});
	}, 2000);
});
