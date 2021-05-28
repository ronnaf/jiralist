import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { GrabbedIssue } from '../../../api/models/GrabbedIssue';
import { JiraIssue } from '../../../api/models/JiraIssue';
import { JiraProject } from '../../../api/models/JiraProject';
import { JiraUser } from '../../../api/models/JiraUser';
import { Environment } from '../../../Environment';
import { projectSlice } from '../../../model/projectSlice';
import { LOGOUT_ACTION, RootState } from '../../../model/store';
import { userSlice } from '../../../model/userSlice';
import { routes } from '../../../routes';
import { GrabbedIssueGroup, getGrabbedIssuesGroupedByDate } from '../../../util/Issue.util';
import { HomeScreen } from '../components/HomeScreen';

export type HomeProps = {
  projects: JiraProject[];
  issues: JiraIssue[];
  currentProject: JiraProject | null;
  currentUser: JiraUser | null;
  loadingIssues: boolean;
  loadingProjects: boolean;
  grabbedIssues: GrabbedIssue[];
  loadingGrabbedIssues: boolean;
  bannerShown: boolean;
  grabbedIssueGroups: GrabbedIssueGroup[];
  incompleteIssues: JiraIssue[];
  pickerOpen: boolean;
  selectedIncIssue: JiraIssue | null;
  selectedGrabbedIssue: GrabbedIssue | null;
  userClickedLogout: () => void;
  userChangedCurrentProject: React.Dispatch<React.SetStateAction<JiraProject | null>>;
  userToggledBanner: () => void;
  userClickedUpdateIncompleteIssue: (issue: JiraIssue) => void;
  userCreatedGrabbedIssue: (date: Date) => void;
  userUpdatedGrabbedIssue: (date: Date) => void;
  userClickedUpdateGrabbedIssue: (issue: GrabbedIssue) => void;
  userToggledCheckGrabbedIssue: (issue: GrabbedIssue, checked: boolean) => void;
  userDeletedGrabbedIssue: (issue: GrabbedIssue) => void;
};

// TODO: do srp
export const HomeContainer = () => {
  const projects = useSelector((state: RootState) => state.project.list);
  const user = useSelector((state: RootState) => state.user.profile);
  const [currentProject, setCurrentProject] = useState<JiraProject | null>(null);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [grabbedIssues, setGrabbedIssues] = useState<GrabbedIssue[]>([]);
  const [loadingGrabbedIssues, setLoadingGrabbedIssues] = useState(false);
  const [bannerShown, setBannerShown] = useState(true);
  const [grabbedIssueGroups, setGrabbedIssueGroups] = useState<GrabbedIssueGroup[]>([]);
  const [incompleteIssues, setIncompleteIssues] = useState<JiraIssue[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedIncIssue, setSelectedIncIssue] = useState<JiraIssue | null>(null);
  const [selectedGrabbedIssue, setSelectedGrabbedIssue] = useState<GrabbedIssue | null>(null);

  const { jiraAPI, api, services } = Environment.current();
  const dispatch = useDispatch();
  const history = useHistory();

  const getGrabbedIssues = useCallback(
    async (projectKey: string, assigneeEmail: string) => {
      setLoadingGrabbedIssues(true);
      const result = await api.getGrabbedIssues({ projectKey, assigneeEmail });
      setLoadingGrabbedIssues(false);
      if (result.success) {
        setGrabbedIssues(result.value);
        setGrabbedIssueGroups(getGrabbedIssuesGroupedByDate(result.value));
      } else {
        toast.error(result.error);
      }
    },
    [api]
  );

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

  // Listen to changes in current project, and fetches grabbed issues of that project
  useEffect(() => {
    if (!currentProject?.key || !user?.emailAddress) return;
    getGrabbedIssues(currentProject.key, user.emailAddress);
  }, [api, currentProject?.key, getGrabbedIssues, user?.emailAddress]);

  // Fetches the incomplete issues of the current project
  useEffect(() => {
    if (!currentProject?.key) return;
    const incompleteIssues = issues.filter(issue => {
      return grabbedIssues.findIndex(i => i.id === issue.id) === -1;
    });
    setIncompleteIssues(incompleteIssues);
  }, [currentProject?.key, grabbedIssues, issues]);

  return (
    <HomeScreen
      projects={projects}
      issues={issues}
      currentProject={currentProject}
      currentUser={user}
      grabbedIssues={grabbedIssues}
      loadingIssues={loadingIssues}
      loadingProjects={loadingProjects}
      loadingGrabbedIssues={loadingGrabbedIssues}
      bannerShown={bannerShown}
      grabbedIssueGroups={grabbedIssueGroups}
      incompleteIssues={incompleteIssues}
      pickerOpen={pickerOpen}
      selectedIncIssue={selectedIncIssue}
      selectedGrabbedIssue={selectedGrabbedIssue}
      userChangedCurrentProject={setCurrentProject}
      userClickedLogout={() => {
        services.storage.clear();
        dispatch({ type: LOGOUT_ACTION });
        history.push(routes.LOGIN);
      }}
      userToggledBanner={() => setBannerShown(!bannerShown)}
      userClickedUpdateIncompleteIssue={issue => {
        setSelectedIncIssue(issue);
        setPickerOpen(true);
      }}
      userCreatedGrabbedIssue={date => {
        setPickerOpen(false);
        if (selectedIncIssue && currentProject) {
          const payload = {
            id: selectedIncIssue.id,
            key: selectedIncIssue.key,
            projectKey: currentProject.key,
            summary: selectedIncIssue.fields.summary,
            assigneeEmail: selectedIncIssue.fields.assignee.emailAddress,
            dateCompleted: date.toJSON(),
            isDone: false,
          };
          api
            .createGrabbedIssue(payload)
            .then(result => {
              toast.success('Issue marked as grabbed!');
              getGrabbedIssues(payload.projectKey, payload.assigneeEmail);
              setSelectedIncIssue(null);
            })
            .catch(e => {
              toast.error(e.message || 'Failed to update issue');
              setSelectedIncIssue(null);
            });
        }
      }}
      userClickedUpdateGrabbedIssue={issue => {
        setSelectedGrabbedIssue(issue);
        setPickerOpen(true);
      }}
      userUpdatedGrabbedIssue={date => {
        setPickerOpen(false);
        if (selectedGrabbedIssue && currentProject) {
          api
            .updateGrabbedIssue(selectedGrabbedIssue.id, {
              dateCompleted: date.toJSON(),
            })
            .then(result => {
              toast.success('Issue updated!');
              const projectKey = currentProject.key;
              const assigneeEmail = selectedGrabbedIssue.assigneeEmail;
              getGrabbedIssues(projectKey, assigneeEmail);
              setSelectedGrabbedIssue(null);
            })
            .catch(e => {
              toast.error(e.message || 'Failed to update issue');
              setSelectedGrabbedIssue(null);
            });
        }
      }}
      userToggledCheckGrabbedIssue={(issue, checked) => {
        if (currentProject) {
          api
            .updateGrabbedIssue(issue.id, {
              isDone: checked,
            })
            .then(result => {
              toast.success('Issue updated!');
              const projectKey = currentProject.key;
              const assigneeEmail = issue.assigneeEmail;
              getGrabbedIssues(projectKey, assigneeEmail);
            })
            .catch(e => {
              toast.error(e.message || 'Failed to update issue');
            });
        }
      }}
      userDeletedGrabbedIssue={issue => {
        if (currentProject) {
          api
            .deleteGrabbedIssue(issue.id)
            .then(result => {
              toast.success('Issue deleted!');
              const projectKey = currentProject.key;
              const assigneeEmail = issue.assigneeEmail;
              getGrabbedIssues(projectKey, assigneeEmail);
            })
            .catch(e => {
              toast.error(e.message || 'Failed to delete issue');
            });
        }
      }}
    />
  );
};
