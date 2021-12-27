import React from 'react';

// Style
import './Logo.scss';

// Components
import {ReactComponent as SvgIcon} from '@assets/logo.svg';

function Logo() {
  return (
    <div className="logo">
      <SvgIcon className="logo__svg" />

      <span className="logo__title">Sticky Notes</span>
    </div>
  );
}

export default Logo;
