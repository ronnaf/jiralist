import React from 'react';
import styled from 'styled-components';
import { JButton } from '../../core/JButton';
import { JLogo } from '../../core/JLogo';
import { JSpinner } from '../../core/JSpinner';
import { SizedBox } from '../../core/SizedBox';
import { colors } from '../../core/Styles';
import { LoginProps } from '../containers/LoginContainer';

export const LoginScreen: React.FC<LoginProps> = props => {
  return (
    <Div>
      <CenteredDiv>
        {props.loading ? (
          <JSpinner />
        ) : (
          <LogoDiv>
            <JLogo />
          </LogoDiv>
        )}
        <SizedBox height={56} />
        <JButton
          disabled={props.loading}
          title="login with atlassian"
          buttonTextProps={{ transform: 'uppercase' }}
          onClick={props.userClickedGo}
        />
      </CenteredDiv>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${colors.background1};
`;

const CenteredDiv = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LogoDiv = styled.div`
  display: flex;
`;
