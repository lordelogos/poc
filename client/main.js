import { ResendClient } from "package";

// "re_SPwLEFTG_BQSyp3kMPnTEfKeFdL9ZDQLC"

const resend = new ResendClient("re_SPwLEFTG_BQSyp3kMPnTEfKeFdL9ZDQLC");

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const message = document.getElementById("message").value;

  resend.sendEmail({
    from: "Paul <onboarding@resend.dev>",
    to: ["paulehiks@gmail.com"],
    subject: "Test from Node",
    text: message,
  });

  return false;
}
