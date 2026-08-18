import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 80;

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      console.log(chunk);

      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Create the HTTP server
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(method, url);

  // Favicon (Real Vector SVG)
  if (url === "/favicon.svg" && method === "GET") {
    const svgVector = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
        <!-- Background circle -->
        <circle cx="12" cy="12" r="11" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Accelerate / Lightning vector path -->
        <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" fill="#38bdf8" stroke="#38bdf8" stroke-width="0.5" stroke-linejoin="round"/>
      </svg>
    `.trim();

    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(svgVector);
    return;
  }

  // Frontend Single Page
  if (url === "/" && method === "GET") {
    const filePath = path.join(__dirname, "public", "index.html");
    fs.readFile(filePath, "utf8", (err, htmlContent) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error: Could not read index.html");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    });
    return;
  }

  // GET API
  if (url === "/api/status" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Server is running",
        moduleType: "ES Modules (import/export)",
        time: new Date().toLocaleTimeString(),
        uptimeSeconds: Math.floor(process.uptime()),
      }),
    );
    return;
  }

  // POST API
  if (url === "/api/message" && method === "POST") {
    try {
      const data = await getRequestBody(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          messageReceived: data.message,
          receivedAt: new Date().toISOString(),
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON body" }));
    }
    return;
  }

  // 5. Default 404 handler
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

// Start listening
server.listen(PORT, "::1", () => {
  console.log(`Server is running at http://::1:${PORT}/`);
});
