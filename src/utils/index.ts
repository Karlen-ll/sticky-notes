import {EventDetails} from '@global/events';

// Types & Interfaces
type ElementState = {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  offsetWidth: number;
  offsetHeight: number;
};

// dispatchEvent Overloads
function dispatchEvent(eventName: string): void;
function dispatchEvent(eventName: string, detail: EventDetails): void;

/**
 * @description Dispatch document event
 */
function dispatchEvent(eventName: string, detail?: EventDetails) {
  document.dispatchEvent(new CustomEvent<EventDetails>(eventName, {detail}));
}

/**
 * @description Get HTML element position & size
 */
function getHTMLElementState(object?: HTMLElement | null): ElementState {
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
}

export {dispatchEvent, getHTMLElementState};
