import React, {useRef, MouseEvent, useState} from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';

// Style
import './Card.scss';

// Types
import {Note} from '../../global/notes';

// Constants
import {SM_THROTTLE_TIME, THROTTLE_TIME} from '../../global/constants';

// Utils
import {dispatchEvent} from '@utils/index';

// Components
import CardInner from './CardInner';

// Helpers
interface NoteProps {
  data: Note;
  className?: string;
  isDraggable?: boolean;
  isArchived?: boolean;
  isActiveDragMode?: boolean;
}

const Card = ({data, isArchived, isActiveDragMode, isDraggable, className}: NoteProps) => {
  const refCard = useRef<HTMLDivElement>(null);
  const [isDragOver, isDragOverSet] = useState<boolean>(false);
  const [isActive, isActiveSet] = useState<boolean>(false);

  const getCardState = () => {
    let rect = {} as DOMRect;
    let [offsetWidth, offsetHeight] = [0, 0];

    if (refCard && refCard.current) {
      const ref = refCard.current as HTMLDivElement;

      rect = ref.getBoundingClientRect() as DOMRect;
      offsetWidth = ref.offsetWidth;
      offsetHeight = ref.offsetHeight;
    }

    return {
      x: rect.x || 0,
      y: rect.y || 0,
      top: rect.top || 0,
      left: rect.left || 0,
      right: rect.right || 0,
      bottom: rect.bottom || 0,
      width: rect.width || 0,
      height: rect.height || 0,
      offsetHeight,
      offsetWidth,
    };
  };

  /** Handlers */

  const handleMouseDown = throttle((event: MouseEvent) => {
    const {top, left, offsetHeight, offsetWidth} = getCardState();
    const {pageX: x, pageY: y} = event;

    if (event.target instanceof Element) {
      if (event.target.closest('.card__edit-button')) return;
    }

    dispatchEvent('startDragElement', {
      state: {
        x,
        y,
        top: y - top,
        left: x - left,
        width: offsetWidth,
        height: offsetHeight,
      },
      note: data,
    });
  }, SM_THROTTLE_TIME);

  const handleMouseMove = throttle((event: MouseEvent) => {
    const {top, offsetHeight} = getCardState();

    isDragOverSet(offsetHeight / 2 > event.pageY - top);
  }, SM_THROTTLE_TIME);

  const handleMouseEnter = throttle(() => isActiveSet(true), THROTTLE_TIME);
  const handleMouseLeave = throttle(() => isActiveSet(false), THROTTLE_TIME);

  const handleMouseUp = throttle(() => {
    if (isActiveDragMode && isActive && !isDraggable) {
      dispatchEvent('endDragElement', {
        section: data.section,
        id: data.id,
        isDragOver,
      });
    }
  }, SM_THROTTLE_TIME);

  /** Helpers */

  const classNames = cx(
    'card',
    {'card--draggable': isDraggable},
    {[`card--${data.size}`]: data.size},
    {[`card--${data.color}`]: data.color},
    {[`card--${isDragOver ? `over` : `under`}`]: isActiveDragMode && isActive},
    className,
  );

  return (
    <div
      ref={refCard}
      className={classNames}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <CardInner data={data} isArchived={isArchived} />
    </div>
  );
};

export default Card;
