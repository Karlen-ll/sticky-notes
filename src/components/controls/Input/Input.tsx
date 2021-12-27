import React, {ChangeEvent, forwardRef} from 'react';
import cx from 'classnames';

// Style
import './Input.scss';

interface InputProps {
  name: string;
  value?: string;
  label: string;
  type: string;
  className?: string;
  onChange?: (event: ChangeEvent) => void | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({value, name, label, type, className, onChange, ...restProps}, ref) => {
    return (
      <label className="input__label">
        <input
          ref={ref}
          type={type}
          name={name}
          defaultValue={value}
          className={cx('input', className)}
          placeholder={label}
          onChange={onChange}
          {...restProps}
        />
      </label>
    );
  },
);

export default Input;
