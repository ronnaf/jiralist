import React from 'react';
import styled from 'styled-components';
import { JButton } from '../../core/JButton';
import { JRawButton } from '../../core/JRawButton';
import { SizedBox } from '../../core/SizedBox';
import { colors, H1, Regular } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';

export const HomeScreen = (props: HomeProps) => {
  return (
    <Container>
      <InnerContainer>
        <Sidebar>
          <div>
            <H1>Recent Projects</H1>
            <SizedBox height={26} />
            <Projects>
              {props.projects.map(project => (
                <div key={project.id}>
                  <JRawButton>
                    <Regular>{project.name}</Regular>
                  </JRawButton>
                </div>
              ))}
            </Projects>
            <SizedBox height={26} />
            <JButton title="Log out" onClick={props.userClickedLogout} />
          </div>
          <VerticalLine />
        </Sidebar>
        <Body>
          <Regular>Hello world</Regular>
        </Body>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.background1};
  min-height: 100vh;
`;

const InnerContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const Sidebar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const Body = styled.div`
  padding-left: 20px;
  margin-top: 16px;
`;

const VerticalLine = styled.div`
  width: 1px;
  background-color: ${colors.shadow};
  height: 95%;
`;

const Projects = styled.div`
  & > :not(:last-child) {
    margin-bottom: 4px;
  }
`;
