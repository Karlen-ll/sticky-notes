import React, {forwardRef} from 'react';
import cx from 'classnames';

// Style
import './Card.scss';

// Constants, Types & interfaces
import {Note} from '@global/notes';

// Components
import CardInner from '@components/Card/CardInner';

// Types & Interfaces
export interface NoteProps {
  data?: Note;
  isShow?: boolean;
}

const DemoCard = forwardRef<HTMLDivElement, NoteProps>(({data, isShow}, ref) => {
  return (
    <div ref={ref} className={cx('card card--demo', {'card--show': isShow, 'card--archived': !data?.section})}>
      {data && <CardInner data={data} isEditable={false} />}
    </div>
  );
});

export default DemoCard;
