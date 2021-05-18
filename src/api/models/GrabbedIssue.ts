export type GrabbedIssue = {
  id: string;
  key: string;
  summary: string;
  projectKey: string;
  dateCompleted: string;
  assigneeEmail: string;
  isDone: boolean;
};

export type GrabbedIssueMessageDto = {
  key?: string;
  summary?: string;
  projectKey?: string;
  dateCompleted?: string;
  assigneeEmail?: string;
  isDone?: boolean;
};
