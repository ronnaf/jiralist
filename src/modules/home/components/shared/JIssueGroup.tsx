import React from 'react';
import { SizedBox } from '../../../core/SizedBox';
import { Regular } from '../../../core/Styles';

type Props = {
  title: string;
};

export const JIssueGroup: React.FC<Props> = props => {
  return (
    <div>
      <Regular weight="bold">{props.title}</Regular>
      <SizedBox height={4} />
      {props.children}
    </div>
  );
};
