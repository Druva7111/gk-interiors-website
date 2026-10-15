/* ==========================================================================
   G K INTERIORS — INTERACTIVE ENGINE & UI LOGIC
   Location: Official Colony, Srikakulam, Andhra Pradesh
   Phone: 08128838159
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `
          <svg class="svg-icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        `;
      } else {
        mobileNav.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.innerHTML = `
          <svg class="svg-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        `;
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `
          <svg class="svg-icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        `;
      });
    });
  }

  // 2. Sticky Header Elevation on Scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.backgroundColor = 'rgba(250, 248, 245, 0.96)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(250, 248, 245, 0.92)';
    }
  });

  // 3. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Lightbox Modal for Portfolio Details
  const portfolioModal = document.getElementById('portfolioModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');

  portfolioItems.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('img').src;
      const title = card.getAttribute('data-title') || 'Interior Design Concept';
      const category = card.getAttribute('data-category-name') || 'Design Concept';
      const desc = card.getAttribute('data-description') || 'Custom interior execution concept designed for optimal space planning, premium materials, and aesthetic harmony in Srikakulam.';

      if (modalImage && modalTitle && portfolioModal) {
        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDesc.textContent = desc;

        portfolioModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && portfolioModal) {
    modalClose.addEventListener('click', closeModal);
    portfolioModal.addEventListener('click', (e) => {
      if (e.target === portfolioModal) closeModal();
    });
  }

  function closeModal() {
    if (portfolioModal) {
      portfolioModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  // 5. Consultation Booking Modal Toggle
  const consultationModal = document.getElementById('consultationModal');
  const consultationClose = document.getElementById('consultationClose');
  const consultationTriggers = document.querySelectorAll('.trigger-consultation');

  consultationTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultationModal) {
        consultationModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (consultationClose && consultationModal) {
    consultationClose.addEventListener('click', () => {
      consultationModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        consultationModal.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 6. Form Validation & WhatsApp Lead Pre-filler
  const mainForm = document.getElementById('consultationForm');
  const modalForm = document.getElementById('modalConsultationForm');

  if (mainForm) handleFormSubmission(mainForm);
  if (modalForm) handleFormSubmission(modalForm, consultationModal);

  function handleFormSubmission(formElement, parentModal = null) {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = formElement.querySelector('[name="name"]');
      const phoneInput = formElement.querySelector('[name="phone"]');
      const projectTypeSelect = formElement.querySelector('[name="projectType"]');
      const messageInput = formElement.querySelector('[name="message"]');

      let isValid = true;

      // Reset errors
      formElement.querySelectorAll('.form-error').forEach(err => err.classList.remove('active'));

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      }

      // Validate Phone (10 digits expected or non-empty)
      const phoneClean = phoneInput.value.replace(/\D/g, '');
      if (!phoneClean || phoneClean.length < 10) {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
      }

      // Validate Project Type
      if (!projectTypeSelect.value) {
        showError(projectTypeSelect, 'Please select your project type');
        isValid = false;
      }

      if (isValid) {
        // Construct WhatsApp message pre-fill
        const formattedMsg = `*New Interior Consultation Enquiry*\n` +
          `👤 Name: ${nameInput.value.trim()}\n` +
          `📞 Phone: ${phoneInput.value.trim()}\n` +
          `📐 Project Type: ${projectTypeSelect.value}\n` +
          `💬 Details: ${messageInput ? messageInput.value.trim() || 'Requesting a callback & consultation.' : 'Requesting a callback.'}\n` +
          `📍 Location: Srikakulam`;

        const waUrl = `https://wa.me/919866484800?text=${encodeURIComponent(formattedMsg)}`;

        // Trigger notification & redirect
        showToast('Thank you! Redirecting your enquiry to G K Interiors on WhatsApp...');
        
        if (parentModal) {
          parentModal.classList.remove('open');
          document.body.style.overflow = 'auto';
        }

        formElement.reset();

        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1000);
      }
    });
  }

  function showError(inputElement, message) {
    const parent = inputElement.parentElement;
    let errorElem = parent.querySelector('.form-error');
    if (!errorElem) {
      errorElem = document.createElement('div');
      errorElem.className = 'form-error';
      parent.appendChild(errorElem);
    }
    errorElem.textContent = message;
    errorElem.classList.add('active');
  }

  // 7. Toast Notification Utility
  const toast = document.getElementById('toastNotification');
  function showToast(message) {
    if (toast) {
      toast.querySelector('.toast-msg').textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  // 8. Testimonial Client Feedback Modal trigger
  const addReviewBtn = document.getElementById('addReviewBtn');
  if (addReviewBtn) {
    addReviewBtn.addEventListener('click', () => {
      showToast('Thank you! If you are a client of G K Interiors, please call 08128838159 to submit your review.');
    });
  }
});
