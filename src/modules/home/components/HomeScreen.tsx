import React from 'react';
import styled from 'styled-components';
import { SizedBox } from '../../core/SizedBox';
import { colors, H1, Regular, Subtitle } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';
import { JHeader } from './shared/JHeader';
import { JSidebar } from './shared/JSidebar';

export const HomeScreen = (props: HomeProps) => {
  return (
    <Container>
      <InnerContainer>
        <JHeader displayName={props.currentUser?.displayName || '-'} />
        <Main>
          <JSidebar projects={props.projects} handleLogout={props.userClickedLogout} />
          <Body>
            {props.currentProject && (
              <Flex>
                <H1>{props.currentProject?.name}</H1>
                <Regular>({props.currentProject?.key})</Regular>
              </Flex>
            )}
            <SizedBox height={16} />
            <H1>Issues</H1>
            <Subtitle>Issues that are currently in TODO or IN PROGRESS</Subtitle>
            <SizedBox height={10} />
            <Issues>
              {props.issues.map(issue => (
                <Issue key={issue.id}>
                  <Regular>
                    [<b>{issue.key}</b>] <IssueDivide>|</IssueDivide> {issue.fields.summary}
                  </Regular>
                </Issue>
              ))}
            </Issues>
          </Body>
        </Main>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.background1};
  min-height: 100vh;
`;

const InnerContainer = styled.div`
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
  padding-left: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;

const Issues = styled.div``;

const Issue = styled.div``;

const IssueDivide = styled.span`
  color: grey;
  margin: 0 2px;
`;
