import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { JRawButton } from '../../../core/JRawButton';
import { ButtonText, colors, Regular } from '../../../core/Styles';

type Props = {
  issueKey: string;
  summary: string;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  onUpdate?: () => void;
  onCopy: () => void;
  onDelete?: () => void;
};

export const JIssueItem = (props: Props) => {
  return (
    <Issue>
      <Child>
        {props.checkbox && (
          <input type="checkbox" checked={props.checked} onChange={props.onCheck} disabled={props.disabled} />
        )}
        <Regular>
          [<b>{props.issueKey}</b>] <IssueDivide>|</IssueDivide> {props.summary}
        </Regular>
      </Child>
      <Child>
        {!!props.onDelete && (
          <JRawButton onClick={props.onDelete} disabled={props.disabled}>
            <ButtonText color={colors.shadow}>delete</ButtonText>
          </JRawButton>
        )}
        {!!props.onUpdate && (
          <JRawButton onClick={props.onUpdate} disabled={props.disabled}>
            <ButtonText color={colors.shadow}>update</ButtonText>
          </JRawButton>
        )}
        <JRawButton onClick={props.onCopy}>
          <ButtonText color={colors.shadow}>copy</ButtonText>
        </JRawButton>
      </Child>
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

const Child = styled.div`
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
