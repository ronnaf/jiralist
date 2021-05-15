import { jFetch } from '../util/JFetch';
import { Result } from '../util/Result';
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
  };
};
