import { API } from './api/API';
import { Auth0Service } from './services/Auth0Service';
import { LocalStorageService } from './services/LocalStorageService';
import { LoggingService } from './services/LoggingService';

/** Change 'Arno' to product name */
type ArnoEnvironment = {
  /** The current API. */
  api: API;
  /** Available external services */
  services: {
    auth: Auth0Service;
    logger: LoggingService;
    storage: LocalStorageService;
  };
  // ...
};

/** This value holds the actual environment object. */
let _currentEnvironment: ArnoEnvironment | undefined = undefined;

/** Exposes the current `GopherEnvironment` via `current()`. */
const Environment = {
  /** Returns the current environment. */
  current(): ArnoEnvironment {
    return { ..._currentEnvironment! };
  },

  /** Sets the current environment. Call as early as possible during startup. */
  set(environment: ArnoEnvironment) {
    if (_currentEnvironment === undefined) {
      _currentEnvironment = environment;
    } else {
      // TODO: force a crash?
    }
  },
};

Object.freeze(Environment);
export { Environment };
