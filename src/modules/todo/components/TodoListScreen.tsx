import React from 'react';
import { ArnoButton } from '../../core/ArnoButton';
import { TodoListProps } from '../containers/TodoListContainer';

export const TodoListScreen: React.FC<TodoListProps> = ({ todos, userClickedButton }) => {
  return (
    <div style={styles.container}>
      <div>Todo list</div>
      <div>{todos.join(', ')}</div>
      <ArnoButton title="Add todo" onClick={userClickedButton} />
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
