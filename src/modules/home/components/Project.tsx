// import React from 'react';
// import styled from 'styled-components';
// import { copyToClipboard } from '../../../util/Clipboard.util';
// import { getIssueLink } from '../../../util/Issue.util';
// import { H1, Regular } from '../../core/Styles';
// import { JProjectProps } from '../containers/ProjectContainer';
// import { JIssueGroup } from './shared/JIssueGroup';
// import { JIssueItem } from './shared/JIssueItem';
// import { JSection } from './shared/JSection';

// export const JProject = (props: JProjectProps) => {
//   return (
//     <>
//       <Flex>
//         <H1>{props.project?.name}</H1>
//         <Regular>({props.project?.key})</Regular>
//       </Flex>
//       {/* Issues */}
//       <JSection
//         title="Issues"
//         subtitle="Your issues that are currently in TODO or IN PROGRESS in the Jira Board"
//         loading={props.loadingIssues}>
//         <Issues>
//           {props.issues.map(issue => (
//             <JIssueItem
//               key={issue.id}
//               issueKey={issue.key}
//               summary={issue.fields.summary}
//               onCopy={() => copyToClipboard(getIssueLink(issue.key))}
//             />
//           ))}
//         </Issues>
//       </JSection>
//       {/* Incomplete issues */}
//       <JSection
//         title="Incomplete Issues"
//         subtitle="Issues that are assigned to you that you can work on"
//         loading={props.loadingIssues}>
//         <Issues>
//           {props.incompleteIssues.map(issue => (
//             <JIssueItem
//               key={issue.id}
//               issueKey={issue.key}
//               summary={issue.fields.summary}
//               onCopy={() => copyToClipboard(getIssueLink(issue.key))}
//               onUpdate={() => props.handleUpdateIncompleteIssue(issue)}
//             />
//           ))}
//         </Issues>
//       </JSection>
//       {/* Grabbed issues */}
//       <JSection
//         title="Grabbed Issues"
//         subtitle="Issues that you're currently working on"
//         loading={props.loadingGrabbedIssues}>
//         <IssueGroups>
//           {props.grabbedIssueGroups.map(issueGroup => (
//             <JIssueGroup key={issueGroup.dateCompletedString} title={issueGroup.dateCompletedString}>
//               <Issues>
//                 {issueGroup.issues.map(issue => (
//                   <JIssueItem
//                     checkbox
//                     key={issue.id}
//                     issueKey={issue.key}
//                     summary={issue.summary}
//                     checked={issue.isDone}
//                     onCopy={() => copyToClipboard(getIssueLink(issue.key))}
//                     onUpdate={() => props.handleUpdateGrabbedIssue(issue)}
//                     onCheck={e => props.handleCheckGrabbedIssue(issue, e.target.checked)}
//                     onDelete={() => props.handleDeleteGrabbedIssue(issue)}
//                   />
//                 ))}
//               </Issues>
//             </JIssueGroup>
//           ))}
//         </IssueGroups>
//       </JSection>
//     </>
//   );
// };

// const Flex = styled.div`
//   display: flex;
//   align-items: flex-end;
//   & > :not(:last-child) {
//     margin-right: 8px;
//   }
// `;

// const Issues = styled.div`
//   & > :not(:last-child) {
//     margin-bottom: 4px;
//   }
// `;

// const IssueGroups = styled.div`
//   & > :not(:last-child) {
//     margin-bottom: 16px;
//   }
// `;
export {};
