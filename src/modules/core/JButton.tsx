import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';
import { SizedBox } from './SizedBox';
import { colors, H1 } from './Styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const JButton = (props: Props) => {
  const { title, ...buttonProps } = props;
  return (
    <Button {...buttonProps}>
      <H1 transform="uppercase">{props.title}</H1>
      <SizedBox width={4} />
      <BsArrowRight color={colors.background2} />
    </Button>
  );
};

const RawButton = styled.button`
  all: unset;
  outline: none;
`;

const Button = styled(RawButton)`
  display: flex;
  align-items: center;
  &:hover {
    border-bottom: 1px solid ${colors.shadow};
    cursor: pointer;
  }
`;
