import { Result } from '../util/Result.util';
import { JiraIssue } from './models/JiraIssue';
import { JiraProject } from './models/JiraProject';
import { JiraUser } from './models/JiraUser';

export type JiraAPI = {
  /** Gets the recent 20 projects last accessed by the user */
  getProjects: () => Promise<Result<JiraProject[], undefined>>;
  /** Gets user issues based on projectKey and status: "to do", "in progress" */
  getProjectIssues: (projectKey: string) => Promise<Result<JiraIssue[], undefined>>;
  /** Gets current user information */
  getCurrentUser: () => Promise<Result<JiraUser, undefined>>;
};
