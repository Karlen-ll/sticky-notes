import React, {ChangeEvent, MouseEvent, FormEvent, useState} from 'react';

// Style
import './Modal.scss';

// Constants, types & interfaces
import {COLORS, SIZES} from '@global/constants';
import {editableDataOfNote, NotePicker} from '@global/notes';
import {dragEditEvent} from '@global/events';

// Components
import Input from '@components/controls/Input';
import Textarea from '@components/controls/Textarea';
import Picker from '@components/controls/Picker';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';

// Helpers
const DEFAULT_PICKER_VALUE = 'default';

export interface ModalProps {
  data: dragEditEvent;
  onSave: (data: editableDataOfNote) => void;
  onClose: (event: MouseEvent) => void;
}

const Modal = ({data: {data: note, left: x, top: y, width}, onSave, onClose}: ModalProps) => {
  const [data, dataSet] = useState<editableDataOfNote | null>({...note});

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target && (event.target as HTMLDivElement).classList.contains('modal')) {
      onClose(event);
    }
  };

  const handleInputChange = (event: ChangeEvent) => {
    dataSet({
      ...data,
      title: (event.target as HTMLInputElement).value,
    });
  };

  const handleTextareaChange = (event: ChangeEvent) => {
    dataSet({
      ...data,
      description: (event.target as HTMLInputElement).value,
    });
  };

  const checkPickerValue = (value: string, key: NotePicker) => {
    return {
      ...data,
      [key]: value !== DEFAULT_PICKER_VALUE ? value : undefined,
    };
  };

  const handleColorPickerChange = (event: FormEvent) => {
    dataSet(checkPickerValue((event.target as HTMLInputElement).value, 'color'));
  };

  const handleSizePickerChange = (event: FormEvent) => {
    dataSet(checkPickerValue((event.target as HTMLInputElement).value, 'size'));
  };

  return (
    <div className="modal" onMouseDown={handleOverlayClick}>
      <div
        className="modal__container"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width: `${width}px`,
        }}
      >
        <div className="modal__form">
          <Input
            className="modal__input"
            label="title"
            name="title"
            type="text"
            onChange={handleInputChange}
            value={note.title}
          />

          <Textarea
            className="modal__textarea"
            label="description"
            name="desc"
            rows={5}
            onChange={handleTextareaChange}
            value={note.description}
          />

          <Picker
            className="modal__color-picker"
            title="Choose color"
            type="color"
            list={[DEFAULT_PICKER_VALUE, ...COLORS]}
            checkedItem={note.color}
            onChange={handleColorPickerChange}
          />

          <Picker
            className="modal__size-picker"
            title="Choose size"
            type="size"
            list={[DEFAULT_PICKER_VALUE, ...SIZES]}
            checkedItem={note.size}
            onChange={handleSizePickerChange}
          />

          <Button
            className="modal__save-button"
            tagName="button"
            onClick={() => (data ? onSave(data) : undefined)}
            disabled={!data?.title}
            tabIndex={0}
          >
            Save
          </Button>

          <Button className="modal__close-button" variant="icon" label="Close" type="submit" onClick={onClose}>
            <Icon name="close" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
