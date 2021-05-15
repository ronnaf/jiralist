import React from 'react';
import styled from 'styled-components';
import { copyToClipboard } from '../../../util/Clipboard';
import { getIssueLink } from '../../../util/Issue';
import { JRawButton } from '../../core/JRawButton';
import { SizedBox } from '../../core/SizedBox';
import { ButtonText, colors, H1, Regular, Subtitle } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';
import { JHeader } from './shared/JHeader';
import { JSidebar } from './shared/JSidebar';

export const HomeScreen = (props: HomeProps) => {
  return (
    <Container>
      <InnerContainer>
        <JHeader displayName={props.currentUser?.displayName || '-'} />
        <Main>
          <JSidebar
            projects={props.projects}
            loading={props.loadingProjects}
            handleLogout={props.userClickedLogout}
            handleProjectChange={props.userChangedCurrentProject}
          />
          <Body>
            {props.currentProject && (
              <Flex>
                <H1>{props.currentProject?.name}</H1>
                <Regular>({props.currentProject?.key})</Regular>
              </Flex>
            )}
            <SizedBox height={16} />
            <H1>Issues</H1>
            <Subtitle>Your issues that are currently in TODO or IN PROGRESS</Subtitle>
            <SizedBox height={10} />
            {props.loadingIssues ? (
              <Regular>Loading...</Regular>
            ) : (
              <Issues>
                {props.issues.map(issue => (
                  <Issue key={issue.id}>
                    <Regular>
                      [<b>{issue.key}</b>] <IssueDivide>|</IssueDivide> {issue.fields.summary}
                    </Regular>
                    <IssueTrailing>
                      <JRawButton>
                        <ButtonText color={colors.shadow}>mark</ButtonText>
                      </JRawButton>
                      <JRawButton onClick={() => copyToClipboard(getIssueLink(issue.key))}>
                        <ButtonText color={colors.shadow}>copy</ButtonText>
                      </JRawButton>
                    </IssueTrailing>
                  </Issue>
                ))}
              </Issues>
            )}
            <SizedBox height={30} />
            <H1>Completed Issues</H1>
            <Subtitle>Your issues that have been completed, but not necessarily READY FOR QA</Subtitle>
            <SizedBox height={10} />
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
  padding-left: 1.5rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;

const Issues = styled.div`
  margin-left: -8px;
  & > :not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Issue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
`;

const IssueDivide = styled.span`
  color: grey;
  margin: 0 2px;
`;

const IssueTrailing = styled.div`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;
