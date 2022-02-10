import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

export interface SideDrawerProps {
  children: React.ReactNode;
  show: boolean;
  onClick: () => void;
}

export default function SideDrawer(props: SideDrawerProps): JSX.Element {
  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside ref={nodeRef} className='side-drawer' onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  const portal = document.getElementById('drawer-hook');

  if (!portal) {
    throw new Error('Portal with id "drawer-hook" doesn\'t exist');
  }

  return ReactDOM.createPortal(content, portal);
}
