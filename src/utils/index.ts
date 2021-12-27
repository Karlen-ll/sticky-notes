import {dragEvent} from '../global/events';

/**
 * @description Dispatch document event
 */
export const dispatchEvent = (eventName: string, detail?: dragEvent) => {
  document.dispatchEvent(new CustomEvent<dragEvent>(eventName, {detail}));
};
