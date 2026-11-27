(() => {
  const form = document.querySelector('#clinicians-form');
  const { name, email, whatsapp, referral, otherReferral, _gotcha } = form.elements;
  const otherField = form.querySelector('[data-other-referral]');
  const button = form.querySelector('button[type=submit]');
  const status = document.querySelector('#clinicians-form-status');

  function updateReferralField() {
    const selectedOther = referral.value === 'other';
    otherField.hidden = !selectedOther;
    otherReferral.disabled = !selectedOther;
  }

  function showStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
  }

  referral.addEventListener('change', updateReferralField);
  window.addEventListener('pageshow', updateReferralField);
  updateReferralField();

  const contactFields = [name, email, whatsapp];
  for (const field of contactFields) {
    field.addEventListener('input', () => {
      field.removeAttribute('aria-invalid');
      if (status.dataset.state === 'error') showStatus('', '');
    });
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled || _gotcha.value) return;

    for (const field of contactFields) {
      field.value = field.value.trim();
      field.removeAttribute('aria-invalid');
    }

    function showFieldError(field, message) {
      field.setAttribute('aria-invalid', 'true');
      showStatus(message, 'error');
      field.focus();
    }

    const phoneDigits = whatsapp.value.replace(/\D/g, '');
    if (!name.value) return showFieldError(name, 'Please enter your name.');
    if (!email.value && !whatsapp.value) {
      return showFieldError(email, 'Enter an email address or WhatsApp number.');
    }
    if (email.value && !email.validity.valid) {
      return showFieldError(email, 'Please enter a valid email address.');
    }
    if (whatsapp.value && (!/^\+?[\d\s()-]+$/.test(whatsapp.value) || phoneDigits.length < 7 || phoneDigits.length > 15)) {
      return showFieldError(whatsapp, 'Please enter a valid WhatsApp number.');
    }

    const endpoint = window.SROTA_SITE_CONFIG?.clinicianInquiryEndpoint?.trim();
    if (!endpoint) {
      showStatus('Please send your inquiry to contact@srotabio.com.', 'error');
      return;
    }

    const body = new URLSearchParams({
      name: name.value,
      email: email.value,
      whatsapp: whatsapp.value,
    });
    if (referral.value) body.set('referral', referral.value);
    if (!otherReferral.disabled && otherReferral.value.trim()) {
      body.set('otherReferral', otherReferral.value.trim());
    }

    showStatus('', '');
    button.disabled = true;
    button.textContent = 'Sending…';
    try {
      const response = await fetch(endpoint, { method: 'POST', body });
      if (!response.ok) throw new Error('Inquiry unavailable');
      form.reset();
      updateReferralField();
      showStatus('Thank you. Our team will be in touch soon.', 'success');
    } catch {
      showStatus('We couldn’t send your details. Please try again or email contact@srotabio.com.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Get in touch';
    }
  });

  button.disabled = false;
})();
