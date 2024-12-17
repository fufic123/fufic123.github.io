function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }
  
  function saveFormData(formId) {
    const formData = {};
    const inputs = document.querySelectorAll(`#${formId} input, #${formId} textarea`);
  
    inputs.forEach(input => {
      formData[input.id] = input.value.trim();
    });
  
    sessionStorage.setItem(formId, JSON.stringify(formData));
  }
  
  function loadFormData(formId) {
    const formData = JSON.parse(sessionStorage.getItem(formId) || "{}");
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.getElementById(key);
      if (input) input.value = value;
    });
  }
  
  function handleFormSubmission(event, formId, calculateAverage = false) {
    event.preventDefault();
  
    const form = document.getElementById(formId);
    const inputs = document.querySelectorAll(`#${formId} input, #${formId} textarea`);
    const formData = {};
    let isValid = true;
  
    inputs.forEach(input => {
      const value = input.value.trim();
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
  
      formData[input.id] = value;
    });
  
    if (isValid) {
      saveFormData(formId);
      console.table(formData);
  
      if (calculateAverage) {
        const nums = Object.values(formData).map(v => parseFloat(v) || 0);
        const average = (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
        alert(`Form submitted successfully! Average: ${average}`);
      } else {
        alert("Form submitted successfully!");
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    ["contact-form", "large-form"].forEach(formId => loadFormData(formId));
  
    const contactForm = document.getElementById("contact-form");
    const largeForm = document.getElementById("large-form");
  
    if (contactForm) {
      contactForm.addEventListener("submit", e => handleFormSubmission(e, "contact-form"));
    }
  
    if (largeForm) {
      largeForm.addEventListener("submit", e => handleFormSubmission(e, "large-form", true));
    }
  
  });
  