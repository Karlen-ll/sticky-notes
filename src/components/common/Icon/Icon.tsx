import cx from 'classnames'
import './Icon.scss'

type OnlyObjectAndUndefined = {
  [key: string]: object | undefined
}

interface IconProps {
  name: 'loader' | 'close' | 'pen'
  size?: number
  isActive?: boolean
  className?: string
  activeClass?: string
}

const defaultIconProps = { aspectRatio: 1 }
const dataMap: OnlyObjectAndUndefined = {} // Props by iconName

const iconMap = {
  loader: (
    <>
      <circle cx="64" cy="8.6" r="8.6" />
      <circle cx="64" cy="119.4" r="8.6" style={{ opacity: 0.6 }} />
      <circle cx="8.6" cy="64" r="8.6" style={{ opacity: 0.9 }} />
      <circle cx="119.4" cy="64" r="8.6" style={{ opacity: 0.3 }} />
      <circle cx="24.9" cy="24.9" r="8.6" />
      <circle cx="103.1" cy="103.1" r="8.6" style={{ opacity: 0.45 }} />
      <circle cx="24.9" cy="103.1" r="8.6" style={{ opacity: 0.75 }} />
      <circle cx="103.1" cy="24.9" r="8.6" style={{ opacity: 0.15 }} />
    </>
  ),
  close: (
    <path d="M0 113v-3c.7-3.5 2.9-6 5.3-8.5 12.2-12.1 24.3-24.3 36.4-36.4.3-.3.8-.6 1.3-.9-.6-.6-.9-1-1.2-1.3L5.3 26.4C2.8 24 .6 21.5 0 18v-3C2.6 7.6 7.6 2.6 15 0h3c3.5.6 6 2.8 8.4 5.2C38.6 17.5 50.8 29.6 63 41.8c.3.3.7.6 1.3 1.2.3-.5.5-.9.9-1.3l36.5-36.5c2.4-2.4 4.9-4.6 8.4-5.3h3c3.5.6 6.1 2.7 8.4 5.2.9 1 1.9 1.9 2.9 2.9.4.4.9.9 1.3 1.4 3.7 4.6 3.2 10.8-1.3 15.3L86.3 62.8 85 64.1c.5.3.9.6 1.3.9 12.6 12.5 25.1 25.1 37.6 37.6l1.4 1.4c3.7 4.3 3.7 10.6-.1 14.7-2 2.2-4.1 4.2-6.3 6.3-2 1.8-4.4 2.7-7.1 2.8-3.5.1-6.4-1.4-8.9-3.9-12.6-12.7-25.3-25.3-38-38-.3-.3-.6-.6-1-.9l-6.4 6.4c-11 11-22 22-33 32.9-4.7 4.7-11.5 4.7-16.3 0-1-1-2-2.1-3.1-3.1-2.4-2.1-4.5-4.7-5.1-8.2z" />
  ),
  pen: (
    <path d="M128 23.5c-.2.7-.3 1.4-.6 2-.8 1.7-1.5 3.7-2.7 5-3.3 3.6-7 6.9-10.4 10.3L87.2 13.7c3.3-3.4 6.6-7.2 10.3-10.4 4.8-4.3 13-4.2 17.8.1 3.3 3 6.4 6.2 9.5 9.4 1.9 2 2.7 4.6 3.3 7.2-.1 1.1-.1 2.3-.1 3.5zM79 21.6 106.4 49l-.9.9-68.9 68.9c-.7.7-1.8 1.3-2.7 1.5-10 2.6-20 5-30 7.5-2.7.7-4.3-1-3.7-3.7 2.5-10.1 5-20.3 7.6-30.4.2-.7.6-1.5 1.1-2C32 68.5 55.2 45.3 78.3 22.2c.2-.2.5-.4.7-.6z" />
  ),
}

const Icon = ({ name, size = 32, className = '', isActive = false, activeClass = 'icon--active' }: IconProps) => {
  const iconProps = {
    ...defaultIconProps,
    ...dataMap[name],
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx('icon', `icon--${name}`, { [activeClass as string]: isActive }, className)}
      viewBox="0 0 128 128"
      role="presentation"
      width={size * iconProps.aspectRatio}
      height={size}
    >
      {iconMap[name]}
    </svg>
  )
}

export default Icon
