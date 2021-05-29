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

export type ProjectProps = {
  projectKey: string;
  loadingIssues: boolean;
  issues: JiraIssue[];
  loadingIncIssues: boolean;
  incompleteIssues: JiraIssue[];
  loadingGrabbedIssues: boolean;
  grabbedIssueGroups: GrabbedIssueGroup[];
  handleUpdateIncompleteIssue: (issue: JiraIssue) => void;
  handleUpdateGrabbedIssue: (issue: GrabbedIssue) => void;
  handleCheckGrabbedIssue: (issue: GrabbedIssue, checked: boolean) => void;
  handleDeleteGrabbedIssue: (issue: GrabbedIssue) => void;
};

export const ProjectContainer = () => {
  const user = useSelector((state: RootState) => state.user.profile);

  const [loadingIssues, setLoadingIssues] = useState(false);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loadingGrabbedIssues, setLoadingGrabbedIssues] = useState(false);
  const [grabbedIssues, setGrabbedIssues] = useState<GrabbedIssue[]>([]);
  const [grabbedIssueGroups, setGrabbedIssueGroups] = useState<GrabbedIssueGroup[]>([]);
  const [incompleteIssues, setIncompleteIssues] = useState<JiraIssue[]>([]);

  const { jiraAPI, api, services } = Environment.current();
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

  //Fetches grabbed issues based on [projectKey]
  useEffect(() => {
    if (!projectKey || !user?.emailAddress) return;
    getGrabbedIssues(projectKey, user.emailAddress);
  }, [api, getGrabbedIssues, projectKey, user?.emailAddress]);

  // Fetches the incomplete issues of the current project
  useEffect(() => {
    if (!projectKey) return;
    const incompleteIssues = issues.filter(issue => {
      return grabbedIssues.findIndex(i => i.id === issue.id) === -1;
    });
    setIncompleteIssues(incompleteIssues);
  }, [grabbedIssues, issues, projectKey]);

  return (
    <Project
      projectKey={projectKey}
      loadingIssues={loadingIssues}
      issues={issues}
      loadingIncIssues={loadingIssues || loadingGrabbedIssues}
      incompleteIssues={incompleteIssues}
      loadingGrabbedIssues={loadingGrabbedIssues}
      grabbedIssueGroups={grabbedIssueGroups}
      handleUpdateIncompleteIssue={() => {}}
      handleUpdateGrabbedIssue={() => {}}
      handleCheckGrabbedIssue={() => {}}
      handleDeleteGrabbedIssue={() => {}}
    />
  );
};
