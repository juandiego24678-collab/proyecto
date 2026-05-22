// ========================================
// iOS 26 Liquid Glassy Style - CoWorkTech
// JavaScript Interactions
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Navbar Scroll Effect
  // ========================================
  const navbar = document.querySelector('.navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // ========================================
  // Smooth Scroll for Navigation Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // Intersection Observer for Animations
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all glass cards and section headers
  document.querySelectorAll('.glass-card, .section-header, .floating-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });
  
  // Add animate-in styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // ========================================
  // Parallax Effect on Blobs
  // ========================================
  let ticking = false;
  
  function updateBlobParallax() {
    const scrollY = window.scrollY;
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.02;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateBlobParallax);
      ticking = true;
    }
  });
  
  // ========================================
  // Form Handling
  // ========================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
      };
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="0">
            <animate attributeName="stroke-dashoffset" values="0;120" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
        Enviando...
      `;
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          ¡Mensaje enviado!
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #34C759, #30D158)';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 2000);
    });
  }
  
  // ========================================
  // Active Navigation Highlight
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
        });
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Add active nav link styles
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    .nav-links a.active {
      color: var(--text-light) !important;
    }
    .nav-links a.active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(navStyle);
  
  // ========================================
  // Hover Effect for Cards (3D Tilt)
  // ========================================
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
  
  // ========================================
  // Counter Animation for Stats
  // ========================================
  function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Observe stats for animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        const num = parseInt(text);
        
        if (!isNaN(num) && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target, num);
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
  
  // ========================================
  // Ripple Effect on Buttons
  // ========================================
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
  
  // ========================================
  // Typing Effect for Hero Title (Optional)
  // ========================================
  const gradientText = document.querySelector('.hero-title .gradient-text');
  if (gradientText) {
    const text = gradientText.textContent;
    gradientText.textContent = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        gradientText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Start typing after a small delay
    setTimeout(typeWriter, 500);
  }
  
  console.log('🚀 CoWorkTech - iOS 26 Liquid Glassy Style loaded successfully!');
});
