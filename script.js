// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Certificate Modal
const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('certModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

certCards.forEach(card => {
  card.addEventListener('click', () => {
    const certSrc = card.getAttribute('data-cert');
    modalImage.src = certSrc;
    certModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  certModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.style.display === 'flex') {
    certModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const message = contactForm.querySelector('textarea').value;
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Here you would typically send the data to a server
  // For now, we'll just show a success message
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .cert-card, .about-image, .about-content, .contact-form, .contact-item, .stat').forEach(el => {
  observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== PARTICLE BACKGROUND INITIALIZATION =====
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#2563eb', '#06b6d4', '#3b82f6']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3b82f6',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 0.3
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const cursor = document.createElement('div');
  const cursorFollower = document.createElement('div');
  
  cursor.classList.add('cursor');
  cursorFollower.classList.add('cursor-follower');
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update main cursor immediately
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Create star trail
    createStarTrail(mouseX, mouseY);
  });

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '0.3';
  });

  // Click effect
  document.addEventListener('click', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
      cursor.style.transform = 'scale(1)';
      cursorFollower.style.transform = 'scale(1)';
    }, 100);
  });
}

// ===== STAR TRAIL EFFECT =====
function createStarTrail(x, y) {
  const star = document.createElement('div');
  star.classList.add('star');
  
  // Random direction and distance
  const angle = Math.random() * Math.PI * 2;
  const distance = 20 + Math.random() * 30;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  
  star.style.setProperty('--tx', tx + 'px');
  star.style.setProperty('--ty', ty + 'px');
  star.style.left = x + 'px';
  star.style.top = y + 'px';
  
  // Random color from theme
  const colors = ['#2563eb', '#06b6d4', '#3b82f6', '#ffffff'];
  star.style.background = colors[Math.floor(Math.random() * colors.length)];
  
  document.body.appendChild(star);
  
  // Remove star after animation
  setTimeout(() => {
    star.remove();
  }, 1500);
}

// ===== MOUSE SPARKLE EFFECT =====
function initSparkleEffect() {
  document.addEventListener('mousemove', (e) => {
    // Only create sparkles occasionally for performance
    if (Math.random() > 0.7) {
      createSparkle(e.clientX, e.clientY);
    }
  });
}

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.position = 'fixed';
  sparkle.style.width = '6px';
  sparkle.style.height = '6px';
  sparkle.style.background = 'radial-gradient(circle, #fff, #3b82f6)';
  sparkle.style.borderRadius = '50%';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = '9996';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.boxShadow = '0 0 10px 2px #3b82f6';
  
  document.body.appendChild(sparkle);
  
  // Sparkle animation
  sparkle.animate([
    { transform: 'scale(0) rotate(0deg)', opacity: 1 },
    { transform: 'scale(1) rotate(180deg)', opacity: 0.5 },
    { transform: 'scale(0) rotate(360deg)', opacity: 0 }
  ], {
    duration: 600,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  });
  
  // Remove sparkle after animation
  setTimeout(() => {
    sparkle.remove();
  }, 600);
}

// ===== INITIALIZE ALL EFFECTS =====
function initMouseEffects() {
  // Only initialize on non-mobile devices
  if (window.innerWidth > 768) {
    initCustomCursor();
    initSparkleEffect();
  }
  initParticles();
}

// Initialize mouse effects when page loads
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  initMouseEffects();
});