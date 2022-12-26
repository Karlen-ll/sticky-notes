import React, {Children} from 'react';
import cx from 'classnames';
import './ScrollBox.scss';

export interface ScrollBoxProps {
  children?: JSX.Element | JSX.Element[];
  isHorizontal?: boolean;
  className?: string;
}

/**
 * @description Component provides scrolling using css
 */
function ScrollBox({children, isHorizontal, className}: ScrollBoxProps) {
  return (
    <div className={cx('scroll-box', {'scroll-box--horizontal': isHorizontal}, className)}>
      {Children.map(children, child => child)}
    </div>
  );
}

export default ScrollBox;
