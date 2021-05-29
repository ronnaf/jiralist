import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Environment } from '../../../Environment';
import { routes } from '../../../routes';
import { jStorageKeys } from '../../../services/LocalStorageService';
import { LoginScreen } from '../components/LoginScreen';
import qs from 'query-string';
import { toast } from 'react-toastify';

export type LoginProps = {
  loading: boolean;
  userClickedGo: () => void;
};

export const LoginContainer = () => {
  const [loading, setLoading] = useState(false);

  const { services, jiraAPI } = Environment.current();
  const history = useHistory();
  const location = useLocation();
  const query = qs.parse(location.search);

  // Redirect to /home if already authenticated
  // else exchange authorization code for access token
  useEffect(() => {
    const isAuthenticated = !!services.storage.getToken(jStorageKeys.J_API_TOKEN);
    if (isAuthenticated) {
      history.replace(routes.PROJECTS);
      return;
    }

    if (!query.code) return;
    (async () => {
      setLoading(true);
      const tokenRes = await jiraAPI.getAccessToken(query.code as string);
      setLoading(false);

      if (tokenRes.success) {
        const { access_token } = tokenRes.value;

        setLoading(true);
        const cloudRes = await jiraAPI.getCloudId(access_token);
        setLoading(false);

        if (cloudRes.success) {
          const { id: cloudId } = cloudRes.value[0];
          services.storage.storeToken(jStorageKeys.J_API_TOKEN, access_token);
          services.storage.storeToken(jStorageKeys.J_CLOUD_ID, cloudId);
          history.replace(routes.PROJECTS);
        } else {
          toast.error(cloudRes.error);
        }
      } else {
        toast.error(tokenRes.error);
      }
    })();
  }, [history, jiraAPI, query.code, services.storage]);

  return (
    <LoginScreen
      loading={loading}
      userClickedGo={() => {
        const authUrl = jiraAPI.constructAuthUrl();
        window.location.replace(authUrl);
      }}
    />
  );
};
