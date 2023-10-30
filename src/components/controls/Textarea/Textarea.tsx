import React, { ChangeEvent, forwardRef } from 'react'
import cx from 'classnames'

import './Textarea.scss'

interface InputProps {
  name: string
  value?: string
  label: string
  rows?: number
  className?: string
  onChange?: (event: ChangeEvent) => void | undefined
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ value, name, label, className, onChange, ...restProps }, ref) => {
    return (
      <label className="textarea__label">
        <textarea
          ref={ref}
          name={name}
          defaultValue={value}
          className={cx('textarea', className)}
          placeholder={label}
          onChange={onChange}
          {...restProps}
        />
      </label>
    )
  }
)

export default Textarea
