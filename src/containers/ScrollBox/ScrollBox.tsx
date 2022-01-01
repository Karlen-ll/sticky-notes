import React, {Children} from 'react';
import cx from 'classnames';

// Style
import './ScrollBox.scss';

// Types & interfaces
export interface ScrollBoxProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
}

function ScrollBox({children, className}: ScrollBoxProps) {
  return <div className={cx('scroll-box', className)}>{Children.map(children, child => child)}</div>;
}

export default ScrollBox;
