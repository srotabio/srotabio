(() => {
  const form = document.querySelector('#clinicians-form');
  const { name, email, whatsapp, referral, otherReferral, _gotcha } = form.elements;
  const otherField = form.querySelector('[data-other-referral]');
  const button = form.querySelector('button[type=submit]');
  const status = document.querySelector('#clinicians-form-status');
  const heading = document.querySelector('#clinicians-form-heading');
  const message = document.querySelector('#clinicians-form-message');

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

    const target = window.SROTA_SITE_CONFIG?.clinicianInquiryForm;
    const endpoint = target?.action?.trim();
    if (!endpoint) {
      showStatus('Please send your inquiry to contact@srotabio.com.', 'error');
      return;
    }

    const { fields, referralChoices } = target;
    const body = new URLSearchParams({ [fields.name]: name.value });
    if (email.value) body.set(fields.email, email.value);
    if (whatsapp.value) body.set(fields.whatsapp, whatsapp.value);
    if (referral.value) {
      const choice = referralChoices[referral.value];
      const details = otherReferral.value.trim();
      if (choice) {
        body.set(fields.referral, choice);
      } else {
        const otherAnswer = referral.value === 'other'
          ? (details ? `Other: ${details}` : 'Other')
          : referral.value;
        body.set(fields.referral, '__other_option__');
        body.set(`${fields.referral}.other_option_response`, otherAnswer);
      }
    }

    showStatus('', '');
    button.disabled = true;
    button.textContent = 'Sending…';
    try {
      // Google Forms does not expose the response to scripts on this origin.
      const response = await fetch(endpoint, { method: 'POST', mode: 'no-cors', body });
      if (response.type !== 'opaque' && !response.ok) throw new Error('Inquiry unavailable');
      form.reset();
      form.remove();
      heading.textContent = 'Thank you for getting in touch!';
      message.textContent = 'Our team will reach out soon.';
      heading.focus();
    } catch {
      showStatus('We couldn’t send your details. Please try again or email contact@srotabio.com.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Get in touch';
    }
  });

  button.disabled = false;
})();
