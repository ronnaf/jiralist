import { Result } from '../util/Result';
import { User } from './models/User';

/** An asynchronous API describing the product's REST API */
export type API = {
  /** example code, subject to change */
  getUser: () => Promise<Result<User, undefined>>;
};
