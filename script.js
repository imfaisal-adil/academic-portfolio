// ==========================================
// 1. THEME TOGGLE (DARK / LIGHT)
// ==========================================
const themeBtn = document.getElementById('themeBtn');
const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

if (themeBtn && themeIcon) {
  // Load saved theme if any
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'bi bi-moon-stars-fill';
  }

  themeBtn.onclick = function () {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeIcon.className = 'bi bi-moon-stars-fill';
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.className = 'bi bi-sun-fill';
      localStorage.setItem('theme', 'dark');
    }
  };
}

// ==========================================
// 2. SCROLL PROGRESS BAR
// ==========================================
const progressBar = document.querySelector('.scroll-progress-bar');
if (progressBar) {
  window.onscroll = function () {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = progress + '%';

    // Show/hide Back To Top button
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };
}

// ==========================================
// 3. BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
  backToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// ==========================================
// 4. RANDOM MATH CAPTCHA & FORM VALIDATION
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const captchaQuestion = document.getElementById('captchaQuestion');
  const captchaInput = document.getElementById('captchaInput');
  const feedbackArea = document.getElementById('formFeedbackArea');
  let correctAnswer = 0;

  // Generate simple math question
  function makeMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    if (captchaQuestion) captchaQuestion.textContent = num1 + ' + ' + num2;
    if (captchaInput) captchaInput.value = '';
  }

  makeMathQuestion();

  // Validate on submit
  contactForm.onsubmit = function (e) {
    e.preventDefault();

    // const name = document.getElementById('f-name');
    // const email = document.getElementById('f-email');
    const userMath = parseInt(captchaInput.value, 10);
    const formInputs = contactForm.querySelectorAll('.form-control');

    // 1. Check empty inputs and highlight them in red with req-alart
    let hasEmpty = false;
    formInputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('req-alart');
        hasEmpty = true;
      } else {
        input.classList.remove('req-alart');
      }
    });

    if (hasEmpty) {
      feedbackArea.innerHTML = '<div class="alert alert-danger">Please fill in all required fields!</div>';
      return;
    }

    // 2. Check math answer
    if (userMath !== correctAnswer) {
      feedbackArea.innerHTML = '<div class="alert alert-danger">Wrong math answer! Try again.</div>';
      captchaInput.classList.add('req-alart');
      makeMathQuestion();
      return;
    }

    // 3. Success
    formInputs.forEach(input => input.classList.remove('req-alart'));
    feedbackArea.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
    contactForm.reset();
    makeMathQuestion();
  };
}