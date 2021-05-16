import { jFetch } from '../util/JFetch';
import { Result } from '../util/Result';
import { JiralistAPI } from './JiralistAPI';

/**
 * creates an `API` backed by the product's API
 * update 'arno' to product name
 * @param options
 */
export const jiralistAPIClient = (options: {
  /** The API's base URL. */
  baseURL: string;
}): JiralistAPI => {
  return {
    getCompletedIssues: async payload => {
      try {
        const { assigneeEmail, projectKey } = payload;
        const filter = encodeURIComponent(
          JSON.stringify({
            where: {
              assigneeEmail,
              projectKey,
            },
          })
        );
        const result = await jFetch({
          baseUrl: options.baseURL,
          url: `/issues?filter=${filter}`,
          prefixed: false,
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
  };
};
