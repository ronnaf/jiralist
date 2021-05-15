import React from 'react';
import { HomeProps } from '../containers/HomeContainer';

export const HomeScreen: React.FC<HomeProps> = ({ profile }) => {
  return <div style={styles.container}>Hello world! {profile?.firstName ?? '[!] Cannot read state'}</div>;
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
