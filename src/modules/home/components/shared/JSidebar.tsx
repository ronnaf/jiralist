import React from 'react';
import { CubeSpinner } from 'react-spinners-kit';
import styled from 'styled-components';
import { JiraProject } from '../../../../api/models/JiraProject';
import { JButton } from '../../../core/JButton';
import { JRawButton } from '../../../core/JRawButton';
import { SizedBox } from '../../../core/SizedBox';
import { colors, H1, Regular } from '../../../core/Styles';

type Props = {
  projects: JiraProject[];
  loading: boolean;
  handleLogout: () => void;
  handleProjectChange: React.Dispatch<React.SetStateAction<JiraProject | null>>;
};

export const JSidebar = (props: Props) => {
  return (
    <Sidebar>
      <div>
        <Flex>
          <H1>Recent Projects</H1>
          {props.loading && <CubeSpinner backColor={colors.shadow} frontColor={colors.background2} size={16} />}
        </Flex>
        <SizedBox height={26} />
        <Projects>
          {props.projects.map(project => (
            <div key={project.id}>
              <JRawButton onClick={() => props.handleProjectChange(project)}>
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
