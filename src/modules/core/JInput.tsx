import React from 'react';
import styled from 'styled-components';
import { JRawDiv } from './JRawDiv';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const JInput = (props: Props) => {
  return (
    <JRawDiv>
      <RawInput {...props} />
    </JRawDiv>
  );
};

const RawInput = styled.input`
  all: unset;
  outline: none;
`;
