import React, {useCallback, useEffect, useRef, useState} from 'react';

// Style
import './Main.scss';

// Constants, Types & Interfaces
import {EDIT_CARD_EVENT, END_DRAG_EVENT, MAIN_SECTIONS, SECTION_ARCHIVE, START_DRAG_EVENT} from '@global/constants';
import {DetailOfEditNote, DragEndDetail, DragStartDetail} from '@global/events';
import {EditableDataOfNote} from '@global/notes';

// Api
import {createNotes, fetchArchiveNotes, fetchNotes} from '@api/notes';

// Utils
import {saveNotes} from '@utils/localStorage';

// HOC
import {withNotes, NotebookProps} from '@components/hocs/withNotes';

// Components
import Workspace from '@containers/Workspace';
import CardList from '@components/CardList';
import {DemoCard} from '@components/Card';
import Footer from '@containers/Footer';
import Header from '@containers/Header';
import Modal from '@components/Modal';

// Helpers
const getTransform = (
  {state: {x = 0, y = 0, top = 0, left = 0, width = 0, height = 0}}: DragStartDetail,
  posX?: number,
  posY?: number,
): string => {
  const [ANGLE, SCALE] = ['1.5deg', 0.75];
  const _x = (posX || x) - left * SCALE - (width - width * SCALE) / 2;
  const _y = (posY || y) - top * SCALE - (height - height * SCALE) / 2;

  return `transform: translate(${_x}px, ${_y}px) scale(${SCALE}) rotate(${ANGLE}); width: ${width}px; height: ${height}px;`;
};

function Main({
  notes,
  archive,

  isLoadingForNotes,
  isLoadingForArchive,
  loadingForSection,

  loadNotes,
  loadArchive,

  addNote,
  editNote,
  moveNote,

  restoreNote,
  archiveNote,
}: NotebookProps) {
  const [draggable, draggableSet] = useState<DragStartDetail | null>(null);
  const [modalData, modalDataSet] = useState<DetailOfEditNote | null>(null);

  const refDraggableItem = useRef<HTMLDivElement>(null);

  /** Helpers */

  /**
   * @description Set style for the dragged element
   */
  const setStyleForDraggableItem = (data: DragStartDetail, x?: number, y?: number) => {
    if (!refDraggableItem?.current) return;

    refDraggableItem.current.setAttribute('style', getTransform(data, x, y));
  };

  /** Handlers */

  const handleMouseMove = (event: MouseEvent) => {
    if (draggable) setStyleForDraggableItem(draggable, event.pageX, event.pageY);
  };

  const handleEdit = ({detail}: CustomEvent<DetailOfEditNote>) => {
    modalDataSet(detail);
  };

  const handleEditNote = useCallback(
    (newData: EditableDataOfNote) => {
      if (newData && modalData) editNote(modalData.note.id, newData);
      modalDataSet(null);
    },
    [modalData, editNote],
  );

  const handleStartDrag = ({detail}: CustomEvent<DragStartDetail>) => {
    draggableSet(detail);
    setStyleForDraggableItem(detail);
  };

  const handleEndDrag = ({detail}: CustomEvent<DragEndDetail>): void => {
    if (!draggable) return;

    const id = draggable.note.id;
    const isArchive = detail.section === SECTION_ARCHIVE;
    const isArchiveNote = !draggable.note.section || draggable.note.section === SECTION_ARCHIVE;

    // Drop new note
    if (draggable.isCreateNote && !isArchive) {
      addNote(createNotes(), detail.section, detail.id, !detail.isDropOnTop);
      return;
    }

    if (detail.isContainer) {
      if (isArchive) archiveNote(id);
      else if (isArchiveNote) restoreNote(id, detail.section);
      else editNote(id, {section: detail.section});
    } else if (isArchiveNote && !isArchive) {
      restoreNote(id, detail.section, detail.id, !detail.isDropOnTop);
    } else {
      moveNote(draggable.note.id, detail.id, !detail.isDropOnTop);
    }
  };

  const handleMouseUp = () => setTimeout(() => draggableSet(null), 10);
  const handleMouseLeave = () => draggableSet(null);

  const handleModalClose = useCallback(() => modalDataSet(null), []);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (modalData) modalDataSet(null);
      if (draggable) draggableSet(null);
    }
  };

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
    document.addEventListener(START_DRAG_EVENT, handleStartDrag as EventListener);
    document.addEventListener(END_DRAG_EVENT, handleEndDrag as EventListener);
    document.addEventListener(EDIT_CARD_EVENT, handleEdit as EventListener);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener(START_DRAG_EVENT, handleStartDrag as EventListener);
      document.removeEventListener(END_DRAG_EVENT, handleEndDrag as EventListener);
      document.removeEventListener(EDIT_CARD_EVENT, handleEdit as EventListener);
      document.removeEventListener('keyup', handleKeyUp);
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
              isLoading={isLoadingForNotes && (loadingForSection === section || loadingForSection === null)}
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
              isLoading={isLoadingForArchive}
              isDropContainer
            />
          </div>
        )}

        <DemoCard ref={refDraggableItem} isShow={!!draggable} data={draggableItem} />
      </Workspace>

      <Footer countOfNotes={notes.length + archive.length} />

      {modalData && <Modal data={modalData} onSave={handleEditNote} onClose={handleModalClose} />}
    </div>
  );
}

export default withNotes(Main);
