import React from 'react';
import styled from 'styled-components';
import { copyToClipboard } from '../../../util/Clipboard.util';
import { getIssueLink } from '../../../util/Issue.util';
import { H1 } from '../../core/Styles';
import { ProjectProps } from '../containers/ProjectContainer';
import { JIssueGroup } from './shared/JIssueGroup';
import { JIssueItem } from './shared/JIssueItem';
import { JSection } from './shared/JSection';

export const Project = (props: ProjectProps) => {
  return (
    <>
      <Flex>
        <H1>{props.projectKey}</H1>
      </Flex>
      {/* Issues */}
      <JSection
        title="Issues"
        subtitle="Your issues that are currently in TODO or IN PROGRESS in the Jira Board"
        loading={props.loadingIssues}>
        <Issues>
          {props.issues.map(issue => (
            <JIssueItem
              key={issue.id}
              disabled={issue.key === props.disabledIssueKey}
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
        loading={props.loadingIncIssues}>
        <Issues>
          {props.incompleteIssues.map(issue => (
            <JIssueItem
              key={issue.id}
              disabled={issue.key === props.disabledIssueKey}
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
                    disabled={issue.key === props.disabledIssueKey}
                    issueKey={issue.key}
                    summary={issue.summary}
                    checked={issue.isDone}
                    onCopy={() => copyToClipboard(getIssueLink(issue.key))}
                    onUpdate={() => props.userClickedUpdateGrabbedIssue(issue)}
                    onCheck={e => props.userClickedCheckGrabbedIssue(issue, e.target.checked)}
                    onDelete={() => props.userClickedDeleteGrabbedIssue(issue)}
                  />
                ))}
              </Issues>
            </JIssueGroup>
          ))}
        </IssueGroups>
      </JSection>
    </>
  );
};

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
