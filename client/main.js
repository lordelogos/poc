import { ResendClient } from "package";

const apiKey = ""; // replace with api key from https://resend.com
const resend = new ResendClient(apiKey);

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const message = document.getElementById("message").value;
  const to = document.getElementById("to").value;
  const subject = document.getElementById("subject").value;

  resend.sendEmail({
    from: "Paul <onboarding@resend.dev>",
    to: [to],
    subject: subject,
    text: message,
  });

  return false;
}
