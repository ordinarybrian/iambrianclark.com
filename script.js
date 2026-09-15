const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type=submit]");
  const data = Object.fromEntries(new FormData(form));

  button.disabled = true;
  status.textContent = "Sending…";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok && result.success) {
      status.textContent =
        "Thanks — your message is on its way. I'll get back to you soon.";
      form.reset();
    } else {
      status.textContent =
        result.message || "Something went wrong. Please try again.";
    }
    button.disabled = false;
  } catch (error) {
    // AJAX submission failed (network issue, CORS, ad-blocker, etc).
    // Fall back to a normal form POST so the message still goes through.
    status.textContent = "Sending…";
    form.submit();
  }
});
