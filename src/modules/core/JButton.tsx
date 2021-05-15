import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';
import { JRawButton } from './JRawButton';
import { SizedBox } from './SizedBox';
import { colors, ButtonText, JTextProps } from './Styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  buttonTextProps?: JTextProps;
}

export const JButton = (props: Props) => {
  const { title, buttonTextProps, ...buttonProps } = props;
  return (
    <Button {...buttonProps}>
      <ButtonText weight="bold" {...buttonTextProps}>
        {props.title}
      </ButtonText>
      <SizedBox width={4} />
      <BsArrowRight color={colors.background2} />
    </Button>
  );
};

const Button = styled(JRawButton)`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  &:hover {
    border-bottom: 2px solid ${colors.shadow};
    cursor: pointer;
  }
`;
