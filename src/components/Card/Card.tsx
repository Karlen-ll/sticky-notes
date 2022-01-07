import React, {useRef, MouseEvent, useState} from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';

// Style
import './Card.scss';

// Constants, Types & Interfaces
import {Note} from '@global/notes';
import {END_DRAG_EVENT, SM_THROTTLE_TIME, START_DRAG_EVENT} from '@global/constants';

// Utils
import {dispatchEvent, getHTMLElementState} from '@utils/index';

// HOC
import withIsHover, {WithIsHoverProps} from '@components/hocs/withIsHover';

// Components
import CardInner from './CardInner';

// Helpers
const BUTTON_CLASS = '.card__edit-button';

// Types & Interfaces
interface CardProps extends WithIsHoverProps {
  data: Note;
  className?: string;
  isEditable?: boolean;
  isDraggable?: boolean;
  isActiveDragMode?: boolean;
}

const Card = ({
  data,
  isEditable,
  isActiveDragMode,
  isDraggable,
  isHover,
  onMouseEnter,
  onMouseLeave,
  className,
}: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropOnTop, isDropOnTopSet] = useState<boolean>(false);

  /** Handlers */

  const handleMouseDown = throttle((event: MouseEvent) => {
    const {top, left, offsetHeight, offsetWidth} = getHTMLElementState(ref?.current);
    const {pageX: x, pageY: y, target} = event;

    if (target instanceof Element && target.closest(BUTTON_CLASS)) return;

    dispatchEvent(START_DRAG_EVENT, {
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
      const {top, offsetHeight} = getHTMLElementState(ref?.current);

      isDropOnTopSet(offsetHeight / 2 > event.pageY - top);
    }
  }, SM_THROTTLE_TIME);

  const handleMouseUp = throttle(() => {
    if (isActiveDragMode && isHover && !isDraggable) {
      dispatchEvent(END_DRAG_EVENT, {
        section: data.section,
        id: data.id,
        isDropOnTop,
      });
    }
  }, SM_THROTTLE_TIME);

  /** Helpers */

  const classNames = cx(
    'card',
    {'card--draggable': isDraggable},
    {[`card--${data.size}`]: data.size},
    {[`card--${data.color}`]: data.color},
    {[`card--${isDropOnTop ? `over` : `under`}`]: isActiveDragMode && isHover},
    className,
  );

  return (
    <div
      ref={ref}
      className={classNames}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <CardInner data={data} isEditable={isEditable} />
    </div>
  );
};

export default withIsHover(Card);
