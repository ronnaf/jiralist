import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { JiraProject } from '../../api/models/JiraProject';
import { Environment } from '../../Environment';
import { LOGOUT_ACTION } from '../../model/store';
import { routes } from '../../routes';
import { JButton } from './JButton';
import { JRawButton } from './JRawButton';
import { JSpinner } from './JSpinner';
import { SizedBox } from './SizedBox';
import { colors, H1, Regular, Subtitle } from './Styles';

type Props = {
  projects: JiraProject[];
  loading: boolean;
};

export const JSidebar = (props: Props) => {
  const { services } = Environment.current();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Sidebar>
      <div>
        <Flex>
          <H1>Recent Projects</H1>
          {props.loading && <JSpinner />}
        </Flex>
        <SizedBox height={26} />
        <Projects>
          {props.projects.map(project => {
            return (
              <div key={project.id}>
                <JRawButton
                  onClick={() => {
                    history.push(routes.PROJECTS__VIEW(project.key));
                  }}>
                  <Regular>{project.name}</Regular>
                </JRawButton>
              </div>
            );
          })}
        </Projects>
        <SizedBox height={36} />
        <Subtitle>
          Made with ❤️ by{' '}
          <a href="https://github.com/ronnaf" target="_blank" rel="noreferrer">
            ronnaf
          </a>
        </Subtitle>
        <SizedBox height={18} />
        <JButton
          title="Log out"
          onClick={() => {
            services.storage.clear();
            dispatch({ type: LOGOUT_ACTION });
            history.push(routes.LOGIN);
          }}
        />
      </div>
      <VerticalLine />
    </Sidebar>
  );
};

const Sidebar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VerticalLine = styled.div`
  width: 1px;
  background-color: ${colors.shadow};
`;

const Projects = styled.div`
  & > :not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > :not(:last-child) {
    margin-right: 16px;
  }
`;
