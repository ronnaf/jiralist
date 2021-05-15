import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { JiraProject } from '../../../api/models/JiraProject';
import { Environment } from '../../../Environment';
import { projectSlice } from '../../../model/projectSlice';
import { LOGOUT_ACTION, RootState } from '../../../model/store';
import { routes } from '../../../routes';
import { HomeScreen } from '../components/HomeScreen';

export type HomeProps = {
  projects: JiraProject[];
  userClickedLogout: () => void;
};

export const HomeContainer = () => {
  const { jiraAPI, services } = Environment.current();
  const dispatch = useDispatch();
  const history = useHistory();

  const projects = useSelector((state: RootState) => state.project.list);

  // Gets recent projects on mount
  useEffect(() => {
    (async () => {
      const result = await jiraAPI.getProjects();
      if (result.success) {
        dispatch(projectSlice.actions.receivedList({ projects: result.value }));
      } else {
        toast.error(result.error);
      }
    })();
  }, [dispatch, jiraAPI]);

  return (
    <HomeScreen
      projects={projects}
      userClickedLogout={() => {
        services.storage.clear();
        dispatch({ type: LOGOUT_ACTION });
        history.push(routes.LOGIN);
      }}
    />
  );
};
