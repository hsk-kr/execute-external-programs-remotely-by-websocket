import websocket from 'websocket';
import Server from './server';
import { openProgram } from './command';

type CommandData = {
  type: string;
  command: string;
};

class Client {
  server: Server | undefined = undefined;
  request: websocket.request | undefined = undefined;
  socket: websocket.connection | undefined = undefined;

  constructor(
    request: websocket.request,
    socket: websocket.connection,
    server: Server
  ) {
    this.server = server;
    this.socket = socket;
    this.request = request;

    socket.on('close', () => {
      this.server?.removeClntInList(this);
      console.log(`${new Date()} Peer ${socket.remoteAddress} disconnected.`);
    });

    socket.on('message', this._receive);
  }

  _receive(data: websocket.IMessage) {
    if (data.type !== 'utf8' || !data.utf8Data) return;

    try {
      const parsedData: CommandData = JSON.parse(data.utf8Data) as CommandData;

      switch (parsedData.type) {
        case 'command':
          openProgram(parsedData.command);
          break;
      }
    } catch (err: any) {
      console.log(err);
    }
  }
}

export default Client;
