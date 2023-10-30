import { COLORS, SECTIONS, SIZES } from '@global/constants'

export type SizeOfNote = typeof SIZES[number]
export type ColorOfNote = typeof COLORS[number]
export type SectionOfNote = typeof SECTIONS[number]

export type Note = {
  id: number
  title: string
  description?: string
  section?: SectionOfNote
  color?: ColorOfNote
  size?: SizeOfNote
}

export interface EditableDataOfNote extends Partial<Exclude<Note, 'id'>> {}

export type Notes = Note[]

export enum PickerType {
  COLOR = 'color',
  SIZE = 'size',
}

export type CustomizableKeysOfNote = PickerType.COLOR | PickerType.SIZE
