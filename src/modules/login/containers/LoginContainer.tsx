import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Environment } from '../../../Environment';
import { routes } from '../../../routes';
import { jStorageKeys } from '../../../services/LocalStorageService';
import { LoginScreen } from '../components/LoginScreen';
import { toast } from 'react-toastify';

export type LoginProps = {
  formState: FormState;
  userClickedGo: () => void;
  userUpdatedForm: React.Dispatch<React.SetStateAction<FormState>>;
};

type FormState = {
  email: string;
  apiKey: string;
};

const initFormState: FormState = {
  email: '',
  apiKey: '',
};

export const LoginContainer = () => {
  const [formState, setFormState] = useState(initFormState);

  const { services } = Environment.current();
  const history = useHistory();

  // redirect to /home if already authenticated
  useEffect(() => {
    const isAuthenticated = !!services.storage.getToken(jStorageKeys.J_API_TOKEN);
    if (isAuthenticated) {
      history.replace(routes.PROJECTS);
    }
  }, [history, services.storage]);

  return (
    <LoginScreen
      formState={formState}
      userUpdatedForm={setFormState}
      userClickedGo={() => {
        if (!formState.email || !formState.apiKey) {
          toast.error('you must supply email and api key fields');
          return;
        }

        const base64ApiKey = btoa(`${formState.email}:${formState.apiKey}`);
        services.storage.storeToken(jStorageKeys.J_API_TOKEN, base64ApiKey);
        history.push(routes.PROJECTS);
      }}
    />
  );
};
