import React from 'react';
import styled from 'styled-components';
import { JRawButton } from '../../../core/JRawButton';
import { ButtonText, colors, Regular } from '../../../core/Styles';

type Props = {
  issueKey: string;
  summary: string;
  onMark: () => void;
  onCopy: () => void;
};

export const JIssueItem = (props: Props) => {
  return (
    <Issue>
      <Regular>
        [<b>{props.issueKey}</b>] <IssueDivide>|</IssueDivide> {props.summary}
      </Regular>
      <IssueTrailing>
        <JRawButton onClick={props.onMark}>
          <ButtonText color={colors.shadow}>mark</ButtonText>
        </JRawButton>
        <JRawButton onClick={props.onCopy}>
          <ButtonText color={colors.shadow}>copy</ButtonText>
        </JRawButton>
      </IssueTrailing>
    </Issue>
  );
};

const Issue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
`;

const IssueTrailing = styled.div`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;

const IssueDivide = styled.span`
  color: grey;
  margin: 0 2px;
`;
