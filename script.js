// Theme Toggle Functionality
const toggleBtn = document.getElementById('toggle-btn');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateToggleIcon(currentTheme);

toggleBtn.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleIcon(newTheme);
  
  // Add rotation animation on toggle
  toggleBtn.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    toggleBtn.style.transform = 'rotate(0deg)';
  }, 300);
});

function updateToggleIcon(theme) {
  toggleBtn.innerHTML = theme === 'light' ? '&#9788;' : '&#9789;';
}

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and project cards
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
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

// Add parallax effect to header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (header) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
    header.style.opacity = 1 - scrolled / 500;
  }
});

// Project card tilt effect on mouse move
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.quick-links a, #toggle-btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .quick-links a, #toggle-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
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
document.head.appendChild(style);

// Cursor trail effect (optional - can be removed if too distracting)
const createTrail = (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => {
    trail.remove();
  }, 500);
};

let throttleTimer;
document.addEventListener('mousemove', (e) => {
  if (throttleTimer) return;
  throttleTimer = setTimeout(() => {
    throttleTimer = null;
    if (window.innerWidth > 768) {
      createTrail(e);
    }
  }, 50);
});

// Add cursor trail CSS
const trailStyle = document.createElement('style');
trailStyle.textContent = `
  .cursor-trail {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.6;
    animation: trail-fade 0.5s ease-out forwards;
    z-index: 9999;
  }
  
  @keyframes trail-fade {
    to {
      transform: scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(trailStyle);

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add typing effect to subtitle (optional enhancement)
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let index = 0;
  
  const typeWriter = () => {
    if (index < text.length) {
      subtitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  };
  
  setTimeout(typeWriter, 500);
}

console.log('Portfolio loaded successfully! 🚀');
