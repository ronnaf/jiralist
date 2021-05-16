import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { CompletedIssue } from '../../../api/models/CompletedIssue';
import { JiraIssue } from '../../../api/models/JiraIssue';
import { JiraProject } from '../../../api/models/JiraProject';
import { JiraUser } from '../../../api/models/JiraUser';
import { Environment } from '../../../Environment';
import { projectSlice } from '../../../model/projectSlice';
import { LOGOUT_ACTION, RootState } from '../../../model/store';
import { userSlice } from '../../../model/userSlice';
import { routes } from '../../../routes';
import { CompletedIssueGroup, getCompletedIssuesGroupedByDate } from '../../../util/Issue';
import { HomeScreen } from '../components/HomeScreen';

export type HomeProps = {
  projects: JiraProject[];
  issues: JiraIssue[];
  currentProject: JiraProject | null;
  currentUser: JiraUser | null;
  loadingIssues: boolean;
  loadingProjects: boolean;
  completedIssues: CompletedIssue[];
  loadingCompletedIssues: boolean;
  bannerShown: boolean;
  completedIssueGroups: CompletedIssueGroup[];
  incompleteIssues: JiraIssue[];
  userClickedLogout: () => void;
  userChangedCurrentProject: React.Dispatch<React.SetStateAction<JiraProject | null>>;
  userToggledBanner: () => void;
  userClickedUpdateIncompleteIssue: () => void;
};

export const HomeContainer = () => {
  const projects = useSelector((state: RootState) => state.project.list);
  const user = useSelector((state: RootState) => state.user.profile);
  const [currentProject, setCurrentProject] = useState<JiraProject | null>(null);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [completedIssues, setCompletedIssues] = useState<CompletedIssue[]>([]);
  const [loadingCompletedIssues, setLoadingCompletedIssues] = useState(false);
  const [bannerShown, setBannerShown] = useState(true);
  const [completedIssueGroups, setCompletedIssueGroups] = useState<CompletedIssueGroup[]>([]);
  const [incompleteIssues, setIncompleteIssues] = useState<JiraIssue[]>([]);

  const { jiraAPI, api, services } = Environment.current();
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
        setCurrentProject(result.value[0]);
      } else {
        toast.error(result.error);
      }
    })();
  }, [dispatch, jiraAPI]);

  // Listens to changes in current project, and fetches issues of that project
  useEffect(() => {
    if (!currentProject?.key) return;
    (async () => {
      setLoadingIssues(true);
      const result = await jiraAPI.getProjectIssues(currentProject.key);
      setLoadingIssues(false);
      if (result.success) {
        setIssues(result.value);
      } else {
        toast.error(result.error);
      }
    })();
  }, [jiraAPI, currentProject?.key]);

  // Listen to changes in current project, and fetches completed issues of that project
  useEffect(() => {
    if (!currentProject?.key || !user?.emailAddress) return;
    (async () => {
      setLoadingCompletedIssues(true);
      const result = await api.getCompletedIssues({
        assigneeEmail: currentProject.key,
        projectKey: user.emailAddress,
      });
      setLoadingCompletedIssues(false);
      if (result.success) {
        setCompletedIssues(result.value);
        setCompletedIssueGroups(getCompletedIssuesGroupedByDate(result.value));
      } else {
        toast.error(result.error);
      }
    })();
  }, [api, currentProject?.key, user?.emailAddress]);

  // Fetches the incomplete issues of the current project
  useEffect(() => {
    if (!currentProject?.key) return;
    const incompleteIssues = issues.filter(issue => {
      return completedIssues.findIndex(i => i.id === issue.id) === -1;
    });
    setIncompleteIssues(incompleteIssues);
  }, [currentProject?.key, completedIssues, issues]);

  return (
    <HomeScreen
      projects={projects}
      issues={issues}
      currentProject={currentProject}
      currentUser={user}
      completedIssues={completedIssues}
      loadingIssues={loadingIssues}
      loadingProjects={loadingProjects}
      loadingCompletedIssues={loadingCompletedIssues}
      bannerShown={bannerShown}
      completedIssueGroups={completedIssueGroups}
      incompleteIssues={incompleteIssues}
      userChangedCurrentProject={setCurrentProject}
      userClickedLogout={() => {
        services.storage.clear();
        dispatch({ type: LOGOUT_ACTION });
        history.push(routes.LOGIN);
      }}
      userToggledBanner={() => setBannerShown(!bannerShown)}
      userClickedUpdateIncompleteIssue={() => {}}
    />
  );
};
