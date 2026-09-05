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
