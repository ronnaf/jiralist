import { ResultType } from '../util/Result.util';
import { GrabbedIssue, GrabbedIssueMessageDto } from './models/GrabbedIssue';

/** An asynchronous API describing the product's REST API */
export type JiralistAPI = {
  /** Gets grabbed issues */
  getGrabbedIssues: (payload: {
    assigneeEmail: string;
    projectKey: string;
  }) => Promise<ResultType<GrabbedIssue[], undefined>>;
  /** Creats a new grabbed issue entry */
  createGrabbedIssue: (payload: GrabbedIssue) => Promise<ResultType<GrabbedIssue, undefined>>;
  /** Update an existing grabbed issue entry */
  updateGrabbedIssue: (id: string, payload: GrabbedIssueMessageDto) => Promise<ResultType<GrabbedIssue, undefined>>;
  /** Delete an existing grabbed issue entry */
  deleteGrabbedIssue: (id: string) => Promise<ResultType<GrabbedIssue, undefined>>;
};
