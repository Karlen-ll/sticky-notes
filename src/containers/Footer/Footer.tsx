import React from 'react';

// Style
import './Footer.scss';

// Constants, Types & interfaces
import {COPYRIGHT, NOTES} from '@global/constants';

// Types & interfaces
export interface FooterProps {
  countOfNotes: number;
}

function Footer({countOfNotes}: FooterProps) {
  return (
    <footer className="footer">
      <ul className="footer__list list list--horizontal">
        {countOfNotes && (
          <li className="list__item">
            {countOfNotes} {NOTES}
          </li>
        )}
      </ul>

      <span className="footer__text">{COPYRIGHT}</span>
    </footer>
  );
}

export default Footer;
