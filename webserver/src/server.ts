import websocket, { server as WebSocketServer } from 'websocket';
import * as dotenv from 'dotenv';
import Client from './client';

const serverProtocol = process.env.SERVER_PROTOCOL || 'dev';

class Server {
  clnts: Client[] = [];

  constructor(servSocket: WebSocketServer) {
    servSocket.on('request', (request: websocket.request) => {
      if (request.requestedProtocols.indexOf(serverProtocol) === -1) {
        request.reject();
      }

      const clntSock = request.accept(serverProtocol, request.origin);
      console.log(`${new Date()} connection accepted.`);

      this.clnts.push(new Client(request, clntSock, this));
    });
  }

  /**
   * Remove a client in the client list
   * @param clntToRemove Client to remove
   */
  removeClntInList(clntToRemove: Client) {
    this.clnts = this.clnts.filter((clnt: Client) => clntToRemove !== clnt);
  }
}

export default Server;
