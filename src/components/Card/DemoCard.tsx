import React, {forwardRef} from 'react';
import cx from 'classnames';

import {Note} from '@global/notes';
import CardInner from '@components/Card/CardInner';
import './Card.scss';

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
