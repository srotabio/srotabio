const form = document.querySelector("#waitlist-form");
const emailInput = document.querySelector("#email");
const statusMessage = document.querySelector("#form-status");
const submitButton = form?.querySelector('button[type="submit"]');
const endpoint = window.SROTA_SITE_CONFIG?.waitlistEndpoint?.trim() ?? "";
const themeColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-brand-primary")
  .trim();

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector('meta[name="theme-color"]').content = themeColor;

function setStatus(message, state = "") {
  statusMessage.textContent = message;

  if (state) {
    statusMessage.dataset.state = state;
  } else {
    delete statusMessage.dataset.state;
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  if (!emailInput.validity.valid) {
    setStatus("Please enter a valid email address.", "error");
    emailInput.focus();
    return;
  }

  if (!endpoint) {
    setStatus("Waitlist sign-ups are opening shortly. Please check back soon.", "error");
    console.warn("Add the waitlist endpoint in site-config.js before publishing.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Joining…";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Waitlist request failed with status ${response.status}`);
    }

    form.reset();
    setStatus("You’re on the list. We’ll be in touch when Srota Bio is ready.", "success");
  } catch (error) {
    console.error(error);
    setStatus("We couldn’t add you right now. Please try again in a moment.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Join the waitlist";
  }
});
