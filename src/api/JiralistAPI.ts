import { Result } from '../util/Result.util';
import { CompletedIssue } from './models/CompletedIssue';

/** An asynchronous API describing the product's REST API */
export type JiralistAPI = {
  /** Gets completed issues */
  getCompletedIssues: (payload: {
    assigneeEmail: string;
    projectKey: string;
  }) => Promise<Result<CompletedIssue[], undefined>>;
  /** Creats a new completed issue entry */
  createCompletedIssue: (payload: CompletedIssue) => Promise<Result<CompletedIssue, undefined>>;
};
