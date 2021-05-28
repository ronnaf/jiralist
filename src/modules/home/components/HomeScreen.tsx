import React from 'react';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';
import { JModal } from '../../core/JModal';
import { JRawDiv } from '../../core/JRawDiv';
import { SizedBox } from '../../core/SizedBox';
import { colors, H1 } from '../../core/Styles';
import { HomeProps } from '../containers/HomeContainer';
import { JHeader } from '../../core/JHeader';
import { JSidebar } from '../../core/JSidebar';

export const HomeScreen = (props: HomeProps) => {
  const onDayClick = (date: Date) => {
    if (props.selectedIncIssue) {
      props.userCreatedGrabbedIssue(date);
    } else if (props.selectedGrabbedIssue) {
      props.userUpdatedGrabbedIssue(date);
    }
  };

  return (
    <MainDiv>
      <InnerDiv>
        <JHeader displayName={props.currentUser?.displayName || '-'} />
        <Main>
          <JSidebar
            projects={props.projects}
            loading={props.loadingProjects}
            handleLogout={props.userClickedLogout}
            handleProjectChange={props.userChangedCurrentProject}
          />
          <Body>Hello world!</Body>
        </Main>
      </InnerDiv>
      <JModal isOpen={props.pickerOpen}>
        <JRawDiv>
          <H1 color={colors.background1}>When are you planning to complete {props.selectedIncIssue?.key}?</H1>
          <SizedBox height={10} />
          <PickerDiv>
            <DayPicker todayButton="Today" onDayClick={onDayClick} onTodayButtonClick={onDayClick} />
          </PickerDiv>
        </JRawDiv>
      </JModal>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  background-color: ${colors.background1};
  min-height: 100vh;
`;

const InnerDiv = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 3rem;
`;

const Body = styled.div`
  padding-left: 1.5rem;
  & > :not(:last-child) {
    margin-bottom: 28px;
  }
`;

const PickerDiv = styled.div`
  border: 1px solid ${colors.shadow};
  border-radius: 4px;

  .DayPicker-Footer {
    text-align: center;
  }
`;
