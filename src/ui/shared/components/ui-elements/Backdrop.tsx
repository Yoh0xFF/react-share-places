import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Backdrop.css';

interface BackdropProps {
  onClick: () => void;
  show: boolean;
}

export default function Backdrop(props: BackdropProps): JSX.Element {
  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      timeout={200}
      classNames='fade-in'
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className='backdrop' onClick={props.onClick} />
    </CSSTransition>
  );
  const portal = document.getElementById('backdrop-hook');

  if (!portal) {
    throw new Error('Portal with id "backdrop-hook" doesn\'t exist');
  }

  return ReactDOM.createPortal(content, portal);
}
