import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { GrabbedIssue } from '../../../api/models/GrabbedIssue';
import { JiraIssue } from '../../../api/models/JiraIssue';
import { Environment } from '../../../Environment';
import { RootState } from '../../../model/store';
import { getGrabbedIssuesGroupedByDate, GrabbedIssueGroup } from '../../../util/Issue.util';
import { Project } from '../components/Project';
import { confirmAlert } from 'react-confirm-alert';
import { JPickerModal } from '../components/shared/JPickerModal';

export type ProjectProps = {
  projectKey: string;
  loadingIssues: boolean;
  issues: JiraIssue[];
  loadingIncIssues: boolean;
  incompleteIssues: JiraIssue[];
  loadingGrabbedIssues: boolean;
  grabbedIssueGroups: GrabbedIssueGroup[];
  disabledIssueKey: string | null;
  userClickedUpdateIncompleteIssue: (issue: JiraIssue) => void;
  userClickedUpdateGrabbedIssue: (issue: GrabbedIssue) => void;
  userClickedCheckGrabbedIssue: (issue: GrabbedIssue, checked: boolean) => void;
  userClickedDeleteGrabbedIssue: (issue: GrabbedIssue) => void;
};

export const ProjectContainer = () => {
  const user = useSelector((state: RootState) => state.user.profile);

  const [loadingIssues, setLoadingIssues] = useState(false);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loadingGrabbedIssues, setLoadingGrabbedIssues] = useState(false);
  const [grabbedIssues, setGrabbedIssues] = useState<GrabbedIssue[]>([]);
  const [grabbedIssueGroups, setGrabbedIssueGroups] = useState<GrabbedIssueGroup[]>([]);
  const [incompleteIssues, setIncompleteIssues] = useState<JiraIssue[]>([]);
  const [disabledIssueKey, setDisabledIssueKey] = useState<string | null>(null);

  const { jiraAPI, api } = Environment.current();
  const { id: projectKey } = useParams<{ id: string }>();

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

  // Fetches issues based on [projectKey]
  useEffect(() => {
    if (!projectKey) return;
    (async () => {
      setLoadingIssues(true);
      const result = await jiraAPI.getProjectIssues(projectKey);
      setLoadingIssues(false);

      if (result.success) {
        setIssues(result.value);
      } else {
        toast.error(result.error);
      }
    })();
  }, [jiraAPI, projectKey]);

  // Fetches grabbed issues based on [projectKey]
  useEffect(() => {
    if (!projectKey || !user?.emailAddress) return;
    getGrabbedIssues(projectKey, user.emailAddress);
  }, [api, getGrabbedIssues, projectKey, user?.emailAddress]);

  // Fetches the incomplete issues of the current project
  useEffect(() => {
    if (!projectKey) return;
    const incompleteIssues = issues.filter(issue => {
      return grabbedIssues.findIndex(i => i._id === issue.id) === -1;
    });
    setIncompleteIssues(incompleteIssues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grabbedIssues.length, issues.length, projectKey]);

  return (
    <Project
      projectKey={projectKey}
      loadingIssues={loadingIssues}
      issues={issues}
      loadingIncIssues={loadingIssues || loadingGrabbedIssues}
      incompleteIssues={incompleteIssues}
      loadingGrabbedIssues={loadingGrabbedIssues}
      grabbedIssueGroups={grabbedIssueGroups}
      disabledIssueKey={disabledIssueKey}
      userClickedUpdateIncompleteIssue={issue => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return renderPickerModal({
              key: issue.key,
              onClose,
              onDayClick: date => {
                setDisabledIssueKey(issue.key);
                onClose();
                api
                  .createGrabbedIssue({
                    _id: issue.id,
                    key: issue.key,
                    projectKey,
                    summary: issue.fields.summary,
                    assigneeEmail: issue.fields.assignee.emailAddress,
                    dateCompleted: date.toJSON(),
                    isDone: false,
                  })
                  .then(() => {
                    toast.success('Issue marked as grabbed!');
                    getGrabbedIssues(projectKey, issue.fields.assignee.emailAddress);
                    setDisabledIssueKey(null);
                  })
                  .catch(error => {
                    toast.error(error.message);
                    setDisabledIssueKey(null);
                  });
              },
            });
          },
        });
      }}
      userClickedUpdateGrabbedIssue={issue => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return renderPickerModal({
              key: issue.key,
              onClose,
              onDayClick: date => {
                setDisabledIssueKey(issue.key);
                onClose();
                api
                  .updateGrabbedIssue(issue._id, { dateCompleted: date.toJSON() })
                  .then(() => {
                    toast.success('Issue updated!');
                    getGrabbedIssues(projectKey, issue.assigneeEmail);
                    setDisabledIssueKey(null);
                  })
                  .catch(error => {
                    toast.error(error.message);
                    setDisabledIssueKey(null);
                  });
              },
            });
          },
        });
      }}
      userClickedCheckGrabbedIssue={(issue, checked) => {
        setDisabledIssueKey(issue.key);
        api
          .updateGrabbedIssue(issue._id, { isDone: checked })
          .then(() => {
            toast.success('Issue updated!');
            getGrabbedIssues(projectKey, issue.assigneeEmail);
            setDisabledIssueKey(null);
          })
          .catch(error => {
            toast.error(error.message);
            setDisabledIssueKey(null);
          });
      }}
      userClickedDeleteGrabbedIssue={issue => {
        setDisabledIssueKey(issue.key);
        api
          .deleteGrabbedIssue(issue._id)
          .then(() => {
            toast.success('Issue deleted!');
            getGrabbedIssues(projectKey, issue.assigneeEmail);
            setDisabledIssueKey(null);
          })
          .catch(error => {
            toast.error(error.message);
            setDisabledIssueKey(null);
          });
      }}
    />
  );
};

/**
 * Renders datepicker modal
 * @param args
 * @returns
 */
const renderPickerModal = (args: { key: string; onClose: () => void; onDayClick: (date: Date) => void }) => {
  return (
    <JPickerModal
      isOpen={true}
      title={`When are you planning to complete ${args.key}?`}
      onDayClick={args.onDayClick}
      onClose={args.onClose}
    />
  );
};
