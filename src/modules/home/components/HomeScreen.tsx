import React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import { routes } from '../../../routes';
import { JHeader } from '../../core/JHeader';
import { JSidebar } from '../../core/JSidebar';
import { colors } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';
import { ProjectContainer } from '../containers/ProjectContainer';
import { Landing } from './Landing';

export const HomeScreen = (props: HomeProps) => {
  return (
    <MainDiv>
      <InnerDiv>
        <JHeader displayName={props.currentUser?.displayName || '-'} />
        <Main>
          <JSidebar projects={props.projects} loading={props.loadingProjects} />
          <Body>
            <Switch>
              <Route exact path={routes.PROJECTS} component={Landing} />
              <Route exact path={routes.PROJECTS__VIEW()} component={ProjectContainer} />
            </Switch>
          </Body>
        </Main>
      </InnerDiv>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  background-color: ${colors.background1};
  min-height: 100vh;
`;

const InnerDiv = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 3rem;
`;

const Body = styled.div`
  padding-left: 1.5rem;
  & > :not(:last-child) {
    margin-bottom: 28px;
  }
`;
