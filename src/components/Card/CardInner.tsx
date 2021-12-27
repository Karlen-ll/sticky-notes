import React, {MouseEvent} from 'react';
import cx from 'classnames';

// Style
import './Card.scss';

// Utils
import {dispatchEvent} from '@utils/index';

// Constants, Types & interfaces
import {Note} from '@global/notes';

// Components
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';

const CardInner = ({data, isArchived}: {data: Note; isArchived?: boolean}) => {
  const {id, title, section, description, color, size} = data;
  const isShowedDesc = section && size !== 'sm';
  const hasId = id >= 0;

  /** Handlers */

  const handleClickEditButton = (event: MouseEvent) => {
    const card: HTMLDivElement | null = (event.target as HTMLElement).closest('.card');
    const rect = card
      ? card.getBoundingClientRect()
      : {
          top: 0,
          left: 0,
        };

    dispatchEvent('startEditElement', {
      data,
      top: rect.top,
      left: rect.left,
      width: card ? card.offsetWidth || 0 : 0,
    });
  };

  return (
    <>
      {color && <div className={cx('card__label', {[`card__label--${color}`]: color})} />}

      {!isArchived && (
        <div className="card__menu">
          <Button className="card__edit-button" variant="icon" onClick={handleClickEditButton}>
            <Icon className="card__icon" name="pen" size={16} />
          </Button>
        </div>
      )}

      <span className="card__title">
        {hasId && <span className="card__id">{id}</span>}
        {title}
      </span>

      {isShowedDesc && !isArchived && <span className="card__description">{description}</span>}
    </>
  );
};

export default CardInner;
