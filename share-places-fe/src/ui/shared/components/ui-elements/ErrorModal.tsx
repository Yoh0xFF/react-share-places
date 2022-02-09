import React from 'react';

import Modal from './Modal';

import Button from '@app/ui/shared/components/form-elements/Button';

interface ErrorModalProps {
  error?: string;
  onClear: () => void;
}

export default function ErrorModal(props: ErrorModalProps): JSX.Element {
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
}
