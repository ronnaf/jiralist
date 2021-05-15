/**
 * Please separate to appropriate directory
 * For Proxy Pattern you can check https://refactoring.guru/design-patterns/proxy/typescript/example
 */

import { User } from '../api/models/User';

type UserApi = {
  getUsers: () => Promise<Array<User>>;
};

/**
 * Sample Class that can be injected as well in the proxy class via constructor
 */
class AuthService {
  checkAccess(): Boolean {
    return true;
  }
}

/** Real Subject */
class RealUserApi implements UserApi {
  private options: {
    url: string;
    // maybe more attributes
  };
  constructor(options: { url: string }) {
    this.options = options; // process options
  }

  getUsers(): Promise<Array<User>> {
    return Promise.resolve([{ id: 1, firstName: 'dummy' }]);
  }
}

/** Proxy */
class UserApiProxy implements UserApi {
  private api: UserApi;
  private service: AuthService;
  constructor(api: UserApi, service: AuthService) {
    this.api = api;
    this.service = service;
  }

  getUsers(): Promise<Array<User>> {
    // do other business logic
    // e.g checking access
    const authenticated = this.service.checkAccess();

    if (authenticated) {
      return this.api.getUsers();
    } else {
      throw new Error('NotAuthenticated');
    }
  }
}
