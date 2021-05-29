import React from 'react';
import styled from 'styled-components';
import { JSpinner } from '../../../core/JSpinner';
import { H1, Subtitle } from '../../../core/Styles';

type Props = {
  loading?: boolean;
  title: string;
  subtitle: string;
  trailing?: React.ReactNode;
};

export const JSectionLabel = (props: Props) => {
  return (
    <SectionLabel>
      <div>
        <H1>{props.title}</H1>
        <Subtitle>{props.subtitle}</Subtitle>
      </div>
      <Trailing>{props.loading ? <JSpinner /> : props.trailing}</Trailing>
    </SectionLabel>
  );
};

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Trailing = styled.div`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;
