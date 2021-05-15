import React from 'react';
import { ArnoButton } from '../../core/ArnoButton';
import { TodoAddProps } from '../containers/TodoAddContainer';

export const TodoAddScreen: React.FC<TodoAddProps> = ({ userClickedButton }) => {
  return (
    <div style={styles.container}>
      <div>Add todo</div>
      <ArnoButton title="Todo list" onClick={userClickedButton} />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
