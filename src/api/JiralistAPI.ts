import { Result } from '../util/Result.util';
import { GrabbedIssue, GrabbedIssueMessageDto } from './models/GrabbedIssue';

/** An asynchronous API describing the product's REST API */
export type JiralistAPI = {
  /** Gets grabbed issues */
  getGrabbedIssues: (payload: {
    assigneeEmail: string;
    projectKey: string;
  }) => Promise<Result<GrabbedIssue[], undefined>>;
  /** Creats a new grabbed issue entry */
  createGrabbedIssue: (payload: GrabbedIssue) => Promise<Result<GrabbedIssue, undefined>>;
  /** Update an existing grabbed issue entry */
  updateGrabbedIssue: (id: string, payload: GrabbedIssueMessageDto) => Promise<Result<GrabbedIssue, undefined>>;
};
