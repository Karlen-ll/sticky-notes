import React, {MouseEvent} from 'react';
import {throttle} from 'lodash';

// Style
import './Header.scss';

// Constants, Types & interfaces
import {NEW_NOTE_DATA, NEW_NOTE_HEIGHT, NEW_NOTE_WIDTH, SM_THROTTLE_TIME} from '@global/constants';

// Utils
import {dispatchEvent} from '@utils/index';

// Components
import Logo from '@components/Logo';

function Header() {
  const handleMouseDown = throttle((event: MouseEvent) => {
    const {pageX: x, pageY: y} = event;

    dispatchEvent('startDragElement', {
      isNewNote: true,
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
        Drag to create note
      </div>
    </header>
  );
}

export default Header;
