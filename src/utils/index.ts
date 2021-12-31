import {dragEvent} from '@global/events';

/**
 * @description Dispatch document event
 */
export const dispatchEvent = (eventName: string, detail?: dragEvent) => {
  document.dispatchEvent(new CustomEvent<dragEvent>(eventName, {detail}));
};

/**
 * @description Get HTML element position & size
 */
export const getHTMLElementState = (object?: HTMLElement | null) => {
  let rect = {} as DOMRect;
  let [offsetWidth, offsetHeight] = [0, 0];

  if (object) {
    rect = object.getBoundingClientRect() as DOMRect;
    offsetWidth = object.offsetWidth;
    offsetHeight = object.offsetHeight;
  }

  return {
    x: rect.x || 0,
    y: rect.y || 0,
    top: rect.top || 0,
    left: rect.left || 0,
    right: rect.right || 0,
    bottom: rect.bottom || 0,
    width: rect.width || 0,
    height: rect.height || 0,
    offsetHeight,
    offsetWidth,
  };
};
