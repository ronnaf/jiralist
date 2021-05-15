import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../Environment';
import { jStorageKeys } from '../services/LocalStorageService';

type Args = {
  baseUrl: string;
  url: string;
  method?: 'POST' | 'GET';
  data?: Object;
};

let requestCount = 0;

export const jFetch = async (args: Args) => {
  requestCount++;

  const { services } = Environment.current();
  const { logger, storage } = services;

  const prefix = 'https://cors-anywhere.herokuapp.com';
  const apiKey = storage.getToken(jStorageKeys.J_API_TOKEN);
  const init: AxiosRequestConfig = {
    url: `${prefix}/${args.baseUrl}${args.url}`,
    method: args.method || 'GET',
    data: args.data,
    headers: {
      'X-Atlassian-Token': 'no-check',
      Accept: 'application/json',
      Authorization: `Basic ${apiKey}`,
    },
  };

  logger.log('\n');
  logger.log(`#${requestCount} [${init.method}] - ${args.url}`);
  logger.log(`#${requestCount} [base] - ${args.baseUrl}`);
  logger.log(`#${requestCount} [Authorization]:`, init.headers.Authorization);
  logger.log(`#${requestCount} [body]:`, init.data);

  try {
    const response = await axios(init);
    logger.log(`#${requestCount} [response]:`, response.data);
    return response.data;
  } catch (error) {
    logger.log(`#${requestCount} [error.json]:`, error.toJSON());
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // logger.log(error.response.data);
      // logger.log(error.response.status);
      // logger.log(error.response.headers);

      logger.log(`#${requestCount} [error.response]:`, error.response);
      const errorData = error.response.data;
      const errorMessage = typeof errorData === 'string' ? errorData : error.response.data.title;
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.log(`#${requestCount} [error.request]:`, error.request);
      throw new Error(`Unable to process request (err: ${error.message})`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.log(`#${requestCount} [error.message]:`, error.message);
      throw new Error(error.message);
    }
  }
};
