import axios from 'axios';
import { getJiraBaseUrl, jFetch } from '../util/JFetch.util';
import { Result } from '../util/Result.util';
import { JiraAPI } from './JiraAPI';

export const jiraAPIClient = (options: {
  /** The API's base URL. */
  baseURL: string;
  /** The atlassian auth base URL  */
  authBaseUrl: string;
}): JiraAPI => {
  return {
    getAccessToken: async code => {
      try {
        const response = await axios({
          method: 'POST',
          url: `${options.authBaseUrl}/oauth/token`,
          headers: { 'Content-Type': 'application/json' },
          data: {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_3LO_CLIENT_ID,
            client_secret: process.env.REACT_APP_3LO_SECRET,
            redirect_uri: process.env.REACT_APP_3LO_CALLBACK_URL,
            code,
          },
        });
        return Result.success(response.data);
      } catch (e) {
        if (e.response) {
          return Result.failure(e.response.data.error_description);
        }
        return Result.failure(e.message);
      }
    },
    getCloudId: async token => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${options.baseURL}/oauth/token/accessible-resources`,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        return Result.success(response.data);
      } catch (e) {
        if (e.response) {
          return Result.failure(e.response.data.error_description);
        }
        return Result.failure(e.message);
      }
    },
    getProjects: async () => {
      try {
        const jiraBaseUrl = getJiraBaseUrl(options.baseURL);
        const result = await jFetch({
          baseUrl: jiraBaseUrl,
          url: '/rest/api/3/project?recent=20',
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    getProjectIssues: async projectKey => {
      try {
        const jiraBaseUrl = getJiraBaseUrl(options.baseURL);
        const url = `/rest/api/3/search`;
        const result = await jFetch({
          method: 'POST',
          baseUrl: jiraBaseUrl,
          url,
          data: {
            jql: `project=${projectKey} AND assignee=currentuser() AND (status="in progress" OR status="to do")`,
            fields: ['summary', 'status', 'assignee'],
          },
        });
        return Result.success(result.issues);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
    getCurrentUser: async () => {
      try {
        const jiraBaseUrl = getJiraBaseUrl(options.baseURL);
        const result = await jFetch({
          baseUrl: jiraBaseUrl,
          url: '/rest/api/3/myself',
        });
        return Result.success(result);
      } catch (e) {
        return Result.failure(e.message);
      }
    },
  };
};
