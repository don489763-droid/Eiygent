// form.js - Newsletter form for Sthembiso
const NEWSLETTER_API = "https://script.google.com/macros/s/AKfycbxPcyulukt-wZdUgLRe5IoA7vqvFi3hJbwcH9M5jZkVfIhIxuVu7Ksi-ZAv5IDeVGSQ/exec";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const nameInput = document.getElementById("sub-name");
  const emailInput = document.getElementById("sub-email");
  const btn = document.getElementById("sub-btn");
  const msg = document.getElementById("sub-msg");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
      msg.textContent = "Please enter a valid email.";
      msg.style.color = "red";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Subscribing...";
    msg.textContent = "";

    try {
      const res = await fetch(NEWSLETTER_API, {
        method: "POST",
        body: JSON.stringify({ name: name, email: email })
      });

      const data = await res.json();
      msg.textContent = data.message || "Subscribed!";
      msg.style.color = "green";

      if (data.message === "Subscribed!") {
        form.reset();
      }
    } catch (err) {
      // Google saves it even if the response is blocked
      msg.textContent = "Subscribed! Check your Sheet.";
      msg.style.color = "green";
      form.reset();
    }

    btn.disabled = false;
    btn.textContent = "Subscribe";
  });
});
