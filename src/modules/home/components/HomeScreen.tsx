import React from 'react';
import styled from 'styled-components';
import { copyToClipboard } from '../../../util/Clipboard';
import { getIssueLink } from '../../../util/Issue';
import { JBanner } from '../../core/JBanner';
import { SizedBox } from '../../core/SizedBox';
import { colors, H1, Regular, Subtitle } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';
import { JHeader } from './shared/JHeader';
import { JIssueItem } from './shared/JIssueItem';
import { JSidebar } from './shared/JSidebar';

export const HomeScreen = (props: HomeProps) => {
  return (
    <Container>
      <InnerContainer>
        {/* Header */}
        <JHeader displayName={props.currentUser?.displayName || '-'} />
        <Main>
          {/* Sidebar */}
          <JSidebar
            projects={props.projects}
            loading={props.loadingProjects}
            handleLogout={props.userClickedLogout}
            handleProjectChange={props.userChangedCurrentProject}
          />
          {/* Body */}
          <Body>
            {/* Current project name */}
            {props.currentProject && (
              <Flex>
                <H1>{props.currentProject?.name}</H1>
                <Regular>({props.currentProject?.key})</Regular>
              </Flex>
            )}
            {/* Info banner */}
            {props.bannerShown && (
              <JBanner
                title="Getting a 'See /corsdemo for more info' error?"
                message={
                  <span>
                    Go to <a href="https://cors-anywhere.herokuapp.com/">https://cors-anywhere.herokuapp.com/</a> and
                    click `<b>Request temporary access to the demo server</b>`
                  </span>
                }
                onClose={props.userToggledBanner}
              />
            )}
            {/* Issues */}
            <div>
              <H1>Issues</H1>
              <Subtitle>Your issues that are currently in TODO or IN PROGRESS in the Jira Board</Subtitle>
              <SizedBox height={10} />
              {props.loadingIssues ? (
                <Regular>Loading...</Regular>
              ) : (
                <Issues>
                  {props.issues.map(issue => (
                    <JIssueItem
                      issueKey={issue.key}
                      summary={issue.fields.summary}
                      onCopy={() => copyToClipboard(getIssueLink(issue.key))}
                    />
                  ))}
                </Issues>
              )}
            </div>
            {/* Completed issues */}
            <div>
              <H1>Incomplete Issues</H1>
              <Subtitle>Issues that are assigned to you that you can work on</Subtitle>
            </div>
            {/* Completed issues */}
            <div>
              <H1>Completed Issues</H1>
              <Subtitle>Issues that you've completed, but not necessarily READY FOR QA</Subtitle>
              <SizedBox height={10} />
              {props.loadingCompletedIssues ? (
                <Regular>Loading...</Regular>
              ) : (
                <IssueGroups>
                  {props.completedIssueGroups.map(issueGroup => (
                    <div key={issueGroup.dateCompletedString}>
                      <Regular weight="bold">{issueGroup.dateCompletedString}</Regular>
                      <SizedBox height={4} />
                      <Issues>
                        {issueGroup.issues.map(issue => (
                          <JIssueItem
                            issueKey={issue.key}
                            summary={issue.summary}
                            onCopy={() => copyToClipboard(getIssueLink(issue.key))}
                            onUpdate={() => {}}
                          />
                        ))}
                      </Issues>
                    </div>
                  ))}
                </IssueGroups>
              )}
            </div>
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
  & > :not(:last-child) {
    margin-bottom: 28px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;

const Issues = styled.div`
  & > :not(:last-child) {
    margin-bottom: 4px;
  }
`;

const IssueGroups = styled.div`
  & > :not(:last-child) {
    margin-bottom: 16px;
  }
`;
