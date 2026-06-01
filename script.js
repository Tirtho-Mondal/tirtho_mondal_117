/* =========================================================
   ACADEMIC PORTFOLIO — script.js
   All interactive features in vanilla JavaScript
   Performance-optimized with consolidated event handlers
   ========================================================= */

'use strict';

/* ─── UTILITIES ──────────────────────────────────────── */
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobile = () => window.innerWidth <= 768;

function debounce(fn, ms) {
  let t;
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), ms);
  };
}

/* ─── PROJECT DATA ───────────────────────────────────── */
const projectData = [
  {
    title: "Smart Navigation for the Visually Impaired",
    category: "Research & ML",
    problem: "Visually impaired individuals face high barriers to safe, independent indoor and outdoor mobility due to the cost and complexity of existing assistive technologies.",
    description: "Co-authored research and designed a portable navigation system that combines real-time computer vision object detection and sensor fusion. Developed multimodal output pipelines using custom audio alerts and haptic vibration feedback patterns to guide users safely.",
    outcome: "Published as an arXiv preprint. The prototype successfully demonstrated high accuracy in obstacle detection and low latency in generating tactile warnings.",
    tech: ["Python", "Flutter", "OpenCV", "Sensor Fusion", "Deep Learning"],
    github: "https://github.com/Tirtho-Mondal/Navigation-Systems-for-the-Visually-Impaired",
    demo: "https://arxiv.org/abs/2504.20976",
    videoId: "VIDEO_ID_NAVIGATION"
  },
  {
    title: "TutorFinder",
    category: "Web & App Dev",
    problem: "Students and guardians struggle to find verified, qualified local tutors matching specific subjects, budget ranges, and academic boards.",
    description: "Developed a comprehensive web portal connecting students with qualified tutors. Built secure user authentication, tutor profiles with qualifications review, search/filtering options based on location/subject, and an administrative dashboard to manage verification statuses.",
    outcome: "Fully functional platform with optimized database querying, reducing search times and streamlining tutoring coordination.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    github: "https://github.com/Tirtho-Mondal/TutorFinder.git",
    demo: null,
    videoId: "VIDEO_ID_TUTORFINDER"
  },
  {
    title: "HouseHold Services",
    category: "Web & App Dev",
    problem: "Hiring reliable local service providers (plumbing, cleaning, electrical) is offline-heavy and lacks transparent scheduling or pricing.",
    description: "Co-designed and developed a robust Android app for booking domestic services. Features a smooth customer ordering interface, service provider admin panels, database integrations with SQLite, and local caching for offline browsing.",
    outcome: "Completed as part of a software project coursework, demonstrating strong understanding of mobile app development lifecycles and offline database management.",
    tech: ["Android SDK", "Java", "SQLite", "Git", "XML"],
    github: "https://github.com/azhar2007112/HouseHold_Services",
    demo: null,
    videoId: "VIDEO_ID_HOUSEHOLD"
  },
  {
    title: "CSE Family",
    category: "Web & App Dev",
    problem: "A lack of a centralized, user-friendly desktop application for students in the CSE department to share files, review past papers, and communicate.",
    description: "Designed a modular JavaFX desktop app utilizing object-oriented principles. Implemented an interactive dashboard for category-wise academic resource distribution, dynamic discussion boards, and styled interface themes.",
    outcome: "Successfully completed class project that serves as a desktop-native hub for collaborative student resources.",
    tech: ["JavaFX", "Java", "CSS", "OOP Layouts"],
    github: "https://github.com/Tirtho-Mondal/CSE-Family/tree/master",
    demo: null,
    videoId: "VIDEO_ID_CSE_FAMILY"
  },
  {
    title: "MobiCash",
    category: "Database & Systems",
    problem: "Simulating high-stakes financial ledger systems requires robust OOP structure to handle transaction safety, balance check limits, and user authentication.",
    description: "Created a command-line mobile banking simulation demonstrating advanced C++ object-oriented design. Modeled cash transactions, mobile recharges, agent transfers, and administrative verification logs with clean, decoupled logic.",
    outcome: "Created a bug-free, terminal-based simulation showing robust handling of edge cases in banking workflows.",
    tech: ["C++", "OOP Paradigms", "Systems Simulation"],
    github: "https://github.com/Tirtho-Mondal/MobiCash",
    demo: "https://youtu.be/rMoXmBDAlz0?si=1W39E8BGkh6bgzVn",
    videoId: "rMoXmBDAlz0"
  },
  {
    title: "Laundry Shop Management",
    category: "Database & Systems",
    problem: "Manual tracking of customer orders, item processing states, delivery statuses, and billing creates operational friction and invoicing errors.",
    description: "Designed and normalized a relational database system for laundry shop operations. Created tables for client tracking, staff duties, processing steps, and pricing configurations, writing optimized SQL queries for daily revenue reporting.",
    outcome: "Demonstrated database design proficiency by establishing an optimized database schema that prevents redundant records and calculates invoices dynamically.",
    tech: ["SQL", "MySQL", "Relational Database Design"],
    github: "https://github.com/Tirtho-Mondal/Laundry-Shop-Management.git",
    demo: null,
    videoId: "VIDEO_ID_LAUNDRY"
  },
  {
    title: "3D Cafeteria Simulation",
    category: "Graphics Simulation",
    problem: "Creating an immersive graphics simulation requires realistic lighting, texture mapping, and scene animation for a campus environment.",
    description: "Built an interactive OpenGL-powered cafeteria simulation with textured 3D models, dynamic lighting, and animated scene elements to showcase graphics programming skills.",
    outcome: "Delivered a polished simulation that highlights proficiency in computer graphics, scene rendering, and real-time animation techniques.",
    tech: ["C++", "OpenGL", "Graphics", "Simulation"],
    github: "https://github.com/Tirtho-Mondal/3D_Cafeteria",
    demo: "https://youtu.be/Wd2I3ZZhzAI?si=of9__xYApaOvIg0f",
    videoId: "Wd2I3ZZhzAI"
  },
  {
    title: "Adaptive UDP Congestion Control",
    category: "Network Systems",
    problem: "UDP network simulations need intelligent packet-size adaptation to minimize loss during congestion while maintaining consistent throughput across variable network conditions.",
    description: "Developed a genetic algorithm-based adaptive mechanism for UDP packet sizing that analyzes real-time congestion feedback and dynamically adjusts transmission parameters. Implemented in OMNeT++ for comprehensive network simulation.",
    outcome: "Successfully demonstrated significant improvements in packet delivery ratio and throughput stability compared to fixed packet-size protocols under various congestion levels.",
    tech: ["C++", "OMNeT++", "Genetic Algorithm", "UDP", "Network Simulation"],
    github: "https://github.com/Tirtho-Mondal/Adaptive-UDP",
    demo: null,
    videoId: "VIDEO_ID_ADAPTIVE_UDP"
  },
  {
    title: "FPGA-Based Automatic Washing Machine",
    category: "Hardware & AI",
    problem: "Traditional washing machine control systems need better automation, timing accuracy, and safety on low-cost FPGA boards.",
    description: "Designed a Verilog-based Moore FSM controller for an automatic washing machine on the Basys 3 FPGA. Implemented cycle control, timer management, rinse/soap stages, and safety interlocks to prevent motor overloads.",
    outcome: "Demonstrated an end-to-end FSM design with a reliable automatic cycle, showing stable operations and clear state transitions on hardware.",
    tech: ["Verilog HDL", "FPGA", "Digital Logic", "FSM"],
    github: "https://github.com/Tirtho-Mondal/FPGA-Based-Automatic-Washing-Machine-Controller.git",
    demo: null,
    videoId: "VIDEO_ID_FPGA_WASHER"
  },
  {
    title: "Intelligent Bus Racing Simulation",
    category: "Research & ML",
    problem: "Traffic-routing and autonomous pathfinding remain challenging in multi-agent simulation environments.",
    description: "Built a Python-based racing simulation with intelligent bus agents using BFS/DFS pathfinding, Minimax decision-making, and fuzzy logic speed control. Designed the system to adapt to changing lane conditions and opponent behavior.",
    outcome: "Validated the simulation with improved route selection and competitive performance against baseline AI agents.",
    tech: ["Python", "Pygame", "AI", "Pathfinding", "Fuzzy Logic"],
    github: "https://github.com/souravdebnath109/Ai.git",
    demo: null,
    videoId: "VIDEO_ID_BUS_RACING"
  }
];

window.addEventListener('load', () => {
  // Trigger reveal for elements in viewport on load
  observeReveal();
  initResearchPublicationInteractions();
});

/* =========================================================
   2. THEME TOGGLE (Dark / Light)
   ========================================================= */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☾' : '☀';
  localStorage.setItem('portfolio-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* =========================================================
   3. CONSOLIDATED SCROLL HANDLER (rAF-throttled)
   ========================================================= */
const scrollBar = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id], main[id]');
const backToTop = document.getElementById('backToTop');

let scrollTicking = false;

function onScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Progress bar
  scrollBar.style.width = (docHeight > 0 ? (scrollY / docHeight) * 100 : 0) + '%';

  // Navbar glass
  navbar.classList.toggle('scrolled', scrollY > 40);

  // Active link
  let currentId = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 100) currentId = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${currentId}`);
  });

  // Back to top
  backToTop.classList.toggle('visible', scrollY > 500);

  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
}, { passive: true });

/* =========================================================
   5. MOBILE HAMBURGER MENU
   ========================================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
let savedScrollY = 0;

function toggleMenu(forceClose) {
  const willOpen = forceClose ? false : !navMenu.classList.contains('open');
  navMenu.classList.toggle('open', willOpen);
  hamburger.classList.toggle('open', willOpen);
  hamburger.setAttribute('aria-expanded', willOpen);
  if (willOpen) {
    savedScrollY = window.scrollY;
    document.body.classList.add('menu-open');
    document.body.style.top = `-${savedScrollY}px`;
  } else {
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScrollY);
  }
}

hamburger.addEventListener('click', () => toggleMenu());

navLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(true));
});

/* =========================================================
   6. TYPING ANIMATION
   ========================================================= */
const typingRoles = [
  'Research Enthusiast',
  'Software Developer',
  'Problem Solver',
  'Lifelong Learner',
  'CSE Student'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');
const typingSpeed = 80;
const deleteSpeed = 50;
const pauseTime = 1800;

function typeEffect() {
  const currentRole = typingRoles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % typingRoles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, deleteSpeed);
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
    setTimeout(typeEffect, typingSpeed);
  }
}

setTimeout(typeEffect, 1200);

/* =========================================================
   7. SCROLL REVEAL ANIMATION
   ========================================================= */
function observeReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const delay = siblings.indexOf(entry.target) * 60;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 300));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback
    revealEls.forEach(el => el.classList.add('visible'));
  }
}

function initResearchPublicationInteractions() {
  const researchCards = document.querySelectorAll('.research-card');
  researchCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('research-card--focus'));
    card.addEventListener('mouseleave', () => card.classList.remove('research-card--focus'));
    card.addEventListener('focus', () => card.classList.add('research-card--focus'));
    card.addEventListener('blur', () => card.classList.remove('research-card--focus'));
  });

  const publicationCards = document.querySelectorAll('.pub-card');
  publicationCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('pub-card--active'));
    card.addEventListener('mouseleave', () => card.classList.remove('pub-card--active'));
    card.addEventListener('focusin', () => card.classList.add('pub-card--active'));
    card.addEventListener('focusout', () => card.classList.remove('pub-card--active'));
  });
}

/* =========================================================
   8. ANIMATED COUNTERS
   ========================================================= */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = target % 1 !== 0 ? 1 : 0;
  const duration = 1800;
  const start = Date.now();

  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.counter');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(c => animateCounter(c));
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* =========================================================
   9. SKILL BAR ANIMATION
   ========================================================= */
const skillBars = document.querySelectorAll('.dash-progress-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.dataset.width;
      entry.target.style.width = target + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* =========================================================
   10. PROJECT FILTER
   ========================================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const detailBtn = card.querySelector('.project-detail-btn');
  const idx = parseInt(card.dataset.project);
  const project = projectData[idx];
  if (!detailBtn || !project) return;

  const actions = document.createElement('div');
  actions.className = 'project-card__actions';

  detailBtn.type = 'button';
  detailBtn.classList.add('project-detail-btn--enhanced');
  detailBtn.innerHTML = '<span aria-hidden="true">ℹ</span> View Details';

  const videoBtn = document.createElement('button');
  videoBtn.type = 'button';
  videoBtn.className = 'btn btn--sm project-video-btn';
  videoBtn.dataset.project = String(idx);
  videoBtn.innerHTML = '<span aria-hidden="true">▶</span> Video Demo';

  detailBtn.parentNode.insertBefore(actions, detailBtn);
  actions.appendChild(detailBtn);
  actions.appendChild(videoBtn);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);

      // Reset & re-animate visible cards
      if (show) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 60);
      }
    });
  });
});

/* =========================================================
   11. PROJECT MODAL
   ========================================================= */
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function getYouTubeId(videoValue) {
  if (!videoValue) return '';
  const value = String(videoValue).trim();
  const match = value.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : value;
}

function getYouTubeEmbedUrl(videoValue) {
  const videoId = getYouTubeId(videoValue);
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`;
}

function openModal(content, modifierClass = '') {
  modalContent.innerHTML = content;
  modalOverlay.className = `modal-overlay ${modifierClass}`.trim();
  modalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

document.querySelectorAll('.project-detail-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = parseInt(btn.dataset.project);
    const proj = projectData[idx];
    if (!proj) return;

    openModal(`
      <span class="modal-tag">${proj.category}</span>
      <h2>${proj.title}</h2>
      <h4>Problem Statement</h4>
      <p>${proj.problem}</p>
      <h4>Description</h4>
      <p>${proj.description}</p>
      <h4>Key Outcome</h4>
      <p>${proj.outcome}</p>
      <h4>Technologies Used</h4>
      <div class="modal-tech">${proj.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="modal-actions">
        ${proj.github ? `<a href="${proj.github}" class="btn btn--primary">⌥ GitHub</a>` : ''}
        ${proj.demo ? `<a href="${proj.demo}"   class="btn btn--secondary">${proj.demo === 'Preprint' ? '📄 Preprint' : proj.demo === 'Report' ? '📄 Report' : '▶ Live Demo'}</a>` : ''}
      </div>
    `);
  });
});

document.querySelectorAll('.project-video-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = parseInt(btn.dataset.project);
    const proj = projectData[idx];
    if (!proj) return;

    const isPlaceholder = !proj.videoId || proj.videoId.startsWith('VIDEO_ID_');
    const embedUrl = isPlaceholder ? '' : getYouTubeEmbedUrl(proj.videoId);

    openModal(`
      <span class="modal-tag">${proj.category}</span>
      <h2>${proj.title} Demo</h2>
      <div class="video-demo">
        ${embedUrl ? `
          <iframe
            src="${embedUrl}"
            title="${proj.title} video demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        ` : `
          <div class="video-demo__empty">
            <strong>Video demo link needed</strong>
            <p>Add this project's YouTube video ID in <code>projectData</code> as <code>videoId</code>. The modal is ready and will autoplay once a real ID is provided.</p>
          </div>
        `}
      </div>
      <div class="modal-actions video-demo__actions">
        ${proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener" class="btn btn--outline">GitHub</a>` : ''}
      </div>
    `, 'modal-overlay--video');
  });
});

function closeModal() {
  modalOverlay.style.display = 'none';
  modalOverlay.className = 'modal-overlay';
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.style.display === 'flex') closeModal();
});



/* =========================================================
   13. BibTeX COPY BUTTONS
   ========================================================= */
document.querySelectorAll('.bibtex-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const bibtex = btn.dataset.bibtex;
    if (!bibtex) return;

    navigator.clipboard.writeText(bibtex).then(() => {
      const original = btn.textContent;
      btn.textContent = '✅ Copied!';
      btn.style.color = '#16a34a';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.color = '';
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = bibtex;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = 'Copy BibTeX'; }, 2000);
    });
  });
});

/* =========================================================
   14. COPY EMAIL BUTTON (HUB VERSION)
   ========================================================= */
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailDisplay = document.getElementById('emailDisplay');

if (copyEmailBtn && emailDisplay) {
  copyEmailBtn.addEventListener('click', () => {
    const email = emailDisplay.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      // Success feedback
      const originalIcon = copyEmailBtn.innerHTML;
      copyEmailBtn.innerHTML = '✓';
      copyEmailBtn.classList.add('success');

      setTimeout(() => {
        copyEmailBtn.innerHTML = originalIcon;
        copyEmailBtn.classList.remove('success');
      }, 2500);
    });
  });
}

/* =========================================================
   15. LIVE LOCAL TIME WIDGET
   ========================================================= */
const timeDisplay = document.getElementById('localTime');
const dateDisplay = document.getElementById('localDate');

function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  if (timeDisplay) timeDisplay.textContent = time;
  if (dateDisplay) dateDisplay.textContent = date;
}

updateTime();
setInterval(updateTime, 1000);

/* =========================================================
   16. FAQ ACCORDION (PROFESSIONAL VERSION)
   ========================================================= */
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const trigger = card.querySelector('.faq-trigger');

  trigger.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    // Optional: Close other cards when one is opened (Accordion behavior)
    faqCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('open');
        c.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current card
    card.classList.toggle('open');
    trigger.setAttribute('aria-expanded', !isOpen);
  });
});

/* =========================================================
   17. CONTACT HUB FORM VALIDATION
   ========================================================= */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => showError(id, ''));
  ['formName', 'formEmail', 'formSubject', 'formMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error');
  });
}

function markError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  if (field) field.classList.add('error');
  showError(errorId, msg);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  // Live validation on blur
  contactForm.addEventListener('focusout', (e) => {
    const t = e.target;
    if (t.id === 'formName' && t.value.trim().length < 2) {
      markError('formName', 'nameError', 'Please enter your identity.');
    } else if (t.id === 'formName') {
      showError('nameError', '');
      t.classList.remove('error');
    }

    if (t.id === 'formEmail' && !validateEmail(t.value.trim())) {
      markError('formEmail', 'emailError', 'Please enter a valid return address.');
    } else if (t.id === 'formEmail') {
      showError('emailError', '');
      t.classList.remove('error');
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value;
    const message = document.getElementById('formMessage').value.trim();
    let valid = true;

    if (name.length < 2) {
      markError('formName', 'nameError', 'Please enter your full name (at least 2 characters).');
      valid = false;
    }

    if (!validateEmail(email)) {
      markError('formEmail', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject) {
      markError('formSubject', 'subjectError', 'Please select a subject for your inquiry.');
      valid = false;
    }

    if (message.length < 20) {
      markError('formMessage', 'messageError', 'Please write a message of at least 20 characters.');
      valid = false;
    }

    if (valid) {
      // Simulate sending (replace with actual form submission logic)
      const submitBtn = contactForm.querySelector('.glass-submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      
      btnText.textContent = 'Connecting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        formSuccess.style.display = 'flex';
        btnText.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 6000);
      }, 1500);
    }
  });
}

/* =========================================================
   18. BACK TO TOP BUTTON
   ========================================================= */
/* Back to top - scroll handled in consolidated handler above */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================================
   19. FOOTER YEAR
   ========================================================= */
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* =========================================================
   20. SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const offset = 78; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* =========================================================
   21. KEYBOARD TRAP FOR MODAL (Accessibility)
   ========================================================= */
document.addEventListener('keydown', (e) => {
  if (modalOverlay.style.display !== 'flex') return;

  if (e.key === 'Tab') {
    const focusable = modalOverlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});



/* =========================================================
   23. REDUCED MOTION DETECTION
   ========================================================= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Instantly show all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
    el.style.transition = 'none';
  });

  // Stop floating shapes
  document.querySelectorAll('.shape').forEach(s => {
    s.style.animation = 'none';
  });
}

/* =========================================================
   24. REAL LIFE ANIMATIONS (3D Tilt & Magnetic Buttons)
   ========================================================= */
if (!prefersReducedMotion && !isTouchDevice) {
  // 3D Tilt Effect on Cards (desktop only)
  const tiltElements = document.querySelectorAll('.project-card, .research-card, .achieve-card, .timeline__card, .info-card, .value-item, .profile-card, .learning-card, .dash-card, .dc-card, .dc-viewer');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      if (isMobile()) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt limits (max 6 degrees)
      const tiltX = ((y - centerY) / centerY) * -6;
      const tiltY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';

      // Dynamic light shadow
      const shadowX = (x - centerX) / 20 * -1;
      const shadowY = (y - centerY) / 20 * -1;
      el.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(15,36,68,0.12)`;
      el.style.zIndex = '10';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
      el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.zIndex = '1';
    });
  });

  // Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (isMobile()) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });

  // Real-Time Canvas Particle Network
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', debounce(resize, 200));
    resize();

    const mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      scrollVelocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy - (scrollVelocity * 0.4);
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        if (!isTouchDevice) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) { this.x -= dx * 0.02; this.y -= dy * 0.02; }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark ? 'rgba(74, 127, 212, 0.25)' : 'rgba(15, 36, 68, 0.15)';
        ctx.fill();
      }
    }

    // Reduce particles on mobile for performance
    const particleCount = isMobile() ? 20 : (window.innerWidth < 1024 ? 35 : 50);
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    const connectDist = isMobile() ? 90 : 130;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 1 - (distance / connectDist);
            // Reduced line visibility
            ctx.strokeStyle = isDark ? `rgba(74, 127, 212, ${alpha * 0.2})` : `rgba(15, 36, 68, ${alpha * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Smoothly decay scroll velocity
      scrollVelocity *= 0.9;

      requestAnimationFrame(animate);
    }

    animate();
  }
}

/* =========================================================
   14. DOCUMENT CENTER INTERACTIVITY
   ========================================================= */
const dcCards = document.querySelectorAll('.dc-card');
const docFrame = document.getElementById('documentFrame');
const viewerLoading = document.getElementById('viewerLoading');
const requestOverlay = document.getElementById('requestOverlay');
const tabTitle = document.getElementById('dcViewerTabTitle');

if (dcCards.length > 0 && docFrame) {
  dcCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active from all
      dcCards.forEach(c => c.classList.remove('active'));
      // Add active to clicked
      card.classList.add('active');

      const docType = card.dataset.doc;

      if (docType === 'cv') {
        // Hide overlay, update title, load CV
        if (requestOverlay) requestOverlay.style.display = 'none';
        if (tabTitle) {
          tabTitle.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="margin-right: 8px;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            Tirtho_Mondal_CV.pdf
          `;
        }
        docFrame.style.display = 'block';
        viewerLoading.style.opacity = '1';
        viewerLoading.style.visibility = 'visible';
        docFrame.classList.remove('loaded');
        docFrame.src = 'Tirtho Mondal.pdf';
      } else {
        // Show unavailable overlay, hide iframe
        docFrame.style.display = 'none';
        viewerLoading.style.opacity = '0';
        viewerLoading.style.visibility = 'hidden';
        if (requestOverlay) {
          requestOverlay.style.display = 'flex';
          const overlayTitle = requestOverlay.querySelector('h3');
          const overlayDesc = requestOverlay.querySelector('p');
          if (docType === 'resume') {
            if (overlayTitle) overlayTitle.textContent = 'Industry Resume';
            if (overlayDesc) overlayDesc.textContent = 'This document is available upon request for verification purposes.';
          } else if (docType === 'transcript') {
            if (overlayTitle) overlayTitle.textContent = 'Academic Transcript';
            if (overlayDesc) overlayDesc.textContent = 'Official transcripts from Khulna University of Engineering & Technology are available upon request.';
          }
        }
        if (tabTitle) {
          const docName = docType === 'resume' ? 'Industry_Resume.pdf' : 'KUET_Transcript.pdf';
          tabTitle.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="margin-right: 8px;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            ${docName} (Request Access)
          `;
        }
      }
    });
  });

  docFrame.addEventListener('load', () => {
    if (docFrame.style.display !== 'none') {
      viewerLoading.style.opacity = '0';
      setTimeout(() => {
        viewerLoading.style.visibility = 'hidden';
      }, 500);
      docFrame.classList.add('loaded');
    }
  });
}

/* =========================================================
   15. DOCUMENT INTELLIGENCE DASHBOARD
   ========================================================= */
const dicDashboard = document.querySelector('[data-dic-dashboard]');

if (dicDashboard) {
  const dicSearch = document.getElementById('dicSearch');
  const dicItems = document.querySelectorAll('[data-dic-item]');
  const dicFolders = document.querySelectorAll('.dic-tree-folder');
  const dicEmpty = document.getElementById('dicEmpty');
  const dicPdfFrame = document.getElementById('dicPdfFrame');
  const dicPreviewTitle = document.getElementById('dicPreviewTitle');
  const dicPreviewType = document.getElementById('dicPreviewType');
  const dicOpenPdf = document.getElementById('dicOpenPdf');

  function getItemSearchText(item) {
    return [
      item.dataset.title,
      item.dataset.type,
      item.dataset.pdf
    ].join(' ').toLowerCase();
  }

  function openDicDocument(item) {
    if (!item) return;

    dicItems.forEach(card => card.classList.remove('active'));
    item.classList.add('active');

    const title = item.dataset.title || 'Document';
    const type = item.dataset.type || 'PDF';
    const pdf = item.dataset.pdf || 'Tirtho Mondal.pdf';

    if (dicPreviewTitle) dicPreviewTitle.textContent = title;
    if (dicPreviewType) dicPreviewType.textContent = type;
    if (dicOpenPdf) dicOpenPdf.href = pdf;
    if (dicPdfFrame && dicPdfFrame.getAttribute('src') !== pdf) dicPdfFrame.src = pdf;
  }

  function filterDicItems() {
    const query = (dicSearch?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    dicItems.forEach(item => {
      const show = !query || getItemSearchText(item).includes(query);
      item.hidden = !show;
      if (show) visibleCount += 1;
    });

    dicFolders.forEach(folder => {
      const hasVisibleItems = folder.querySelectorAll('[data-dic-item]:not([hidden])').length > 0;
      folder.hidden = !hasVisibleItems;
      if (query && hasVisibleItems) folder.open = true;
    });

    if (dicEmpty) dicEmpty.hidden = visibleCount > 0;

    const activeItem = document.querySelector('[data-dic-item].active:not([hidden])');
    const firstVisible = document.querySelector('[data-dic-item]:not([hidden])');
    if (!activeItem && firstVisible) openDicDocument(firstVisible);
  }

  dicItems.forEach(item => {
    item.addEventListener('mouseenter', () => openDicDocument(item));
    item.addEventListener('focus', () => openDicDocument(item));
    item.addEventListener('click', () => openDicDocument(item));
  });

  if (dicSearch) {
    dicSearch.addEventListener('input', debounce(filterDicItems, 120));
  }
}

/* =========================================================
   END OF SCRIPT
   ========================================================= */
console.log(
  '%cAcademic Portfolio%c\nBuilt with care and academic intent.',
  'color: #0f2444; font-size: 1.2em; font-weight: bold;',
  'color: #4b5563; font-size: 0.9em;'
);
