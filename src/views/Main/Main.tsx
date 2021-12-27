import React, {useCallback, useEffect, useRef, useState} from 'react';

// Style
import './Main.scss';

// Constants, Types & interfaces
import {MAIN_SECTIONS, SECTION_ARCHIVE} from '../../global/constants';
import {dragEditEvent, dragEndEvent, dragStartEvent} from '../../global/events';
import {editableDataOfNote} from '../../global/notes';

// Api
import {createNotes, fetchArchiveNotes, fetchNotes} from '../../api/notes';

// Utils
import {saveNotes} from '@utils/localStorage';

// HOC
import {withNotes, withNotesProps} from '@components/hocs/withNotes';

// Components
import Footer from '@containers/Footer';
import Header from '@containers/Header/';
import Workspace from '@containers/Workspace/';
import CardList from '@components/CardList/';
import DemoCard from '@components/Card/DemoCard';
import Modal from '@components/Modal';

// Helpers
const getTransform = ({state}: dragStartEvent, x?: number, y?: number): string => {
  const {x: posX = 0, y: posY = 0, top = 0, left = 0, width = 0, height = 0} = state;
  const [ANGLE, SCALE] = ['1.5deg', 0.75];
  const position = {
    x: (x || posX) - left * SCALE - (width - width * SCALE) / 2,
    y: (y || posY) - top * SCALE - (height - height * SCALE) / 2,
  };

  return `transform: translate(${position.x}px, ${position.y}px) scale(${SCALE}) rotate(${ANGLE}); width: ${width}px; height: ${height}px;`;
};

function Main({
  notes,
  archive,

  isLoadingNotes,
  isLoadingArchive,

  loadNotes,
  loadArchive,

  addNote,
  editNote,
  moveNote,

  restoreNote,
  archiveNote,
}: withNotesProps) {
  const [draggable, draggableSet] = useState<dragStartEvent | null>(null);
  const [modalState, modalStateSet] = useState<dragEditEvent | null>(null);

  const refDraggableItem = useRef<HTMLDivElement>(null);

  /** Helpers */

  /**
   * @description Set style for the dragged element
   */
  const setStyleForDraggableItem = (data: dragStartEvent, pageX?: number, pageY?: number) => {
    if (refDraggableItem.current) {
      refDraggableItem.current.setAttribute('style', getTransform(data, pageX, pageY));
    }
  };

  /** Handlers */

  const handleMouseMove = (event: MouseEvent) => {
    if (draggable) setStyleForDraggableItem(draggable, event.pageX, event.pageY);
  };

  const handleEdit = ({detail}: CustomEvent<dragEditEvent>) => {
    modalStateSet(detail);
  };

  const handleEditNote = useCallback(
    (newData: editableDataOfNote) => {
      if (newData && modalState) editNote(modalState.data.id, newData);
      modalStateSet(null);
    },
    [modalState, editNote],
  );

  const handleStartDrag = ({detail}: CustomEvent<dragStartEvent>) => {
    draggableSet(detail);
    setStyleForDraggableItem(detail);
  };

  const handleEndDrag = ({detail}: CustomEvent<dragEndEvent>): void => {
    if (draggable) {
      const id = draggable.note.id;
      const isArchive = detail.section === SECTION_ARCHIVE;
      const isArchiveNote = !draggable.note.section || draggable.note.section === SECTION_ARCHIVE;

      if (draggable.isNewNote && !isArchive) {
        createNotes().then(newNote => addNote(newNote, detail.section, detail.id, !detail.isDragOver));
        return;
      }

      if (detail.isContainer) {
        if (isArchive) archiveNote(id);
        else if (isArchiveNote) restoreNote(id, detail.section);
        else editNote(id, {section: detail.section});
      } else if (isArchiveNote && !isArchive) {
        restoreNote(id, detail.section, detail.id, !detail.isDragOver);
      } else {
        moveNote(draggable.note.id, detail.id, !detail.isDragOver);
      }
    }
  };

  const handleMouseUp = () => setTimeout(() => draggableSet(null), 10);
  const handleMouseLeave = () => draggableSet(null);

  const handleModalClose = useCallback(() => modalStateSet(null), []);

  /** useEffects */

  useEffect(() => {
    /**
     * Important!!! This method rewrite data from the localStorage...
     * It is needed that you can play with the notes
     */
    loadNotes(fetchNotes());

    loadArchive(fetchArchiveNotes());
  }, [loadNotes, loadArchive]);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    document.addEventListener('startDragElement', handleStartDrag as EventListener);
    document.addEventListener('endDragElement', handleEndDrag as EventListener);
    document.addEventListener('startEditElement', handleEdit as EventListener);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('startDragElement', handleStartDrag as EventListener);
      document.removeEventListener('endDragElement', handleEndDrag as EventListener);
      document.removeEventListener('startEditElement', handleEdit as EventListener);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const draggableItem = draggable?.note;

  return (
    <div className="page">
      <Header />

      <Workspace>
        <div className="page__row">
          {MAIN_SECTIONS.map(section => (
            <CardList
              title={section}
              items={notes.filter(item => item?.section === section)}
              draggableItem={draggableItem}
              isActiveDragMode={!!draggable}
              isLoading={isLoadingNotes && !notes.length}
              key={section}
            />
          ))}
        </div>

        {archive && (
          <div className="page__row page__row--archive">
            <CardList
              items={archive}
              title={SECTION_ARCHIVE}
              draggableItem={draggableItem}
              isActiveDragMode={!!draggable}
              isLoading={isLoadingArchive}
              isDropContainer={true}
            />
          </div>
        )}

        <DemoCard ref={refDraggableItem} isShow={!!draggable} data={draggableItem} />
      </Workspace>

      <Footer countOfNotes={notes.length + archive.length} />

      {modalState && <Modal data={modalState} onSave={handleEditNote} onClose={handleModalClose} />}
    </div>
  );
}

export default withNotes(Main);
