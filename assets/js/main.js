(function() {
  "use strict";

  const headerToggleBtn = document.querySelector('.header-toggle');
  const scrollTop = document.querySelector('.scroll-top');
  const preloader = document.querySelector('#preloader');
  const selectTyped = document.querySelector('.typed');
  const navmenulinks = document.querySelectorAll('.navmenu a');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  function aosInit() {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
  }

  function navmenuScrollspy() {
    navmenulinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)
        ? document.querySelectorAll('.navmenu a.active').forEach(a => a.classList.remove('active')) || link.classList.add('active')
        : link.classList.remove('active');
    });
  }

  function saveFormData(formId) {
    const formData = {};
    document.getElementById(formId).querySelectorAll("input, textarea").forEach(input => formData[input.id] = input.value.trim());
    sessionStorage.setItem(formId, JSON.stringify(formData));
  }

  function loadFormData(formId) {
    const formData = JSON.parse(sessionStorage.getItem(formId) || "{}");
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.getElementById(key);
      if (input) input.value = value;
    });
  }

  function clearFormErrors(formId) {
    document.querySelectorAll(`#${formId} .is-invalid`).forEach(input => input.classList.remove("is-invalid"));
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }

  function handleFormSubmission(e, formId, calculateAverage = false) {
    e.preventDefault();
    let isValid = true;
    const inputs = document.querySelectorAll(`#${formId} input, #${formId} textarea`);
    const formData = {};

    inputs.forEach(input => {
      const value = input.value.trim();
      formData[input.id] = value;
      input.classList.remove("is-invalid");

      if (!value) {
        input.classList.add("is-invalid");
        isValid = false;
      } else if (input.type === "email" && !validateEmail(value)) {
        input.classList.add("is-invalid");
        isValid = false;
      } else if (input.id.includes("phone") && !validatePhone(value)) {
        input.classList.add("is-invalid");
        isValid = false;
      }
    });

    if (isValid) {
      saveFormData(formId);
      console.group("Form Data Submitted");
      Object.entries(formData).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      console.groupEnd();
      
      if (calculateAverage) {
        const nums = [formData.num1, formData.num2, formData.num3, formData.num4, formData.num5]
          .map(v => parseFloat(v) || 0);
        const average = (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
        alert(`Form submitted successfully! Average: ${average}`);
      } else {
        alert("Form submitted successfully!");
      }
    } else {
      alert("Please correct the errors and fill all required fields.");
    }
  }

  window.addEventListener('load', () => {
    headerToggleBtn.addEventListener('click', headerToggle);
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    if (preloader) preloader.remove();
    if (selectTyped) new Typed('.typed', { strings: selectTyped.getAttribute('data-typed-items').split(','), loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000 });
    navmenuScrollspy();
    aosInit();
  });

  document.addEventListener('scroll', toggleScrollTop);
  document.addEventListener('scroll', navmenuScrollspy);

  document.getElementById("contact-form").addEventListener("submit", e => handleFormSubmission(e, "contact-form"));
  document.getElementById("large-form").addEventListener("submit", e => handleFormSubmission(e, "large-form", true));

  const fullFormModal = document.getElementById("fullFormModal");
  if (fullFormModal) {
    fullFormModal.addEventListener("hidden.bs.modal", () => {
      clearFormErrors("large-form");
    });
  }

  document.getElementById("open-large-form").addEventListener("click", () => {
    new bootstrap.Modal(fullFormModal).show();
    loadFormData("large-form");
  });

  window.addEventListener("DOMContentLoaded", () => {
    loadFormData("contact-form");
    loadFormData("large-form");
  });

  window.addEventListener("beforeunload", () => sessionStorage.clear());

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    document.getElementById("theme-toggle").textContent = newTheme === "light" ? "Dark Mode" : "Light Mode";
  });
})();
