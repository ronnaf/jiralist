import { Result } from '../util/Result';
import { JiraIssue } from './models/JiraIssue';
import { JiraProject } from './models/JiraProject';
import { JiraUser } from './models/JiraUser';

export type JiraAPI = {
  getProjects: () => Promise<Result<JiraProject[], undefined>>;
  getProjectIssues: (projectKey: string) => Promise<Result<JiraIssue[], undefined>>;
  getCurrentUser: () => Promise<Result<JiraUser, undefined>>;
};
