import React from 'react';
import cx from "classnames";

// Style
import './Loader.scss';

// Components
import { ReactComponent as SvgIcon } from '@assets/logo.svg';

function Loader({className, ...params}) {
  return (
    <SvgIcon className={cx('loader', className)} {...params}/>
  );
}

export default Loader;
