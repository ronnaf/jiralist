import React from 'react';
import styled from 'styled-components';
import { JRawDiv } from './JRawDiv';
import { colors, H1 } from './Styles';

type Props = {
  showTitle?: boolean;
};

export const JLogo = (props: Props) => {
  const { showTitle = true } = props;
  return <Logo>{showTitle && <H1 color={colors.background1}>jiralist</H1>}</Logo>;
};

const Logo = styled(JRawDiv)`
  padding: 8px;
`;
