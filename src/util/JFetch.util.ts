import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../Environment';
import { jStorageKeys } from '../services/LocalStorageService';

type Args = {
  baseUrl: string;
  url: string;
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  /** Data for when doing a POST request */
  data?: Object;
  noAuth?: boolean;
};

/**
 * Requests that use OAuth 2.0 (3LO) are made via api.atlassian.com (not https://your-domain.atlassian.net).
 * Construct your request URL using the following structure:
 * - Jira apps: https://api.atlassian.com/ex/jira/{cloudid}/{api}
 *
 * @param {string} baseUrl
 * @returns
 */
export const getJiraBaseUrl = (baseUrl: string) => {
  const { services } = Environment.current();
  const { storage } = services;
  const cloudId = storage.getToken(jStorageKeys.J_CLOUD_ID);
  return `${baseUrl}/ex/jira/${cloudId}`;
};

export const jFetch = async (args: Args) => {
  const { services } = Environment.current();
  const { logger, storage } = services;

  const accessToken = storage.getToken(jStorageKeys.J_API_TOKEN);
  const init: AxiosRequestConfig = {
    url: `${args.baseUrl}${args.url}`,
    method: args.method || 'GET',
    data: args.data,
    headers: {
      Accept: 'application/json',
    },
  };

  if (!args.noAuth) {
    init.headers.Authorization = `Bearer ${accessToken}`;
  }

  const prefix = '[/' + args.url.split('/')[1].split('?')[0];
  logger.log('\n');
  logger.log(`${prefix}\t${init.method}] - ${args.url}`);
  logger.log(`${prefix}\tbase] - ${args.baseUrl}`);
  logger.log(`${prefix}\tAuthorization]:`, init.headers.Authorization);
  logger.log(`${prefix}\tbody]:`, init.data);

  try {
    const response = await axios(init);
    logger.log(`${prefix}\tresponse]:`, response.data);
    return response.data;
  } catch (error) {
    logger.log(`${prefix}\terror.json]:`, error.toJSON());
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // logger.log(error.response.data);
      // logger.log(error.response.status);
      // logger.log(error.response.headers);

      logger.log(`#${prefix}\terror.response]:`, error.response);
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        throw new Error(errorData);
      } else if (errorData.errorMessages?.length) {
        throw new Error(errorData.errorMessages[0]);
      } else {
        throw new Error(errorData.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.log(`#${prefix}\terror.request]:`, error.request);
      throw new Error(`Unable to process request (err: ${error.message})`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.log(`#${prefix}\terror.message]:`, error.message);
      throw new Error(error.message);
    }
  }
};
