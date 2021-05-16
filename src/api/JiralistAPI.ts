import { Result } from '../util/Result';
import { CompletedIssue } from './models/CompletedIssue';

/** An asynchronous API describing the product's REST API */
export type JiralistAPI = {
  /** Gets completed issues */
  getCompletedIssues: (payload: {
    assigneeEmail: string;
    projectKey: string;
  }) => Promise<Result<CompletedIssue[], undefined>>;
};