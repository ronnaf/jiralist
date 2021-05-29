import React from 'react';
import { SizedBox } from '../../core/SizedBox';
import { H1, Regular } from '../../core/Styles';

export const Landing = () => {
  return (
    <div>
      <H1>Welcome to Jiralist!</H1>
      <SizedBox height={8} />
      <Regular>Get started by choosing a project from the sidebar.</Regular>
    </div>
  );
};
