import { ResultType } from '../util/Result.util';
import { JiraIssue } from './models/JiraIssue';
import { JiraProject } from './models/JiraProject';
import { JiraUser } from './models/JiraUser';

export type JiraAPI = {
  /** Gets the recent 20 projects last accessed by the user */
  getProjects: () => Promise<ResultType<JiraProject[], undefined>>;
  /** Gets user issues based on projectKey and status: "to do", "in progress" */
  getProjectIssues: (projectKey: string) => Promise<ResultType<JiraIssue[], undefined>>;
  /** Gets current user information */
  getCurrentUser: () => Promise<ResultType<JiraUser, undefined>>;
};
