import React from 'react';
import styled from 'styled-components';

type Props = {};

export const JTag: React.FC<Props> = props => {
  return (
    <Tag>
      <b>{props.children}</b>
    </Tag>
  );
};

const Tag = styled.div`
  background-color: gainsboro;
  padding: 4px;
  line-height: 1;
  aspect-ratio: 1;
  border-radius: 4px;
  font-size: 12px;
`;
