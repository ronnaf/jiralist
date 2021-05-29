import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import styled from 'styled-components';
import { copyToClipboard } from '../../../util/Clipboard.util';
import { getIssueLink } from '../../../util/Issue.util';
import { JTag } from '../../core/JTag';
import { SizedBox } from '../../core/SizedBox';
import { H1, Subtitle } from '../../core/Styles';
import { ProjectProps } from '../containers/ProjectContainer';
import { JIssueGroup } from './shared/JIssueGroup';
import { JIssueItem } from './shared/JIssueItem';
import { JSectionLabel } from './shared/JSectionLabel';

export const Project = (props: ProjectProps) => {
  return (
    <>
      <div>
        <H1>{props.projectKey}</H1>
        <Subtitle>Click on a header to collapse or expand list.</Subtitle>
      </div>
      <Accordion
        allowZeroExpanded={true}
        allowMultipleExpanded={true}
        preExpanded={['issues', 'incomplete_issues', 'grabbed_issues']}>
        <SectionItems>
          {/* Issues */}
          <AccordionItem uuid="issues">
            <AccordionItemHeading title="Click to expand!">
              <AccordionItemButton>
                <JSectionLabel
                  title="Issues"
                  subtitle="Your issues that are currently in TODO or IN PROGRESS in the Jira Board"
                  loading={props.loadingIssues}
                  trailing={[<JTag key="count">{props.issues.length}</JTag>]}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <SizedBox height={10} />
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
            </AccordionItemPanel>
          </AccordionItem>
          {/* Incomplete issues */}
          <AccordionItem uuid="incomplete_issues">
            <AccordionItemHeading>
              <AccordionItemButton>
                <JSectionLabel
                  title="Incomplete Issues"
                  subtitle="Issues that are assigned to you that you can work on"
                  loading={props.loadingIncIssues}
                  trailing={[<JTag key="count">{props.incompleteIssues.length}</JTag>]}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <SizedBox height={10} />
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
            </AccordionItemPanel>
          </AccordionItem>
          {/* Grabbed issues */}
          <AccordionItem uuid="grabbed_issues">
            <AccordionItemHeading>
              <AccordionItemButton>
                <JSectionLabel
                  title="Grabbed Issues"
                  subtitle="Issues that you're currently working on"
                  loading={props.loadingGrabbedIssues}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <SizedBox height={10} />
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
            </AccordionItemPanel>
          </AccordionItem>
        </SectionItems>
      </Accordion>
    </>
  );
};

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

const SectionItems = styled.div`
  & > :not(:last-child) {
    margin-bottom: 28px;
  }
`;
