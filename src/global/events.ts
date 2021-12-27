import {Note} from './notes';

export type dragState = {
  x: number;
  y: number;
  top: number;
  left: number;
  width: number;
  height: number;
};

export type dragStartEvent = {
  note: Note;
  state: dragState;
  isNewNote?: boolean;
};

export type dragEndEvent = {
  isDragOver?: boolean; // Is drop over element?!
  isContainer?: boolean; // Is drop into container?!
  section?: string; // Section name
  id?: number;
};

export type dragEditEvent = {
  data: Note;
  top?: number;
  left?: number;
  width?: number;
};

export type dragEvent = dragStartEvent | dragEndEvent | dragEditEvent;
