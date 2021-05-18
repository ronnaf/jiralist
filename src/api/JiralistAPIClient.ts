import { jFetch } from '../util/JFetch.util';
import { ResultType } from '../util/Result.util';
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
    getGrabbedIssues: async payload => {
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
    createGrabbedIssue: async payload => {
      try {
        const result = await jFetch({
          method: 'POST',
          baseUrl: options.baseURL,
          url: `/issues`,
          prefixed: false,
          data: payload,
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    updateGrabbedIssue: async (id, payload) => {
      try {
        const result = await jFetch({
          method: 'PATCH',
          baseUrl: options.baseURL,
          url: `/issues/${id}`,
          prefixed: false,
          data: payload,
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    deleteGrabbedIssue: async id => {
      try {
        const result = await jFetch({
          method: 'DELETE',
          baseUrl: options.baseURL,
          url: `/issues/${id}`,
          prefixed: false,
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
  };
};
