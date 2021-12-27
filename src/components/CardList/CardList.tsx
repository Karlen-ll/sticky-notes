import React, {useState} from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';

// Style
import './CardList.scss';

// Constants, Types & interfaces
import {SECTION_ARCHIVE, SM_THROTTLE_TIME, THROTTLE_TIME} from '@global/constants';
import {Note, Notes} from '@global/notes';

// Utils
import {dispatchEvent} from '@utils/index';

// Components
import Card from '@components/Card';
import Icon from '@components/common/Icon';

// Types & Interfaces
export interface CardListProps {
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
  className,
}: CardListProps) {
  const [isActive, isActiveSet] = useState<boolean>(false);

  const handleMouseEnter = throttle(() => isActiveSet(true), THROTTLE_TIME);
  const handleMouseLeave = throttle(() => isActiveSet(false), THROTTLE_TIME);

  const isItemOfThisSection = draggableItem ? (draggableItem.section || SECTION_ARCHIVE) === title : false;

  const handleMouseUp = throttle(() => {
    if (isActiveDragMode && isActive && !isItemOfThisSection) {
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
  const hasDragMode = isActive && isActiveDragMode && isActiveDropMode && !isItemOfThisSection;

  return (
    <section className={cx('card-list', `card-list--${title}`, className)}>
      <header className="card-list__header">
        <span className="card-list__title">{title}</span>
        <span className="card-list__description">{items.length} notes</span>
      </header>

      <div className="card-list__scroll-box">
        {!isLoading && (
          <div
            className={cx('card-list__wrapper', {'card-list__wrapper--drop': hasDragMode})}
            onMouseEnter={hasHandlers ? handleMouseEnter : undefined}
            onMouseLeave={hasHandlers ? handleMouseLeave : undefined}
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

export default CardList;
