import cx from 'classnames';

// Style
import './Icon.scss';

// SVG icons
import {ReactComponent as IconLoader} from '@assets/icons/loader.svg';
import {ReactComponent as IconCheck} from '@assets/icons/check.svg';
import {ReactComponent as IconClose} from '@assets/icons/close.svg';
import {ReactComponent as IconHeart} from '@assets/icons/heart.svg';
import {ReactComponent as IconCopy} from '@assets/icons/copy.svg';
import {ReactComponent as IconPlus} from '@assets/icons/plus.svg';
import {ReactComponent as IconPen} from '@assets/icons/pen.svg';
import {FunctionComponent, SVGProps} from 'react';

// Types & Interfaces
type Icons = 'loader' | 'close' | 'check' | 'heart' | 'copy' | 'plus' | 'pen';

interface IconProps {
  name: Icons;
  size?: number;
  isActive?: boolean;
  className?: string;
  activeClass?: string;
}

// Helpers
/** Set default icon props */
const defaultIconProps = {aspectRatio: 1};

/** Set icon props by iconName */
const dataMap: {
  loader?: object;
  close?: object;
  check?: object;
  heart?: object;
  copy?: object;
  plus?: object;
  pen?: object;
} = {};

const iconMap = {
  loader: IconLoader,
  close: IconClose,
  check: IconCheck,
  heart: IconHeart,
  copy: IconCopy,
  plus: IconPlus,
  pen: IconPen,
};

const Icon = ({name, size = 32, className = '', isActive = false, activeClass = 'icon--active'}: IconProps) => {
  const IconComponent: FunctionComponent<SVGProps<SVGSVGElement>> = iconMap[name];

  const iconProps = {
    ...defaultIconProps,
    ...dataMap[name],
  };

  return (
    <IconComponent
      className={cx('icon', `icon--${name}`, {[activeClass as string]: isActive}, className)}
      width={size * iconProps.aspectRatio}
      height={size}
      role="presentation"
    />
  );
};

export default Icon;
