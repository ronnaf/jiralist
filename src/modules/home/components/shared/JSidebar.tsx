import React from 'react';
import styled from 'styled-components';
import { JiraProject } from '../../../../api/models/JiraProject';
import { JButton } from '../../../core/JButton';
import { JRawButton } from '../../../core/JRawButton';
import { SizedBox } from '../../../core/SizedBox';
import { colors, H1, Regular } from '../../../core/Styles';

type Props = {
  projects: JiraProject[];
  handleLogout: () => void;
};

export const JSidebar = (props: Props) => {
  return (
    <Sidebar>
      <div>
        <H1>Recent Projects</H1>
        <SizedBox height={26} />
        <Projects>
          {props.projects.map(project => (
            <div key={project.id}>
              <JRawButton>
                <Regular>{project.name}</Regular>
              </JRawButton>
            </div>
          ))}
        </Projects>
        <SizedBox height={26} />
        <JButton title="Log out" onClick={props.handleLogout} />
      </div>
      <VerticalLine />
    </Sidebar>
  );
};

const Sidebar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VerticalLine = styled.div`
  width: 1px;
  background-color: ${colors.shadow};
  height: 95%;
`;

const Projects = styled.div`
  & > :not(:last-child) {
    margin-bottom: 4px;
  }
`;
