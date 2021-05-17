import dayjs from 'dayjs';
import { CompletedIssue } from '../api/models/CompletedIssue';

export type CompletedIssueGroup = {
  dateCompletedString: string;
  issues: CompletedIssue[];
};

export const getIssueLink = (issueKey: string) => `https://smashingboxes.atlassian.net/browse/${issueKey}`;

export const getCompletedIssuesGroupedByDate = (issues: CompletedIssue[]): CompletedIssueGroup[] => {
  // { [date]: [{...completedIssue}] }
  const completedIssuesMap: { [key: string]: CompletedIssue[] } = {};

  issues.forEach(completedIssue => {
    const dateCompleted = dayjs(completedIssue.dateCompleted).format('MMMM DD, YYYY');
    if (!completedIssuesMap[dateCompleted]) {
      completedIssuesMap[dateCompleted] = [];
    }
    completedIssuesMap[dateCompleted].push(completedIssue);
  });

  // [{ dateCompletedString, issues }]
  const groupedIssues = Object.entries(completedIssuesMap)
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
