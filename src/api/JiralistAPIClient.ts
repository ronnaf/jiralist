import { extractIssueFromDoc } from '../util/ExtractIssueFromDoc';
import { Result } from '../util/Result.util';
import { jLocalDb } from './../util/JLocalDb';
import { JiralistAPI } from './JiralistAPI';
import { GrabbedIssue } from './models/GrabbedIssue';

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
        const response = await jLocalDb.allDocs<GrabbedIssue>({ include_docs: true, descending: true });

        const issues = response.rows
          .map(row => extractIssueFromDoc(row.doc!))
          .filter(issue => issue.assigneeEmail === assigneeEmail && issue.projectKey === projectKey);

        return Result.success(issues);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    createGrabbedIssue: async payload => {
      try {
        await jLocalDb.put<GrabbedIssue>(payload);
        return Result.success(payload);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    updateGrabbedIssue: async (id, payload) => {
      try {
        const response = await jLocalDb.get<GrabbedIssue>(id);
        const { _rev } = response;
        const issue = extractIssueFromDoc(response);

        const issueUpdate = { _rev, ...issue, ...payload };
        await jLocalDb.put(issueUpdate);

        return Result.success(issue);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    deleteGrabbedIssue: async id => {
      try {
        const issueDoc = await jLocalDb.get<GrabbedIssue>(id);
        await jLocalDb.remove(issueDoc);

        const issue = extractIssueFromDoc(issueDoc);
        return Result.success(issue);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
  };
};
