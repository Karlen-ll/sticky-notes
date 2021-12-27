export type NoteSize = 'sm' | 'lg' ;

export type NoteColor = 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'aqua' | 'lime' | 'pink' | 'night';

export type NoteSection = 'todo' | 'doing' | 'archive';

export type Note = {
  id: number;
  title: string;
  description?: string;
  section?: NoteSection;
  color?: NoteColor;
  size?: NoteSize;
};

export interface editableDataOfNote {
  title?: string;
  description?: string;
  section?: NoteSection;
  color?: NoteColor;
  size?: NoteSize;
}

export type Notes = Note[];
