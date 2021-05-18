import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../Environment';
import { jStorageKeys } from '../services/LocalStorageService';

type Args = {
  baseUrl: string;
  url: string;
  method?: 'POST' | 'GET' | 'PATCH';
  /** Data for when doing a POST request */
  data?: Object;
  /** Whether or not to prepend a cors-everywhere proxy */
  prefixed?: boolean;
};

export const jFetch = async (args: Args) => {
  const { prefixed = true } = args;
  const { services } = Environment.current();
  const { logger, storage } = services;

  const proxy = prefixed ? 'https://cors-anywhere.herokuapp.com/' : '';
  const apiKey = storage.getToken(jStorageKeys.J_API_TOKEN);
  const init: AxiosRequestConfig = {
    url: `${proxy}${args.baseUrl}${args.url}`,
    method: args.method || 'GET',
    data: args.data,
    headers: {
      'X-Atlassian-Token': 'no-check',
      Accept: 'application/json',
      Authorization: `Basic ${apiKey}`,
    },
  };

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
      const errorMessage = typeof errorData === 'string' ? errorData : error.response.data.title;
      throw new Error(errorMessage);
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
