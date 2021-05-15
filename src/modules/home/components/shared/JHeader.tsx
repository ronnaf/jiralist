import React from 'react';
import styled from 'styled-components';
import { JRawDiv } from '../../../core/JRawDiv';
import { colors, H1, Regular } from '../../../core/Styles';

type Props = {
  displayName: string;
};

export const JHeader = (props: Props) => {
  return (
    <Header>
      <Logo>
        <H1 color={colors.background1}>jiralist</H1>
      </Logo>
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

const Logo = styled(JRawDiv)`
  padding: 8px;
`;
