import React, {MouseEvent} from 'react';
import {throttle} from 'lodash';

// Style
import './Header.scss';

// Constants, Types & interfaces
import {
  CREATE_NOTE_CAPTION,
  NEW_NOTE_DATA,
  NEW_NOTE_HEIGHT,
  NEW_NOTE_WIDTH,
  SM_THROTTLE_TIME,
  START_DRAG_EVENT,
} from '@global/constants';

// Utils
import {dispatchEvent} from '@utils/index';

// Components
import Logo from '@components/Logo';

function Header() {
  const handleMouseDown = throttle((event: MouseEvent) => {
    const {pageX: x, pageY: y} = event;

    dispatchEvent(START_DRAG_EVENT, {
      isCreateNote: true,
      state: {
        x,
        y,
        top: NEW_NOTE_HEIGHT / 2,
        left: NEW_NOTE_WIDTH / 2,
        width: NEW_NOTE_WIDTH,
        height: NEW_NOTE_HEIGHT,
      },
      note: NEW_NOTE_DATA,
    });
  }, SM_THROTTLE_TIME);

  return (
    <header className="header">
      <Logo />

      <div className="header__create-button" onMouseDown={handleMouseDown}>
        {CREATE_NOTE_CAPTION}
      </div>
    </header>
  );
}

export default Header;
