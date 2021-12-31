import React from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';

// Style
import './CardList.scss';

// Constants, Types & interfaces
import {NOTES, SECTION_ARCHIVE, SM_THROTTLE_TIME} from '@global/constants';
import {Note, Notes} from '@global/notes';

// Utils
import {dispatchEvent} from '@utils/index';

// HOC
import withIsHover, {WithIsHoverProps} from '@components/hocs/withIsHover';

// Components
import Card from '@components/Card';
import Icon from '@components/common/Icon';

// Types & Interfaces
export interface CardListProps extends WithIsHoverProps {
  items: Notes;
  title: string;
  className?: string;
  draggableItem?: Note;
  isLoading?: boolean;
  isDropContainer?: boolean;
  isActiveDragMode?: boolean;
}

function CardList({
  items,
  draggableItem,
  isDropContainer,
  isActiveDragMode,
  isLoading,
  title,
  isHover,
  onMouseEnter,
  onMouseLeave,
  className,
}: CardListProps) {
  const isItemOfThisSection = draggableItem ? (draggableItem.section || SECTION_ARCHIVE) === title : false;

  const handleMouseUp = throttle(() => {
    if (isActiveDragMode && isHover && !isItemOfThisSection) {
      dispatchEvent('endDragElement', {isContainer: true, section: title});
    }
  }, SM_THROTTLE_TIME);

  /**
   * @description If this is an archive container - delete|hide notes properties
   */
  const isArchiveContainer = title === SECTION_ARCHIVE;

  const hasNotNotes = !items.length;
  const hasHandlers = isDropContainer || hasNotNotes;

  const isActiveDropMode = isDropContainer || hasNotNotes;
  const hasDragMode = isHover && isActiveDragMode && isActiveDropMode && !isItemOfThisSection;

  return (
    <section className={cx('card-list', `card-list--${title}`, className)}>
      <header className="card-list__header">
        <span className="card-list__title">{title}</span>
        <span className="card-list__description">
          {items.length} {NOTES}
        </span>
      </header>

      <div className="card-list__scroll-box">
        {!isLoading && (
          <div
            className={cx('card-list__wrapper', {'card-list__wrapper--drop': hasDragMode})}
            onMouseEnter={hasHandlers ? onMouseEnter : undefined}
            onMouseLeave={hasHandlers ? onMouseLeave : undefined}
            onMouseUp={hasHandlers ? handleMouseUp : undefined}
          >
            {items.map(
              item =>
                item && (
                  <Card
                    data={item}
                    isDraggable={item.id === draggableItem?.id}
                    isActiveDragMode={isActiveDragMode && !isDropContainer}
                    isArchived={isArchiveContainer}
                    key={item.id}
                  />
                ),
            )}
          </div>
        )}
      </div>

      {isLoading && <Icon name="loader" />}
    </section>
  );
}

export default withIsHover(CardList);
