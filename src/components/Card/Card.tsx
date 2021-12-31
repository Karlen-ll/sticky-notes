import React, {useRef, MouseEvent, useState} from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';

// Style
import './Card.scss';

// Constants, Types & interfaces
import {Note} from '@global/notes';
import {SM_THROTTLE_TIME} from '@global/constants';

// Utils
import {dispatchEvent, getHTMLElementState} from '@utils/index';

// HOC
import withIsHover, {WithIsHoverProps} from '@components/hocs/withIsHover';

// Components
import CardInner from './CardInner';

// Helpers
const BUTTON_CLASS = '.card__edit-button';

interface CardProps extends WithIsHoverProps {
  data: Note;
  className?: string;
  isDraggable?: boolean;
  isArchived?: boolean;
  isActiveDragMode?: boolean;
}

const Card = ({
  data,
  isArchived,
  isActiveDragMode,
  isDraggable,
  isHover,
  onMouseEnter,
  onMouseLeave,
  className,
}: CardProps) => {
  const refCard = useRef<HTMLDivElement>(null);
  const [isDragOver, isDragOverSet] = useState<boolean>(false);

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

  const handleMouseUp = throttle(() => {
    if (isActiveDragMode && isHover && !isDraggable) {
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
    {[`card--${isDragOver ? `over` : `under`}`]: isActiveDragMode && isHover},
    className,
  );

  return (
    <div
      ref={refCard}
      className={classNames}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <CardInner data={data} isArchived={isArchived} />
    </div>
  );
};

export default withIsHover(Card);
