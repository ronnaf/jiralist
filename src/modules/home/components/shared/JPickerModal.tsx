import React from 'react';
import { JModal } from '../../../core/JModal';
import { JRawDiv } from '../../../core/JRawDiv';
import { SizedBox } from '../../../core/SizedBox';
import { colors, H1 } from '../../../core/Styles';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';

type Props = {
  isOpen: boolean;
  title: string;
  onDayClick?: (date: Date) => void;
  onClose?: () => void;
};

export const JPickerModal = (props: Props) => {
  return (
    <JModal isOpen={props.isOpen} onClose={props.onClose}>
      <JRawDiv>
        <H1 color={colors.background1}>{props.title}</H1>
        <SizedBox height={10} />
        <PickerDiv>
          <DayPicker todayButton="Today" onDayClick={props.onDayClick} onTodayButtonClick={props.onDayClick} />
        </PickerDiv>
      </JRawDiv>
    </JModal>
  );
};

const PickerDiv = styled.div`
  border: 1px solid ${colors.shadow};
  border-radius: 4px;
  text-align: center;
  .DayPicker-Footer {
    text-align: center;
  }
`;
