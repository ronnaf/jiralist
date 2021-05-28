import React from 'react';
import styled from 'styled-components';
import { colors, Regular, Subtitle } from './Styles';
import { BiBulb, BiX } from 'react-icons/bi';
import { JRawButton } from './JRawButton';

type Props = {
  title: React.ReactNode;
  message: React.ReactNode;
  shown: boolean;
  onClose?: () => void;
};

export const JBanner = (props: Props) => {
  if (!props.shown) return null;
  return (
    <Container>
      <IconContainer>
        <BiBulb size={20} />
      </IconContainer>
      <div>
        <Regular color={colors.background1} weight="bold">
          {props.title}
        </Regular>
        <Subtitle>{props.message}</Subtitle>
      </div>
      {!!props.onClose && (
        <CloseIconContainer onClick={props.onClose}>
          <BiX />
        </CloseIconContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.background2};
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;
`;

const IconContainer = styled.div`
  padding-right: 12px;
`;

const CloseIconContainer = styled(JRawButton)`
  position: absolute;
  top: 12px;
  right: 12px;
`;
