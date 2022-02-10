import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

export interface ButtonProps {
  children: React.ReactNode;

  href?: string;
  to?: string;
  size?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;

  inverse?: boolean;
  danger?: boolean;
  disabled?: boolean;

  onClick?: () => void;
}

export default function Button(props: ButtonProps): JSX.Element {
  const buttonSizeClassName = `button--${props.size || 'default'}`;
  const buttonInverseClassName = `${props.inverse ? 'button--inverse' : ''}`;
  const buttonDangerClassName = `${props.danger ? 'button--danger' : ''}`;
  const buttonClassNames = `button ${buttonSizeClassName} ${buttonInverseClassName} ${buttonDangerClassName}`;

  if (props.href) {
    return (
      <a className={buttonClassNames} href={props.href}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} className={buttonClassNames}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassNames}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
