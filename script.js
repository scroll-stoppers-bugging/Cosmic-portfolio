// ============================================
// COSMIC UNIVERSE - CINEMATIC EXPERIENCE
// ============================================

// Canvas setup
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];
let particles = [];
let nebulaClouds = [];
let time = 0;

// Initialize canvas and cosmic elements
function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  // Create deep space starfield with layered depth
  stars = [];
  for (let layer = 0; layer < 3; layer++) {
    const layerStars = 300 - layer * 50;
    for (let i = 0; i < layerStars; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * (1.5 - layer * 0.3),
        s: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        layer: layer,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }

  // Create floating dust particles
  particles = [];
  for (let i = 0; i < 1500; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.05,
      color: ['rgba(0, 255, 255,', 'rgba(255, 0, 255,', 'rgba(74, 144, 226,'][Math.floor(Math.random() * 3)]
    });
  }

  // Create nebula clouds
  nebulaClouds = [];
  for (let i = 0; i < 5; i++) {
    nebulaClouds.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 200 + 150,
      opacity: Math.random() * 0.15 + 0.05,
      color: ['rgba(0, 255, 255,', 'rgba(255, 0, 255,', 'rgba(120, 0, 255,'][Math.floor(Math.random() * 3)],
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      pulse: Math.random() * Math.PI * 2
    });
  }
}

// Draw animated starfield
function drawStars() {
  stars.forEach((star, index) => {
    // Parallax movement based on layer
    const parallaxSpeed = 0.0001 * (3 - star.layer);
    star.x += star.vx;
    star.y += star.vy;

    // Wrap around screen
    if (star.x > w) star.x = 0;
    if (star.x < 0) star.x = w;
    if (star.y > h) star.y = 0;
    if (star.y < 0) star.y = h;

    // Twinkling effect
    star.twinkle += star.twinkleSpeed;
    const twinkleOpacity = star.opacity * (Math.sin(star.twinkle) * 0.5 + 0.5);

    // Draw star with glow
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();

    // Star glow halo
    ctx.fillStyle = `rgba(0, 255, 255, ${twinkleOpacity * 0.3})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r * 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw floating cosmic dust particles
function drawParticles() {
  particles.forEach((particle) => {
    // Brownian motion
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Drift with sine waves
    particle.vx += (Math.random() - 0.5) * 0.1;
    particle.vy += (Math.random() - 0.5) * 0.1;

    // Limit velocity
    const maxV = 1;
    if (Math.abs(particle.vx) > maxV) particle.vx = (particle.vx / Math.abs(particle.vx)) * maxV;
    if (Math.abs(particle.vy) > maxV) particle.vy = (particle.vy / Math.abs(particle.vy)) * maxV;

    // Wrap around
    if (particle.x > w) particle.x = 0;
    if (particle.x < 0) particle.x = w;
    if (particle.y > h) particle.y = 0;
    if (particle.y < 0) particle.y = h;

    // Draw particle with glow
    ctx.fillStyle = `${particle.color}${particle.opacity})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();

    // Particle glow
    ctx.fillStyle = `${particle.color}${particle.opacity * 0.5})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r * 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw animated nebula clouds
function drawNebulaClouds() {
  nebulaClouds.forEach((cloud) => {
    // Slow drift movement
    cloud.x += cloud.vx;
    cloud.y += cloud.vy;

    // Pulse animation
    cloud.pulse += 0.001;
    const pulseScale = Math.sin(cloud.pulse) * 0.1 + 0.95;

    // Wrap around
    if (cloud.x > w + 300) cloud.x = -300;
    if (cloud.x < -300) cloud.x = w + 300;
    if (cloud.y > h + 300) cloud.y = -300;
    if (cloud.y < -300) cloud.y = h + 300;

    // Draw nebula cloud with gradient
    const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.r * pulseScale);
    gradient.addColorStop(0, `${cloud.color}${cloud.opacity * 0.8})`);
    gradient.addColorStop(0.5, `${cloud.color}${cloud.opacity * 0.4})`);
    gradient.addColorStop(1, `${cloud.color}0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(cloud.x - cloud.r * pulseScale, cloud.y - cloud.r * pulseScale, cloud.r * pulseScale * 2, cloud.r * pulseScale * 2);
  });
}

// Draw occasional cosmic lens flares
function drawLensFlares() {
  // Random lens flare events
  if (Math.random() > 0.998) {
    const flareX = Math.random() * w;
    const flareY = Math.random() * h;

    for (let i = 5; i > 0; i--) {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 / i})`;
      ctx.beginPath();
      ctx.arc(flareX, flareY, 50 * i, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Main animation loop
function animate() {
  // Clear canvas with fade effect for motion trails
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, w, h);

  time += 0.016; // 60fps

  // Draw cosmic elements in order
  drawNebulaClouds();
  drawParticles();
  drawStars();
  drawLensFlares();

  requestAnimationFrame(animate);
}

// Cursor glow effect
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '0.8';
  });
}

// Initialize Lenis smooth scroll
function initLenisScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}

// Interactive button effects
function initButtonEffects() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-4px) scale(1.08)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
    });

    button.addEventListener('click', (e) => {
      // Ripple effect
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'rippleEffect 0.6s ease-out';

      // Add ripple animation
      const style = document.createElement('style');
      if (!document.querySelector('style[data-ripple]')) {
        style.setAttribute('data-ripple', '');
        style.textContent = `
          @keyframes rippleEffect {
            from {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(-50%, -50%) scale(4);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Scroll-based background shift
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const glow = document.querySelector('.glow');

    if (glow) {
      glow.style.opacity = Math.max(0.3, 1 - scrollPercent * 0.5);
    }
  });
}

// Responsive canvas resize
window.addEventListener('resize', init);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  init();
  animate();
  initCursorGlow();
  initLenisScroll();
  initButtonEffects();
  initScrollEffects();

  // Add smooth reveal animations to sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = '0';
    observer.observe(section);
  });
});

// Add fade-in animation for sections
if (!document.querySelector('style[data-section-anim]')) {
  const style = document.createElement('style');
  style.setAttribute('data-section-anim', '');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(60px) blur(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0) blur(0);
      }
    }

    .section-content {
      animation: fadeInUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  `;
  document.head.appendChild(style);
}
