export type LocalStorageService = {
  /** retrieves token from localStorage */
  getToken: (key: string) => string | null;
  /** stores token with [key] to localStorage */
  storeToken: (key: string, value: string) => void;
  /** removes value with [key] from localStorage */
  removeToken: (key: string) => void;
  /** clears localStorage contents */
  clear: () => void;
};

export const jStorageKeys = {
  J_API_TOKEN: 'J_API_TOKEN',
  J_CLOUD_ID: 'J_CLOUD_ID',
};

export const localStorageService: LocalStorageService = {
  getToken: key => localStorage.getItem(key),
  storeToken: (key, value) => localStorage.setItem(key, value),
  removeToken: key => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
