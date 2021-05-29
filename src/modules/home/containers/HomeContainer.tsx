import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { JiraProject } from '../../../api/models/JiraProject';
import { JiraUser } from '../../../api/models/JiraUser';
import { Environment } from '../../../Environment';
import { projectSlice } from '../../../model/projectSlice';
import { LOGOUT_ACTION, RootState } from '../../../model/store';
import { userSlice } from '../../../model/userSlice';
import { routes } from '../../../routes';
import { HomeScreen } from '../components/HomeScreen';

export type HomeProps = {
  projects: JiraProject[];
  currentUser: JiraUser | null;
  loadingProjects: boolean;
  userClickedLogout: () => void;
};

export const HomeContainer = () => {
  const projects = useSelector((state: RootState) => state.project.list);
  const user = useSelector((state: RootState) => state.user.profile);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const { jiraAPI, services } = Environment.current();
  const dispatch = useDispatch();
  const history = useHistory();

  // Gets current user info on mount
  useEffect(() => {
    // if user was already stored, don't update info
    if (user?.accountId) return;
    (async () => {
      const result = await jiraAPI.getCurrentUser();
      if (result.success) {
        dispatch(userSlice.actions.receivedUser({ user: result.value }));
      } else {
        toast.error(result.error);
      }
    })();
  }, [dispatch, jiraAPI, user?.accountId]);

  // Gets recent projects on mount
  useEffect(() => {
    (async () => {
      setLoadingProjects(true);
      const result = await jiraAPI.getProjects();
      setLoadingProjects(false);
      if (result.success) {
        dispatch(projectSlice.actions.receivedList({ projects: result.value }));
      } else {
        toast.error(result.error);
      }
    })();
  }, [dispatch, jiraAPI]);

  return (
    <HomeScreen
      currentUser={user}
      projects={projects}
      loadingProjects={loadingProjects}
      userClickedLogout={() => {
        services.storage.clear();
        dispatch({ type: LOGOUT_ACTION });
        history.push(routes.LOGIN);
      }}
    />
  );
};
