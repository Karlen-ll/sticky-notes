import {Children, MouseEvent} from 'react';
import cx from 'classnames';

import './Button.scss';

type OnlyStringsAndUndefined = {
  [key: string]: string | undefined;
};

type ButtonTag = 'div' | 'button' | 'link';

interface ButtonProps {
  tagName?: ButtonTag;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'lg' | '';
  type?: 'button' | 'submit' | 'reset' | undefined;
  label?: string;
  disabled?: boolean;
  tabIndex?: number;
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (event: MouseEvent) => void;
}

const variantMap: OnlyStringsAndUndefined = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  icon: 'btn--icon',
};

const sizeMap: OnlyStringsAndUndefined = {
  sm: 'btn--sm',
  lg: 'btn--lg',
};

const Button = ({
  tagName = 'div',
  className,
  variant = 'primary',
  size = '',
  label,
  type,
  disabled,
  children,
  onClick,
  ...restProps
}: ButtonProps) => {
  const Tag = tagName;

  return (
    <Tag
      className={cx('btn', variantMap[variant], sizeMap[size], className, {'btn--disabled': disabled})}
      role="button"
      type={tagName === 'button' ? type : undefined}
      aria-label={label}
      onClick={!disabled ? onClick : undefined}
      {...restProps}
    >
      {Children.map(children, child => child)}
    </Tag>
  );
};

export default Button;
