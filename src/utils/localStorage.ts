import { Notes } from '@global/notes'

const STORAGE_NOTES_KEY = 'notes'

/**
 * @description Get notes from localStorage
 */
function getNotes(): Notes {
  const savedNotes: string | null = localStorage.getItem(STORAGE_NOTES_KEY)

  return savedNotes ? JSON.parse(savedNotes) : []
}

/**
 * @description Save notes to localStorage
 */
function saveNotes(notes: Notes): void {
  localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes))
}

export { getNotes, saveNotes }
