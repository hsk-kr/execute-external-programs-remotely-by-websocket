import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  connected: boolean;
}

const StyledConnectionStatus = styled.div<Props>`
  background-color: ${(props) => (props.connected ? '#3ae374' : '#eb4d4b')};
  color: white;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
`;

const ConnectionStatus: React.FC<Props> = (props: Props) => {
  return (
    <StyledConnectionStatus {...props}>
      {props.connected ? 'Connected' : 'Not Connected'}
    </StyledConnectionStatus>
  );
};

export default ConnectionStatus;
