import React from 'react';
import styled from 'styled-components';
import { JLogo } from './JLogo';
import { Regular } from './Styles';

type Props = {
  displayName: string;
};

export const JHeader = (props: Props) => {
  return (
    <Header>
      <JLogo />
      <Regular>
        Hi, <b>{props.displayName}</b>!
      </Regular>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
