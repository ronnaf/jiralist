export type LoggingService = {
  /**
   * A log function that doesn't get invoked in production
   * @param message
   */
  log: (message?: any, ...optionalParams: any[]) => void;
};

/** A service to safely leave log statements  */
export const LocalLoggingService: LoggingService = {
  log: (message, ...optionalParams) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...optionalParams);
    }
  },
};
