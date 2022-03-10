import { getModelKeys } from './GetModelKeys';
import { GrabbedIssue } from '../api/models/GrabbedIssue';

const issueKeys = getModelKeys<GrabbedIssue>({
  _id: '',
  assigneeEmail: '',
  dateCompleted: '',
  isDone: false,
  key: '',
  projectKey: '',
  summary: '',
});

type Arg<P> =
  | (P & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta)
  | PouchDB.Core.ExistingDocument<GrabbedIssue & PouchDB.Core.AllDocsMeta>;

/**
 * Extracts [GrabbedIssue] from PouchDB's document
 *
 * @see What's a document? https://pouchdb.com/guides/documents.html
 * @example
 * ```
 * const response = await jLocalDb.get<GrabbedIssue>(id);
 * const issue = extractIssue(response);
 * ```
 */
export const extractIssueFromDoc = (response: Arg<GrabbedIssue>): GrabbedIssue => {
  const result: { [key: string]: any } = {};

  issueKeys.forEach(key => {
    result[key] = response[key];
  });

  // To appease the TS gods
  return result as GrabbedIssue;
};
