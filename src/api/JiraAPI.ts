import { ResultType } from '../util/Result.util';
import { AtlassianAuthResult } from './models/AtlassianAuthResult';
import { JiraIssue } from './models/JiraIssue';
import { JiraProject } from './models/JiraProject';
import { JiraSite } from './models/JiraSite';
import { JiraUser } from './models/JiraUser';

export type JiraAPI = {
  /** Constructs authorization url for login  */
  constructAuthUrl: () => string;
  /** Gets access token in exchange of authorization code */
  getAccessToken: (code: string) => Promise<ResultType<AtlassianAuthResult, undefined>>;
  /** Gets the cloudid for the Jira site based on accessToken */
  getCloudId: (token: string) => Promise<ResultType<JiraSite[], undefined>>;
  /** Gets the recent 20 projects last accessed by the user */
  getProjects: () => Promise<ResultType<JiraProject[], undefined>>;
  /** Gets user issues based on projectKey and status: "to do", "in progress" */
  getProjectIssues: (projectKey: string) => Promise<ResultType<JiraIssue[], undefined>>;
  /** Gets current user information */
  getCurrentUser: () => Promise<ResultType<JiraUser, undefined>>;
};
