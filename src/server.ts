import "./workers";

import http from "http";
import { initializeSocket } from "./realtime/socket";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("OK");
    return;
  }

  res.writeHead(200);
  res.end("Pulse Monitor Backend");
});

async function bootstrap() {
  await initializeSocket(server);

  const port = Number(
    process.env.PORT ||
    process.env.SOCKET_PORT ||
    3001
  );

  server.listen(port, () => {
    console.log(`🚀 Backend running on ${port}`);
  });
}

bootstrap();