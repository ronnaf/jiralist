import React from 'react';
import 'react-day-picker/lib/style.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import { jiraAPIClient } from './api/JiraAPIClient';
import { jiralistAPIClient } from './api/JiralistAPIClient';
import App from './App';
import { Environment } from './Environment';
import './index.css';
import { persistor, store } from './model/store';
import reportWebVitals from './reportWebVitals';
import { auth0Service } from './services/Auth0Service';
import { localStorageService } from './services/LocalStorageService';
import { LocalLoggingService } from './services/LoggingService';

const styles = {
  toast: { width: 'unset' },
};

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    justify-content: center;
    min-height: unset;
    border-radius: 4px;
  }
`;

const startup = () => {
  // 1. Set the Environment.
  Environment.set({
    api: jiralistAPIClient({
      baseURL: 'http://localhost:3000',
    }),
    jiraAPI: jiraAPIClient({
      baseURL: 'https://smashingboxes.atlassian.net',
    }),
    services: {
      auth: auth0Service({ clientID: '', domain: '' }),
      logger: LocalLoggingService,
      storage: localStorageService,
    },
  });

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
          <StyledToast position="bottom-center" hideProgressBar closeButton={false} style={styles.toast} />
        </React.StrictMode>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

startup();
