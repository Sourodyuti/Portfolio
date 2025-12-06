// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

// ===========================
// Typing Animation
// ===========================
const typingText = document.querySelector('.typing-text');
const roles = [
  'ML Engineer',
  'Computer Vision Specialist',
  'Full Stack Developer',
  'Entrepreneur',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  
  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(type, typingSpeed);
}

type();

// ===========================
// Three.js 3D Background
// ===========================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Create 3D geometries
const geometries = [];

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0x6366f1,
  wireframe: true,
  transparent: true,
  opacity: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-3, 2, -2);
scene.add(torus);
geometries.push(torus);

// Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
const icoMaterial = new THREE.MeshStandardMaterial({
  color: 0x8b5cf6,
  wireframe: true,
  transparent: true,
  opacity: 0.3
});
const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
icosahedron.position.set(3, -2, -3);
scene.add(icosahedron);
geometries.push(icosahedron);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x6366f1,
  wireframe: true,
  transparent: true,
  opacity: 0.2
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 3, -4);
scene.add(sphere);
geometries.push(sphere);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x6366f1, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate geometries
  geometries.forEach((geo, index) => {
    geo.rotation.x += 0.001 * (index + 1);
    geo.rotation.y += 0.002 * (index + 1);
  });
  
  // Camera movement based on mouse
  camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===========================
// Particle Network
// ===========================
const particleCanvas = document.getElementById('particle-canvas');
const ctx = particleCanvas.getContext('2d');

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const connectionDistance = 150;

class Particle {
  constructor() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < connectionDistance) {
        const opacity = (1 - distance / connectionDistance) * 0.3;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  connectParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
});

// ===========================
// GSAP Scroll Animations
// ===========================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate sections on scroll
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1
      },
      opacity: 0,
      y: 50
    });
  });
  
  // Animate skill categories
  gsap.utils.toArray('.skill-category').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 60%',
        scrub: 1
      },
      opacity: 0,
      y: 50,
      delay: index * 0.1
    });
  });
  
  // Animate project cards
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 60%',
        scrub: 1
      },
      opacity: 0,
      y: 50,
      delay: index * 0.1
    });
  });
}

// ===========================
// Smooth Scroll for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===========================
// Navigation scroll effect
// ===========================
const nav = document.querySelector('.nav-container');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = html.getAttribute('data-theme') === 'dark' 
      ? 'rgba(10, 10, 15, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.background = html.getAttribute('data-theme') === 'dark' 
      ? 'rgba(10, 10, 15, 0.8)' 
      : 'rgba(255, 255, 255, 0.8)';
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

console.log('%c🚀 Portfolio by Sourodyuti Biswas Sanyal', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with Three.js, GSAP & vanilla JavaScript', 'color: #8b5cf6; font-size: 14px;');