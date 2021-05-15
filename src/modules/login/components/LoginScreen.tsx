import React from 'react';
import styled from 'styled-components';
import { JButton } from '../../core/JButton';
import { JInput } from '../../core/JInput';
import { SizedBox } from '../../core/SizedBox';
import { colors, H1, Regular } from '../../core/Styles';
import { LoginProps } from '../containers/LoginContainer';

export const LoginScreen: React.FC<LoginProps> = props => {
  return (
    <Container>
      <CenteredContainer>
        <H1>welcome to jiralist</H1>
        <SizedBox height={34} />
        <Regular>jira email</Regular>
        <SizedBox height={8} />
        <JInput
          value={props.formState.email}
          onChange={e =>
            props.userUpdatedForm(f => ({
              ...f,
              email: e.target.value,
            }))
          }
        />
        <SizedBox height={26} />
        <Regular>jira api key</Regular>
        <SizedBox height={8} />
        <JInput
          value={props.formState.apiKey}
          onChange={e =>
            props.userUpdatedForm(f => ({
              ...f,
              apiKey: e.target.value,
            }))
          }
        />
        <SizedBox height={26} />
        <JButton title="go" onClick={props.userClickedGo} />
      </CenteredContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${colors.background1};
`;

const CenteredContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
