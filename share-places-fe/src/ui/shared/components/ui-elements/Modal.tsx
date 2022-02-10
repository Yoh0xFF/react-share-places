import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

export interface ModalProps {
  show: boolean;
  onCancel: () => void;

  className?: string;
  style?: React.CSSProperties;

  header?: string;
  headerClassName?: string;

  children?: React.ReactNode;
  contentClassName?: string;
  onSubmit?: () => void;

  footer?: React.ReactNode;
  footerClassName?: string;
}

function ModalOverlay(props: ModalProps): JSX.Element {
  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      timeout={200}
      classNames='modal'
      mountOnEnter
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className={`modal ${props.className}`}
        style={props.style}
      >
        <header className={`modal__header ${props.headerClassName}`}>
          <h2>{props.header}</h2>
        </header>

        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div className={`modal__content ${props.contentClassName}`}>
            {props.children}
          </div>
        </form>

        <footer className={`modal__footer ${props.footerClassName}`}>
          {props.footer}
        </footer>
      </div>
    </CSSTransition>
  );

  const portal = document.getElementById('modal-hook');
  if (!portal) {
    throw new Error('Portal with id "modal-hook" doesn\'t exist');
  }

  return ReactDOM.createPortal(content, portal);
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <>
      <Backdrop show={props.show} onClick={props.onCancel} />
      <ModalOverlay {...props} />
    </>
  );
}
