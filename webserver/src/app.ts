import { server as WebSocketServer } from 'websocket';
import http from 'http';
import * as dotenv from 'dotenv';
import Server from './server';

dotenv.config(); // Load .env file

const serverPort = parseInt(process.env.SERVER_PORT || '8080', 10);

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});

server.listen(serverPort, () => {
  console.log(`${new Date()} Server is listening on port ${serverPort}`);
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

new Server(wsServer);
