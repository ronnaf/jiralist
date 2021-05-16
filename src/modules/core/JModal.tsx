import React from 'react';
import Modal from 'react-modal';

type Props = {
  isOpen: boolean;
};

export const JModal: React.FC<Props> = props => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      style={{
        overlay: {
          background: 'none',
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          bottom: 'unset',
          right: 'unset',
          background: 'none',
        },
      }}>
      {props.children}
    </Modal>
  );
};
