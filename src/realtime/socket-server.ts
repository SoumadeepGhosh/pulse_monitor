import http from "http";
import { initializeSocket } from "./socket";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("OK");
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("Socket Server Running");
});

async function bootstrap() {
  await initializeSocket(server);

  const port = Number(
    process.env.PORT ||
    process.env.SOCKET_PORT ||
    3001
  );

  server.listen(port, () => {
    console.log(
      `Socket server running on ${port}`
    );
  });
}

bootstrap();