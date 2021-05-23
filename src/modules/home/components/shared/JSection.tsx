import React from 'react';
import styled from 'styled-components';
import { JSpinner } from '../../../core/JSpinner';
import { SizedBox } from '../../../core/SizedBox';
import { H1, Subtitle } from '../../../core/Styles';

type Props = {
  loading?: boolean;
  title: string;
  subtitle: string;
};

export const JSection: React.FC<Props> = props => {
  return (
    <div>
      <SectionLabel>
        <div>
          <H1>{props.title}</H1>
          <Subtitle>{props.subtitle}</Subtitle>
        </div>
        {props.loading && <JSpinner />}
      </SectionLabel>
      <SizedBox height={10} />
      {props.children}
    </div>
  );
};

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
