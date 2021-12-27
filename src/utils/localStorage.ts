import {Notes} from '../global/notes';

// Helpers
const STORAGE_NOTES_KEY = 'notes';

export function getNotes(): Notes {
  const savedNotes: string | null = localStorage.getItem(STORAGE_NOTES_KEY);
  return savedNotes ? JSON.parse(savedNotes) : [];
}

export function saveNotes(notes: Notes): void {
  localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
}
