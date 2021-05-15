import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // inputs
  /** title of the button */
  title: string;
}

export const ArnoButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <button style={styles.button} {...rest}>
      {title}
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#84FFFF',
    padding: 8,
    borderRadius: 4,
  },
};
