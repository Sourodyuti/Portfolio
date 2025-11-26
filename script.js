// Theme Toggle Functionality
const toggleBtn = document.getElementById('toggle-btn');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

toggleBtn.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Add smooth rotation animation
  toggleBtn.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    toggleBtn.style.transform = 'rotate(0deg)';
  }, 400);
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  fadeInObserver.observe(section);
});

// Staggered animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  fadeInObserver.observe(card);
});

// Smooth parallax effect on header
const header = document.querySelector('.header');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      if (header && scrolled < 600) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = Math.max(0, 1 - scrolled / 400);
      }
      ticking = false;
    });
    ticking = true;
  }
});

// Enhanced 3D tilt effect for project cards
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// Smooth scroll for anchor links
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

// Add ripple effect to glass buttons
const glassButtons = document.querySelectorAll('.glass-btn, #toggle-btn');

glassButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .glass-btn, #toggle-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(20, 184, 166, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Animate contact items on hover
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.contact-icon');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      icon.style.transition = 'transform 0.3s ease';
    }
  });
  
  item.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.contact-icon');
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }
  });
});

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Typing effect for subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.opacity = '1';
  let index = 0;
  
  const typeWriter = () => {
    if (index < text.length) {
      subtitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 40);
    }
  };
  
  setTimeout(typeWriter, 800);
}

// Add glow effect to avatar on scroll
const avatar = document.querySelector('.avatar');
if (avatar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glowIntensity = Math.min(scrolled / 300, 1);
    avatar.style.boxShadow = `0 0 ${40 + glowIntensity * 40}px rgba(20, 184, 166, ${0.4 + glowIntensity * 0.4})`;
  });
}

// Social links hover animation
const socialLinks = document.querySelectorAll('.glass-btn');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add dynamic gradient shift to orbs
const orbs = document.querySelectorAll('.gradient-orb');
let orbDirection = 1;

setInterval(() => {
  orbs.forEach((orb, index) => {
    const currentTransform = orb.style.transform || 'translate(0, 0)';
    const offset = (index + 1) * 20 * orbDirection;
    orb.style.transition = 'transform 3s ease-in-out';
  });
  orbDirection *= -1;
}, 5000);

// Project card click to open link
projectCards.forEach(card => {
  card.addEventListener('click', function(e) {
    if (!e.target.closest('a')) {
      const link = this.querySelector('h3 a');
      if (link) {
        window.open(link.href, '_blank');
      }
    }
  });
  
  // Add pointer cursor
  card.style.cursor = 'pointer';
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    document.body.style.animation = 'rainbow 2s ease infinite';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
      style.remove();
    }, 4000);
  }
});

console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #14b8a6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion by Sourodyuti Biswas Sanyal', 'color: #2dd4bf; font-size: 12px;');
