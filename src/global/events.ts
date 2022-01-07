import {Note} from './notes';

export type StateOfDragElement = {
  x: number;
  y: number;
  top: number;
  left: number;
  width: number;
  height: number;
};

export type DragEvent<P extends object> = {
  note: Note;
  state: P;
};

export type DragStartDetail = DragEvent<StateOfDragElement> & {
  isCreateNote?: boolean;
};

/**
 * @param isDropOnTop Is drop in front of the element?!
 * @param isContainer Is drop into container?!
 */
export type DragEndDetail = {
  id?: number;
  section?: string;
  isDropOnTop?: boolean;
  isContainer?: boolean;
};

export type DetailOfEditNote = DragEvent<Partial<StateOfDragElement>>;

export type EventDetails = DragStartDetail | DragEndDetail | DetailOfEditNote;
