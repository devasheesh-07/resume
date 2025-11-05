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
// Enhanced Certificate Modal
const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('certModal');
const certModalOverlay = document.getElementById('certModalOverlay');
const certModalClose = document.getElementById('certModalClose');
const certModalImage = document.getElementById('certModalImage');
const certModalTitle = document.getElementById('certModalTitle');
const certName = document.getElementById('certName');
const certDate = document.getElementById('certDate');
const certIssuer = document.getElementById('certIssuer');
const certId = document.getElementById('certId');
const certDescription = document.getElementById('certDescription');
const certLoading = document.getElementById('certLoading');
const downloadCert = document.getElementById('downloadCert');
const verifyCert = document.getElementById('verifyCert');

// Certificate data - you can expand this with your actual certificate details
const certificateData = {
  'python-cert.png': {
    name: 'Python Programming Professional Certificate',
    date: 'June 2023',
    issuer: 'Coding Academy',
    id: 'PC-2023-001',
    description: 'Comprehensive certification in Python programming covering advanced concepts, data structures, algorithms, and real-world project implementation.',
    verifyUrl: '#'
  },
  'java-cert.png': {
    name: 'Java Development Master Certificate',
    date: 'August 2023',
    issuer: 'Tech Institute',
    id: 'JD-2023-045',
    description: 'Advanced Java programming certification focusing on enterprise development, Spring Framework, and modern software architecture patterns.',
    verifyUrl: '#'
  },
  'html-cert.png': {
    name: 'HTML & CSS Expert Certification',
    date: 'March 2023',
    issuer: 'Web Development Pro',
    id: 'HC-2023-078',
    description: 'Mastery in modern web development technologies including HTML5, CSS3, responsive design, and accessibility standards.',
    verifyUrl: '#'
  },
  'azure-cert.png': {
    name: 'Microsoft Azure Cloud Fundamentals',
    date: 'September 2023',
    issuer: 'Microsoft',
    id: 'AZ-900-2023',
    description: 'Official Microsoft certification demonstrating proficiency in cloud concepts, Azure services, security, and pricing.',
    verifyUrl: '#'
  },
  'ml-cert.png': {
    name: 'Machine Learning Specialist',
    date: 'November 2023',
    issuer: 'AI Institute',
    id: 'ML-2023-112',
    description: 'Advanced machine learning certification covering neural networks, deep learning, and real-world AI implementation strategies.',
    verifyUrl: '#'
  },
  'cpp-cert.png': {
    name: 'C++ Programming Professional',
    date: 'January 2023',
    issuer: 'Code Masters',
    id: 'CPP-2023-023',
    description: 'Expert-level C++ programming certification focusing on memory management, performance optimization, and modern C++ standards.',
    verifyUrl: '#'
  },
  'problem-solving-cert.png': {
    name: 'Advanced Problem Solving',
    date: 'July 2023',
    issuer: 'Algorithm Pro',
    id: 'PS-2023-067',
    description: 'Certification in advanced algorithmic problem solving, data structures, and competitive programming techniques.',
    verifyUrl: '#'
  },
  'isro-cert.png': {
    name: 'ISRO Space Technology Course',
    date: 'December 2023',
    issuer: 'Indian Space Research Organization',
    id: 'ISRO-ST-2023',
    description: 'Specialized certification in space technology and satellite systems from Indias premier space research organization.',
    verifyUrl: '#'
  }
};

// Open certificate modal
certCards.forEach(card => {
  card.addEventListener('click', () => {
    const certSrc = card.getAttribute('data-cert');
    const certKey = certSrc.split('/').pop(); // Get filename

    // Show loading state
    certLoading.classList.add('active');
    certModalImage.style.display = 'none';

    // Set certificate image
    certModalImage.src = certSrc;
    certModalImage.alt = certificateData[certKey]?.name || 'Certificate';

    // Set certificate details
    if (certificateData[certKey]) {
      const cert = certificateData[certKey];
      certModalTitle.textContent = 'Certificate Details';
      certName.textContent = cert.name;
      certDate.textContent = cert.date;
      certIssuer.textContent = cert.issuer;
      certId.textContent = cert.id;
      certDescription.textContent = cert.description;

      // Set up download button
      downloadCert.onclick = () => downloadCertificate(certSrc, cert.name);

      // Set up verify button
      verifyCert.onclick = () => window.open(cert.verifyUrl, '_blank');
    }

    // Show modal
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Image load event
    certModalImage.onload = () => {
      certLoading.classList.remove('active');
      certModalImage.style.display = 'block';
    };

    // Image error event
    certModalImage.onerror = () => {
      certLoading.classList.remove('active');
      certModalImage.style.display = 'block';
      certModalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMWUyOTNiIi8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBNODAgODBIMTIwTTgwIDEwMEgxMjBNNjAgNjBWNzBNNjAgODBWNzBNNjAgMTAwVjcwTTE0MCA2MFY3ME0xNDAgODBWNzBNMTQwIDEwMFY3MCIgc3Ryb2tlPSIjNjQ3NDhiIiBzdHJva2Utd2lkdGg9IjIiLz4KPHRleHQgeD0iMTAwIiB5PSI0MCIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5DZXJ0aWZpY2F0ZSBJbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+';
    };
  });
});

// Close modal functions
function closeCertModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  certModalImage.classList.remove('zoomed');
}

certModalClose.addEventListener('click', closeCertModal);
certModalOverlay.addEventListener('click', closeCertModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('active')) {
    closeCertModal();
  }
});

// Zoom functionality for certificate image
certModalImage.addEventListener('click', (e) => {
  e.stopPropagation();
  certModalImage.classList.toggle('zoomed');
});

// Download certificate function
function downloadCertificate(imageSrc, fileName) {
  const link = document.createElement('a');
  link.href = imageSrc;
  link.download = `${fileName.replace(/\s+/g, '_')}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show download confirmation
  const originalText = downloadCert.innerHTML;
  downloadCert.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
  downloadCert.disabled = true;

  setTimeout(() => {
    downloadCert.innerHTML = originalText;
    downloadCert.disabled = false;
  }, 2000);
}

// Prevent modal content click from closing modal
certModal.querySelector('.cert-modal-content').addEventListener('click', (e) => {
  e.stopPropagation();
});
// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.style.display === 'flex') {
    certModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form Submission
// Form Submission with Web3Forms
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const message = contactForm.querySelector('textarea[name="message"]').value;

  // Word count validation (at least 20 words)
  const wordCount = message.trim().split(/\s+/).length;
  if (wordCount < 20) {
    formStatus.innerHTML = '⚠️ Please enter at least 20 words in your message.';
    formStatus.style.color = '#f87171';
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  formStatus.innerHTML = 'Sending your message...';
  formStatus.style.color = '#3b82f6';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok && result.success) {
      formStatus.innerHTML = '✅ Thank you! Your message has been sent successfully.';
      formStatus.style.color = '#10b981';
      contactForm.reset();
    } else {
      formStatus.innerHTML = '❌ There was an error sending your message. Please try again.';
      formStatus.style.color = '#f87171';
      console.error('Form submission error:', result);
    }
  } catch (error) {
    formStatus.innerHTML = '⚠️ Network error. Please check your connection and try again.';
    formStatus.style.color = '#f87171';
    console.error('Form submission error:', error);
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
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