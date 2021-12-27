import React, {FormEvent} from 'react';
import cx from 'classnames';

// Style
import './Picker.scss';

function Picker({
  list,
  title,
  type,
  className,
  onChange,
  checkedItem = 'default',
}: {
  list: string[];
  title: string;
  type: string;
  className?: string;
  checkedItem?: string;
  onChange?: (event: FormEvent) => void | undefined;
}) {
  return (
    <div className={cx('picker', `picker--${type}`, className)} onChange={onChange}>
      <fieldset className="picker__fieldset">
        <legend className="picker__legend">{title}:</legend>

        <div className="picker__list" role="list">
          {list.map(item => (
            <div className={`picker__item picker__item--${item}`} role="listitem" key={item}>
              <label className="picker__label">
                <input
                  className="picker__input"
                  type="radio"
                  name={type}
                  value={item}
                  defaultChecked={checkedItem === item}
                />

                <span>{item}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Picker;
