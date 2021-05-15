import { Result } from '../util/Result';
import { API } from './API';

/**
 * creates an `API` backed by the product's API
 * update 'arno' to product name
 * @param options
 */
export const arnoAPIClient = (options: {
  /** The API's base URL. */
  baseURL: string;
}): API => {
  return {
    getUser: () => Promise.resolve(Result.success({ firstName: 'arno', id: 1 })),
  };
};
