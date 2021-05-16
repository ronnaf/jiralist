import React from 'react';
import { CubeSpinner } from 'react-spinners-kit';
import { colors } from './Styles';

export const JSpinner = () => {
  return <CubeSpinner backColor={colors.shadow} frontColor={colors.background2} size={16} />;
};
