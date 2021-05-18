import { jFetch } from '../util/JFetch.util';
import { ResultType } from '../util/Result.util';
import { JiraAPI } from './JiraAPI';

export const jiraAPIClient = (options: {
  /** The API's base URL. */
  baseURL: string;
}): JiraAPI => {
  return {
    getProjects: async () => {
      try {
        const result = await jFetch({
          baseUrl: options.baseURL,
          url: '/rest/api/3/project?recent=20',
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    getProjectIssues: async projectKey => {
      try {
        const url = `/rest/api/3/search?jql=project=${projectKey} AND assignee=currentuser() AND (status="in progress" OR status="to do")&fields=summary,status,assignee`;
        const result = await jFetch({
          baseUrl: options.baseURL,
          url,
        });
        return Result.success(result.issues);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    getCurrentUser: async () => {
      try {
        const result = await jFetch({
          baseUrl: options.baseURL,
          url: '/rest/api/3/myself',
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
  };
};
