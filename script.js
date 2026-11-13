const config = window.SROTA_SITE_CONFIG ?? {};
const form = document.querySelector('#waitlist-form');
const email = document.querySelector('#email');
const status = document.querySelector('#form-status');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  menu.querySelector('span').textContent = open ? '−' : '+';
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.click();
    menu.focus();
  }
});
function showStatus(message, state) {
  status.textContent = message;
  status.dataset.state = state;
}
form?.addEventListener('submit', async event => {
  event.preventDefault();
  email.value = email.value.trim();
  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    showStatus('Please enter a valid email address.', 'error');
    email.focus();
    return;
  }
  email.removeAttribute('aria-invalid');
  if (config.previewMode !== false || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:') {
    form.reset();
    showStatus('Preview complete. Your email has not been saved or submitted.', 'success');
    return;
  }
  const endpoint = config.waitlistEndpoint?.trim();
  if (!endpoint) {
    showStatus('Signups are not open yet. Please contact us at contact@srotabio.com.', 'error');
    return;
  }
  const button = form.querySelector('button[type=submit]');
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Submitting…';
  try {
    const response = await fetch(endpoint, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
    if (!response.ok) throw new Error('Signup unavailable');
    form.reset();
    showStatus('Thank you. Your interest has been received.', 'success');
  } catch {
    showStatus('We couldn’t save your interest. Please try again or email contact@srotabio.com.', 'error');
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
});
const calendarUrl = config.calendarUrl?.trim();
if (calendarUrl) {
  document.querySelectorAll('[data-book-call]').forEach(block => {
    block.querySelector('a').href = calendarUrl;
    block.hidden = false;
  });
}
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const name = contactForm.elements.name;
  const phone = contactForm.elements.phone;
  const mail = contactForm.elements.email;
  [name, phone, mail].forEach(field => {
    field.value = field.value.trim();
    field.removeAttribute('aria-invalid');
  });
  const phoneDigits = phone.value.replace(/\D/g, '');
  let invalid;
  if (!name.value) invalid = [name, 'Please enter your name.'];
  else if (!phone.value && !mail.value) invalid = [phone, 'Please share a phone number or an email address.'];
  else if (phone.value && (!/^\+?[\d\s()-]+$/.test(phone.value) || phoneDigits.length < 7 || phoneDigits.length > 15)) invalid = [phone, 'Please enter a valid phone number.'];
  else if (mail.value && !mail.validity.valid) invalid = [mail, 'Please enter a valid email address.'];
  if (invalid) {
    invalid[0].setAttribute('aria-invalid', 'true');
    showStatus(invalid[1], 'error');
    invalid[0].focus();
    return;
  }
  if (contactForm.elements._gotcha.value) return;
  if (config.previewMode !== false || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:') {
    contactForm.reset();
    showStatus('Preview complete. Your details have not been saved or submitted.', 'success');
    return;
  }
  const target = config.contactForm ?? {};
  if (!target.action?.trim()) {
    showStatus('This form is not open yet. Please contact us at contact@srotabio.com.', 'error');
    return;
  }
  const body = new URLSearchParams();
  body.append(target.fields.name, name.value);
  body.append(target.fields.phone, phone.value);
  body.append(target.fields.email, mail.value);
  const button = contactForm.querySelector('button[type=submit]');
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Sending…';
  try {
    // Google Forms does not send CORS headers, so the response cannot be read.
    await fetch(target.action.trim(), {method:'POST', mode:'no-cors', body});
    contactForm.reset();
    showStatus('Thank you. Our team will be in touch soon.', 'success');
  } catch {
    showStatus('We couldn’t send your details. Please try again or email contact@srotabio.com.', 'error');
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
});
