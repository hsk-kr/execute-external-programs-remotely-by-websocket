import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// Components
import ConnectionStatus from '../../components/ConnectionStatus';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  row-gap: 24px;
`;
const ConnectionFormWrapper = styled.div``;
const CommandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
const InputText = styled.input.attrs(() => ({
  type: 'text',
}))``;
const CommandBtn = styled.button``;
const Button = styled.button``;
const serverProtocol = process.env.SERVER_PROTOCOL;

const MainPage: React.FC = () => {
  const [serverAddress, setServerAddress] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const connected: boolean = socket && socket.readyState === socket.OPEN; // A connection state

  const handleRemoteCommandClick = useCallback(
    (command: string) => () => {
      if (socket.readyState !== socket.OPEN) return;

      socket.send(
        JSON.stringify({
          type: 'command',
          command,
        })
      );
    },
    [socket]
  );

  const handleConnect = useCallback(() => {
    // If the socket is already connected, it closes the connection.
    if (socket !== undefined && socket.OPEN === socket.readyState) {
      socket.close();
      setSocket(undefined);
    }
    try {
      // Connect to the server
      const newSocket = new W3CWebSocket(
        `ws://${serverAddress}`,
        serverProtocol
      );

      newSocket.onerror = () => alert('Failed to connect to the server.');
      newSocket.onopen = () => {
        newSocket.onclose = () => {
          alert('Connection has been closed.');
          setSocket(undefined);
        };

        setSocket(newSocket);
      };
    } catch (e: Error) {
      console.log(e);
      alert('Please, check the server address.');
    }
  }, [serverAddress]);

  return (
    <Container>
      <ConnectionFormWrapper>
        <InputText
          placeholder="server address"
          value={serverAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setServerAddress(e.target.value)
          }
          disabled={connected}
        />
        <Button onClick={handleConnect} disabled={connected}>
          connect
        </Button>
      </ConnectionFormWrapper>
      <CommandsWrapper>
        <ConnectionStatus connected={connected} />
        <CommandBtn
          disabled={!connected}
          onClick={handleRemoteCommandClick('open browser')}
        >
          Open Google
        </CommandBtn>
        <CommandBtn
          disabled={!connected}
          onClick={handleRemoteCommandClick('open command prompt')}
        >
          Open Command Prompt
        </CommandBtn>
        <CommandBtn
          disabled={!connected}
          onClick={handleRemoteCommandClick('open task manager')}
        >
          Open Task Manager
        </CommandBtn>
      </CommandsWrapper>
    </Container>
  );
};

export default MainPage;
