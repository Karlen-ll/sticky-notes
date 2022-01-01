import React, {Component, ComponentType} from 'react';
import {findIndex} from 'lodash';

// Types
import {Note, Notes, NoteSection, editableDataOfNote} from '@global/notes';

// Utils
import {getNotes, saveNotes} from '@utils/localStorage';

// Types & Interfaces
interface Props {
  children?: JSX.Element;
}

interface withNotesState {
  notes: Notes;
  archive: Notes;

  isLoadingForNotes: boolean;
  isLoadingForArchive: boolean;

  loadingForSection: NoteSection | null;
}

export interface withNotesProps {
  notes: Notes;
  archive: Notes;

  isLoadingForNotes: boolean;
  isLoadingForArchive: boolean;
  loadingForSection: NoteSection | null;

  loadNotes: Function;
  loadArchive: Function;

  addNote: Function;
  editNote: Function;
  moveNote: Function;

  restoreNote: Function;
  archiveNote: Function;
}

export function withNotes(WrappedComponent: ComponentType<withNotesProps>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const getIndexOfNote = (id: number, array: Notes): number => {
    return findIndex(array, item => item.id === id);
  };

  class Notebook extends Component<Props, withNotesState> {
    static displayName: string;

    private static getNewIndex(index: number, toIndex: number, isToBehind: boolean, isOneArray: boolean = true) {
      let newIndex = toIndex;
      if (isOneArray && index < toIndex) newIndex--;
      if (isToBehind) newIndex++;
      return newIndex;
    }

    constructor(props: Props) {
      super(props);

      this.state = {
        notes: getNotes(),
        archive: [],
        loadingForSection: null,
        isLoadingForNotes: false,
        isLoadingForArchive: false,
      };
    }

    private _getClonesArrays(): {notes: Notes; archive: Notes} {
      return {
        notes: [...this.state.notes],
        archive: [...this.state.archive],
      };
    }

    private _getCloneNotes(): Notes {
      return [...this.state.notes];
    }

    /**
     * Load methods
     */

    loadNotes(promise: Promise<Notes>) {
      this.setState({isLoadingForNotes: true});

      promise
        .then(result => (result ? this.setState({notes: result.reverse()}) : []))
        .finally(() => this.setState({isLoadingForNotes: false}));
    }

    loadArchive(promise: Promise<Notes>) {
      this.setState({isLoadingForArchive: true});

      promise
        .then(
          result => (result ? this.setState({archive: result}) : []),
          () => this.setState({archive: []}),
        )
        .finally(() => this.setState({isLoadingForArchive: false}));
    }

    addNote(promise: Promise<Note>, section: NoteSection, toId?: number, isToBehind?: boolean) {
      this.setState({isLoadingForNotes: true, loadingForSection: section});

      promise
        .then(newNote => this._addNote(newNote, section, toId, isToBehind))
        .finally(() => this.setState({isLoadingForNotes: false, loadingForSection: null}));
    }

    /**
     * Move methods
     */

    moveNote(id: number, toId: number, isToBehind?: boolean): void {
      const notes = this._getCloneNotes();
      const [index, toIndex] = [getIndexOfNote(id, notes), getIndexOfNote(toId, notes)];
      const note = notes[index];

      // Fix data
      note.section = notes[toIndex].section;

      notes.splice(index, 1);
      notes.splice(Notebook.getNewIndex(index, toIndex, !!isToBehind), 0, note);

      // Return result
      this.setState({notes}, () => saveNotes(notes));
    }

    archiveNote(id: number) {
      const {notes, archive} = this._getClonesArrays();
      const index = getIndexOfNote(id, notes);
      const note = notes[index];

      // Fix data
      if (note.section) delete note.section;
      if (note.color) delete note.color;
      if (note.size) delete note.size;

      notes.splice(index, 1);
      archive.push(note);

      // Return result
      this.setState({notes, archive}, () => saveNotes(notes));
    }

    restoreNote(id: number, section: NoteSection, toId?: number, isToBehind?: boolean) {
      const {notes, archive} = this._getClonesArrays();
      const [index, toIndex] = [getIndexOfNote(id, archive), toId ? getIndexOfNote(toId, notes) : notes.length];
      const note = archive[index];

      // Fix data
      note.section = section;

      archive.splice(index, 1);
      notes.splice(Notebook.getNewIndex(index, toIndex, !!isToBehind, false), 0, note);

      // Return result
      this.setState({notes, archive}, () => saveNotes(notes));
    }

    /**
     * Add methods
     */

    private _addNote(newNote: Note, section: NoteSection, toId?: number, isToBehind?: boolean) {
      const notes = this._getCloneNotes();
      const toIndex = toId ? getIndexOfNote(toId, notes) : notes.length;

      // Fix data
      newNote.section = section;

      notes.splice(Notebook.getNewIndex(0, toIndex, !!isToBehind, false), 0, newNote);

      this.setState({notes}, () => saveNotes(notes));
    }

    /**
     * Edit methods
     */

    editNote(id: number, data: editableDataOfNote) {
      const notes = this._getCloneNotes();
      const index = getIndexOfNote(id, notes);

      notes[index] = {
        ...notes[index],
        ...data,
      };

      this.setState({notes}, () => saveNotes(notes));
    }

    /** Prepare props */

    loadNotesProp = this.loadNotes.bind(this);
    loadArchiveProp = this.loadArchive.bind(this);
    archiveNoteProp = this.archiveNote.bind(this);
    restoreNoteProp = this.restoreNote.bind(this);
    moveNoteProp = this.moveNote.bind(this);
    editNoteProp = this.editNote.bind(this);
    addNoteProp = this.addNote.bind(this);

    render() {
      return (
        <WrappedComponent
          {...this.state}
          loadNotes={this.loadNotesProp}
          loadArchive={this.loadArchiveProp}
          archiveNote={this.archiveNoteProp}
          restoreNote={this.restoreNoteProp}
          editNote={this.editNoteProp}
          moveNote={this.moveNoteProp}
          addNote={this.addNoteProp}
        />
      );
    }
  }

  Notebook.displayName = `withNotes(${displayName})`;

  return Notebook;
}
