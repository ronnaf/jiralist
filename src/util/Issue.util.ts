import dayjs from 'dayjs';
import { GrabbedIssue } from '../api/models/GrabbedIssue';

export type GrabbedIssueGroup = {
  dateCompletedString: string;
  issues: GrabbedIssue[];
};

export const getIssueLink = (issueKey: string) => `https://smashingboxes.atlassian.net/browse/${issueKey}`;

export const getGrabbedIssuesGroupedByDate = (issues: GrabbedIssue[]): GrabbedIssueGroup[] => {
  // { [date]: [{...grabbedIssue}] }
  const issuesMap: { [key: string]: GrabbedIssue[] } = {};

  issues.forEach(issue => {
    const dateCompleted = dayjs(issue.dateCompleted).format('MMMM DD, YYYY');
    if (!issuesMap[dateCompleted]) {
      issuesMap[dateCompleted] = [];
    }
    issuesMap[dateCompleted].push(issue);
  });

  // [{ dateCompletedString, issues }]
  const groupedIssues = Object.entries(issuesMap)
    .map(([date, issues]) => ({
      dateCompletedString: date,
      dateCompleted: issues[0].dateCompleted,
      issues,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.dateCompleted);
      const dateB = new Date(b.dateCompleted);
      return dateB.valueOf() - dateA.valueOf();
    });

  return groupedIssues;
};
