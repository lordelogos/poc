import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  const authHeader = req.headers.authorization;
  const reqBody = req.body;
  const authToken = authHeader.split(" ")[1];
  let resend;

  try {
    resend = new Resend(authToken);
  } catch (err) {
    res.status(403).send("Enter a valid api key");
    return;
  }

  if (reqBody) {
    try {
      await resend.emails.send(reqBody);
      res.status(200).send("Email sent");
      return;
    } catch (err) {
      res.status(500).send(err);
      return;
    }
  } else {
    res.status(400).send("Please provide a mail in the request body.");
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
