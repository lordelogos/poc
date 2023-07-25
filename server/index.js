import http from "http";
import https from "https";

const PORT = process.env.PORT || 9999;

async function reqListener(req, res) {
  const { url, method } = req;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (url === "/" && method === "GET") {
    res.end("Hello World");
  }

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (url === "/send-mail" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const authHeader = req.headers.authorization;
        const reqBody = body;
        const authToken = authHeader.split(" ")[1];

        // form the request options to resend api
        const options = {
          hostname: "api.resend.com",
          path: "/emails",
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Content-Length": reqBody.length,
          },
        };

        if (reqBody) {
          try {
            await makePostRequest(options, reqBody);
            res.end("Email sent");
            return;
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(err);
            return;
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end("Please provide a mail in the request body.");
          return;
        }
      } catch (error) {
        console.error("Error:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Internal server error" }));
      }
    });
  }
}

const server = http.createServer(reqListener);
server.listen(PORT, () => console.log("Server running on " + PORT));

function makePostRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        resolve(responseData);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}
