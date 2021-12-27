import {Children, MouseEvent} from 'react';
import cx from 'classnames';

// Style
import './Button.scss';

// Types & Interfaces
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
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (event: MouseEvent) => void;
}

// Helpers
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
      onClick={onClick}
      {...restProps}
    >
      {Children.map(children, child => child)}
    </Tag>
  );
};

export default Button;