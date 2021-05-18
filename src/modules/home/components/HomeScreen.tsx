import React from 'react';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';
import { copyToClipboard } from '../../../util/Clipboard.util';
import { getIssueLink } from '../../../util/Issue.util';
import { JBanner } from '../../core/JBanner';
import { JModal } from '../../core/JModal';
import { JRawDiv } from '../../core/JRawDiv';
import { JSpinner } from '../../core/JSpinner';
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
                    Go to <a href={process.env.REACT_APP_CORS_PROXY}>{process.env.REACT_APP_CORS_PROXY}</a> and click `
                    <b>Request temporary access to the demo server</b>`
                  </span>
                }
                onClose={props.userToggledBanner}
              />
            )}
            {/* Issues */}
            <div>
              <SectionLabel>
                <div>
                  <H1>Issues</H1>
                  <Subtitle>Your issues that are currently in TODO or IN PROGRESS in the Jira Board</Subtitle>
                </div>
                {props.loadingIssues && <JSpinner />}
              </SectionLabel>
              <SizedBox height={10} />
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
            </div>
            {/* Incomplete issues */}
            <div>
              <H1>Incomplete Issues</H1>
              <Subtitle>Issues that are assigned to you that you can work on</Subtitle>
              <SizedBox height={10} />
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
            </div>
            {/* Grabbed issues */}
            <div>
              <SectionLabel>
                <div>
                  <H1>Grabbed Issues</H1>
                  <Subtitle>Issues that you're currently working on</Subtitle>
                </div>
                {props.loadingGrabbedIssues && <JSpinner />}
              </SectionLabel>
              <SizedBox height={10} />
              <IssueGroups>
                {props.grabbedIssueGroups.map(issueGroup => (
                  <div key={issueGroup.dateCompletedString}>
                    <Regular weight="bold">{issueGroup.dateCompletedString}</Regular>
                    <SizedBox height={4} />
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
                  </div>
                ))}
              </IssueGroups>
            </div>
          </Body>
        </Main>
      </InnerContainer>

      {/* Datepicker modal */}
      <JModal isOpen={props.pickerOpen}>
        <JRawDiv>
          <H1 color={colors.background1}>When did you complete {props.selectedIncIssue?.key}?</H1>
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

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PickerContainer = styled.div`
  border: 1px solid ${colors.shadow};
  border-radius: 4px;

  .DayPicker-Footer {
    text-align: center;
  }
`;
