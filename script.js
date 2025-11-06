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

// ===== CERTIFICATE MODAL =====
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
const certDuration = document.getElementById('certDuration');
const certDescription = document.getElementById('certDescription');
const certLoading = document.getElementById('certLoading');
const downloadCert = document.getElementById('downloadCert');
const verifyCert = document.getElementById('verifyCert');

// Certificate data
const certificateData = {
  'python_basic certificate_page-0001.jpg': {
    name: 'Python Programming Professional Certificate',
    date: 'June 2023',
    issuer: 'Coding Academy',
    id: 'PC-2023-001',
    duration: '3 Months',
    description: 'Comprehensive certification in Python programming covering advanced concepts, data structures, algorithms, and real-world project implementation. Mastered object-oriented programming, web development with Django, and data analysis with Pandas.',
    skills: ['Python 3', 'OOP', 'Data Structures', 'Django', 'Pandas', 'NumPy', 'Flask'],
    verifyUrl: '#'
  },
  'java_basic certificate_page-0001.jpg': {
    name: 'Java Development Master Certificate',
    date: 'August 2023',
    issuer: 'Tech Institute',
    id: 'JD-2023-045',
    duration: '4 Months',
    description: 'Advanced Java programming certification focusing on enterprise development, Spring Framework, and modern software architecture patterns. Gained expertise in multi-threading, design patterns, and microservices.',
    skills: ['Java 11', 'Spring Boot', 'Hibernate', 'Maven', 'REST APIs', 'Microservices', 'JUnit'],
    verifyUrl: '#'
  },
  'devansh_234-Learn C++ - Pro (1)_page-0001.jpg': {
    name: 'C++ Programming Professional',
    date: 'January 2023',
    issuer: 'Code Masters',
    id: 'CPP-2023-023',
    duration: '2 Months',
    description: 'Expert-level C++ programming certification focusing on memory management, performance optimization, and modern C++ standards including C++17 and C++20 features.',
    skills: ['C++17', 'STL', 'Memory Management', 'Templates', 'Multithreading', 'Performance Optimization'],
    verifyUrl: '#'
  },
  'WebDevelopmentFundamentals_Badge20240625-7-ii24zb_page-0001.jpg': {
    name: 'HTML & CSS Expert Certification',
    date: 'March 2023',
    issuer: 'Web Development Pro',
    id: 'HC-2023-078',
    duration: '2 Months',
    description: 'Mastery in modern web development technologies including HTML5, CSS3, responsive design, and accessibility standards. Built complex layouts with Flexbox and Grid.',
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design', 'SASS', 'Accessibility'],
    verifyUrl: '#'
  },
  'Azure Fundamentals_page-0001.jpg': {
    name: 'Microsoft Azure Cloud Fundamentals',
    date: 'September 2023',
    issuer: 'Microsoft',
    id: 'AZ-900-2023',
    duration: '1 Month',
    description: 'Official Microsoft certification demonstrating proficiency in cloud concepts, Azure services, security, and pricing. Understanding of core Azure services and cloud concepts.',
    skills: ['Azure Fundamentals', 'Cloud Computing', 'Azure Services', 'Security', 'Networking', 'Storage'],
    verifyUrl: '#'
  },
  'ArtificialIntelligenceFundamentals_Badge20240625-7-i50cnb_page-0001.jpg': {
    name: 'Machine Learning Specialist',
    date: 'November 2023',
    issuer: 'AI Institute',
    id: 'ML-2023-112',
    duration: '5 Months',
    description: 'Advanced machine learning certification covering neural networks, deep learning, and real-world AI implementation strategies. Hands-on experience with TensorFlow and scikit-learn.',
    skills: ['Python', 'TensorFlow', 'scikit-learn', 'Neural Networks', 'Data Preprocessing', 'Model Evaluation'],
    verifyUrl: '#'
  },
  'devansh_234-C++ for problem solving - 1_page-0001.jpg': {
    name: 'Advanced Problem Solving',
    date: 'July 2023',
    issuer: 'Algorithm Pro',
    id: 'PS-2023-067',
    duration: '3 Months',
    description: 'Certification in advanced algorithmic problem solving, data structures, and competitive programming techniques. Mastered complex algorithms and optimization techniques.',
    skills: ['Algorithms', 'Data Structures', 'Dynamic Programming', 'Graph Theory', 'Time Complexity', 'Problem Solving'],
    verifyUrl: '#'
  },
  'isro_page-0001.jpg': {
    name: 'ISRO Space Technology Course',
    date: 'December 2023',
    issuer: 'Indian Space Research Organization',
    id: 'ISRO-ST-2023',
    duration: '6 Months',
    description: 'Specialized certification in space technology and satellite systems from Indias premier space research organization. Covered satellite communication, remote sensing, and space mission design.',
    skills: ['Satellite Technology', 'Remote Sensing', 'Space Mission Design', 'Orbital Mechanics', 'Communication Systems'],
    verifyUrl: '#'
  },
  'GitHubFoundations_Badge20240702-7-l4a49m_page-0001.jpg': {
    name: 'GitHub Foundation',
    date: 'July 2024',
    issuer: 'GitHub',
    id: 'GHF-2024-001',
    duration: '1 Month',
    description: 'GitHub Foundations certification demonstrating proficiency in Git version control, repository management, collaboration workflows, and GitHub ecosystem.',
    skills: ['Git', 'Version Control', 'GitHub', 'Repository Management', 'Collaboration', 'CI/CD'],
    verifyUrl: '#'
  }
};

// Open certificate modal
function openCertificateModal(certSrc) {
  const certKey = certSrc.split('/').pop();
  
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
    certDuration.textContent = cert.duration;
    certDescription.textContent = cert.description;
    
    // Set skills
    const skillsContainer = document.getElementById('certSkills');
    if (skillsContainer && cert.skills) {
      skillsContainer.innerHTML = cert.skills.map(skill => 
        `<span class="skill-badge">${skill}</span>`
      ).join('');
    }
    
    // Set up download button
    downloadCert.onclick = () => downloadCertificate(certSrc, cert.name);
    
    // Set up verify button
    verifyCert.onclick = () => {
      if (cert.verifyUrl && cert.verifyUrl !== '#') {
        window.open(cert.verifyUrl, '_blank');
      } else {
        alert('Verification link not available for this certificate.');
      }
    };
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
}

// Certificate card click handlers
certCards.forEach(card => {
  card.addEventListener('click', () => {
    const certSrc = card.getAttribute('data-cert');
    openCertificateModal(certSrc);
  });
});

// Close certificate modal
function closeCertModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  certModalImage.classList.remove('zoomed');
}

certModalClose.addEventListener('click', closeCertModal);
certModalOverlay.addEventListener('click', closeCertModal);

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

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('active')) {
    closeCertModal();
  }
});

// ===== PROJECT MODAL =====
const projectModal = document.getElementById('projectModal');
const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalClose = document.getElementById('projectModalClose');

// Project data
const projectDetails = {
  'news-aggregator': {
    title: 'News Aggregator AI',
    image: './photos/Top-News-Aggregator-Websites-scaled.png',
    description: 'An intelligent news aggregation platform that uses advanced AI to summarize articles, extract key insights, and provide interactive Q&A based on the content.',
    features: [
      'AI-powered article summarization using transformer models',
      'Interactive Q&A chatbot for news content exploration',
      'Real-time news processing and analysis',
      'Multi-source news aggregation',
      'Sentiment analysis and trend detection'
    ],
    technologies: ['Python', 'Flask', 'React', 'MongoDB', 'Transformers', 'NLTK', 'BeautifulSoup'],
    github: 'https://github.com/yourusername/news-aggregator-ai',
    demo: 'https://news-aggregator-ai-demo.netlify.app',
    live: 'https://news-aggregator-ai-demo.netlify.app'
  },
  'food-app': {
    title: 'Online Food Application',
    image: './photos/Screenshot (1111).png',
    description: 'A comprehensive food delivery platform with real-time order tracking, payment integration, and restaurant management system.',
    features: [
      'Real-time order tracking and notifications',
      'Secure payment gateway integration',
      'Restaurant and menu management',
      'User reviews and ratings system',
      'Responsive design for all devices'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Socket.io'],
    github: 'https://github.com/yourusername/food-delivery-app',
    demo: 'https://food-delivery-demo.herokuapp.com',
    live: 'https://food-delivery-demo.herokuapp.com'
  },
  'plant-disease': {
    title: 'Plant Disease Classifier',
    image: './photos/pro2.jpg',
    description: 'Machine learning application that identifies plant diseases from images with high accuracy using computer vision and deep learning.',
    features: [
      'Image-based disease detection using CNN',
      'Real-time classification with high accuracy',
      'Disease prevention recommendations',
      'Mobile-friendly interface',
      'Multi-plant species support'
    ],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'CNN', 'Keras'],
    github: 'https://github.com/yourusername/plant-disease-classifier',
    demo: 'https://plant-disease-classifier.streamlit.app',
    live: 'https://plant-disease-classifier.streamlit.app'
  },
  'ai-chatbot': {
    title: 'AI Chatbot',
    image: './photos/pro3.png',
    description: 'Intelligent chatbot using Dialogflow and LLM models for natural conversations and user assistance with contextual understanding.',
    features: [
      'Natural language processing and understanding',
      'Contextual conversation management',
      'Multi-platform integration capabilities',
      'Custom intent recognition',
      'Real-time response generation'
    ],
    technologies: ['Dialogflow', 'LLM', 'Flask', 'JavaScript', 'WebSocket', 'Node.js'],
    github: 'https://github.com/yourusername/ai-chatbot',
    demo: 'https://ai-chatbot-demo.vercel.app',
    live: 'https://ai-chatbot-demo.vercel.app'
  }
};

// Open project modal
function openProjectModal(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;

  const modalBody = document.getElementById('projectModalBody');
  modalBody.innerHTML = `
    <div class="project-modal-image">
      <img src="${project.image}" alt="${project.title}">
    </div>
    <div class="project-modal-details">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      
      <div class="project-modal-features">
        <h4>Key Features</h4>
        <ul>
          ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      
      <div class="project-modal-tech">
        <h4>Technologies Used</h4>
        <div class="tech-stack">
          ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
        </div>
      </div>
      
      <div class="project-actions" style="margin-top: 30px;">
        <a href="${project.github}" class="btn btn-outline" target="_blank">
          <i class="fab fa-github"></i> GitHub
        </a>
        <a href="${project.live}" class="btn" target="_blank">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      </div>
    </div>
  `;

  document.getElementById('projectModalTitle').textContent = project.title;
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Project card click handlers
document.querySelectorAll('[data-project]').forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const projectId = element.getAttribute('data-project');
    openProjectModal(projectId);
  });
});

// Close project modal
function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

projectModalClose.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', closeProjectModal);

// Close modal with Escape key for project modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

// ===== FORM SUBMISSION =====
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

// ===== MOUSE EFFECTS =====
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

// ===== INITIALIZE ALL EFFECTS =====
function initMouseEffects() {
  // Only initialize on non-mobile devices
  if (window.innerWidth > 768) {
    initCustomCursor();
    initSparkleEffect();
  }
  initParticles();
}

// Initialize effects when page loads
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  initMouseEffects();
});

// Prevent modal content click from closing modals
document.querySelectorAll('.cert-modal-content, .project-modal-content').forEach(content => {
  content.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});