export type Auth0Service = {
  authorize: (scopes: string[]) => Promise<boolean>;
  logout: () => Promise<void>;
};

/** an authentication service backed by Auth0 */
export function auth0Service(options: { domain: string; clientID: string }): Auth0Service {
  return {
    /**
     * TODO: actually implement
     * @param scopes
     */
    authorize: async scopes => Promise.resolve(true),

    /**
     * TODO: actually implement
     */
    logout: () => Promise.resolve(),
  };
}
