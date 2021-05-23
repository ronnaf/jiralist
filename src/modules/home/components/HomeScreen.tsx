import React from 'react';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';
import { copyToClipboard } from '../../../util/Clipboard.util';
import { getIssueLink } from '../../../util/Issue.util';
import { JBanner } from '../../core/JBanner';
import { JModal } from '../../core/JModal';
import { JRawDiv } from '../../core/JRawDiv';
import { SizedBox } from '../../core/SizedBox';
import { colors, H1, Regular } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';
import { JHeader } from './shared/JHeader';
import { JIssueGroup } from './shared/JIssueGroup';
import { JIssueItem } from './shared/JIssueItem';
import { JSection } from './shared/JSection';
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
            {/* Info banner */}
            {props.bannerShown && (
              <JBanner
                onClose={props.userToggledBanner}
                title="Getting a 'See /corsdemo for more info' error?"
                message={
                  <span>
                    Go to <a href={process.env.REACT_APP_CORS_PROXY}>{process.env.REACT_APP_CORS_PROXY}</a> and click `
                    <b>Request temporary access to the demo server</b>`
                  </span>
                }
              />
            )}
            {/* Current project name */}
            {props.currentProject && (
              <Flex>
                <H1>{props.currentProject?.name}</H1>
                <Regular>({props.currentProject?.key})</Regular>
              </Flex>
            )}
            {/* Issues */}
            <JSection
              title="Issues"
              subtitle="Your issues that are currently in TODO or IN PROGRESS in the Jira Board"
              loading={props.loadingIssues}>
              <Issues>
                {props.issues.map(issue => (
                  <JIssueItem
                    key={issue.id}
                    issueKey={issue.key}
                    summary={issue.fields.summary}
                    onCopy={() => copyToClipboard(getIssueLink(issue.key))}
                  />
                ))}
              </Issues>
            </JSection>
            {/* Incomplete issues */}
            <JSection
              title="Incomplete Issues"
              subtitle="Issues that are assigned to you that you can work on"
              loading={props.loadingIssues}>
              <Issues>
                {props.incompleteIssues.map(issue => (
                  <JIssueItem
                    key={issue.id}
                    issueKey={issue.key}
                    summary={issue.fields.summary}
                    onCopy={() => copyToClipboard(getIssueLink(issue.key))}
                    onUpdate={() => props.userClickedUpdateIncompleteIssue(issue)}
                  />
                ))}
              </Issues>
            </JSection>
            {/* Grabbed issues */}
            <JSection
              title="Grabbed Issues"
              subtitle="Issues that you're currently working on"
              loading={props.loadingGrabbedIssues}>
              <IssueGroups>
                {props.grabbedIssueGroups.map(issueGroup => (
                  <JIssueGroup key={issueGroup.dateCompletedString} title={issueGroup.dateCompletedString}>
                    <Issues>
                      {issueGroup.issues.map(issue => (
                        <JIssueItem
                          checkbox
                          key={issue.id}
                          issueKey={issue.key}
                          summary={issue.summary}
                          checked={issue.isDone}
                          onCopy={() => copyToClipboard(getIssueLink(issue.key))}
                          onUpdate={() => props.userClickedUpdateGrabbedIssue(issue)}
                          onCheck={e => props.userToggledCheckGrabbedIssue(issue, e.target.checked)}
                          onDelete={() => props.userDeletedGrabbedIssue(issue)}
                        />
                      ))}
                    </Issues>
                  </JIssueGroup>
                ))}
              </IssueGroups>
            </JSection>
          </Body>
        </Main>
      </InnerContainer>

      {/* Datepicker modal */}
      <JModal isOpen={props.pickerOpen}>
        <JRawDiv>
          <H1 color={colors.background1}>When are you planning to complete {props.selectedIncIssue?.key}?</H1>
          <SizedBox height={10} />
          <PickerContainer>
            <DayPicker
              todayButton="Today"
              onDayClick={date => {
                if (props.selectedIncIssue) {
                  props.userCreatedGrabbedIssue(date);
                } else if (props.selectedGrabbedIssue) {
                  props.userUpdatedGrabbedIssue(date);
                }
              }}
              onTodayButtonClick={date => {
                if (props.selectedIncIssue) {
                  props.userCreatedGrabbedIssue(date);
                } else if (props.selectedGrabbedIssue) {
                  props.userUpdatedGrabbedIssue(date);
                }
              }}
            />
          </PickerContainer>
        </JRawDiv>
      </JModal>
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

const PickerContainer = styled.div`
  border: 1px solid ${colors.shadow};
  border-radius: 4px;

  .DayPicker-Footer {
    text-align: center;
  }
`;
