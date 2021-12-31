import React, {useRef, MouseEvent, useState} from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';

// Style
import './Card.scss';

// Constants, Types & interfaces
import {Note} from '@global/notes';
import {SM_THROTTLE_TIME, THROTTLE_TIME} from '@global/constants';

// Utils
import {dispatchEvent, getHTMLElementState} from '@utils/index';

// Components
import CardInner from './CardInner';

// Helpers
const BUTTON_CLASS = '.card__edit-button';

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

  /** Handlers */

  const handleMouseDown = throttle((event: MouseEvent) => {
    const {top, left, offsetHeight, offsetWidth} = getHTMLElementState(refCard?.current);
    const {pageX: x, pageY: y, target} = event;

    if (target instanceof Element && target.closest(BUTTON_CLASS)) return;

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
    if (isActiveDragMode) {
      const {top, offsetHeight} = getHTMLElementState(refCard?.current);

      isDragOverSet(offsetHeight / 2 > event.pageY - top);
    }
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
