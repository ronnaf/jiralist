import { Result } from '../util/Result';
import { JiraProject } from './models/JiraProject';

export type JiraAPI = {
  getProjects: () => Promise<Result<JiraProject[], undefined>>;
};
