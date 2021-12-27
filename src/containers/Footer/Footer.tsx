import React from 'react';

// Style
import './Footer.scss';

// Types & interfaces
export interface FooterProps {
  countOfNotes: number;
}

function Footer({countOfNotes}: FooterProps) {
  return (
    <footer className="footer">
      <ul className="footer__list list list--horizontal">
        {countOfNotes && <li className="list__item">{countOfNotes} notes</li>}
      </ul>

      <span className="footer__text">2021 © Pireverdiev Karlen</span>
    </footer>
  );
}

export default Footer;
