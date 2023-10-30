import React, { ChangeEvent, FormEvent, MouseEvent, useCallback, useState } from 'react'

import { DetailOfEditNote } from '@global/events'
import { CustomizableKeysOfNote, EditableDataOfNote, PickerType } from '@global/notes'
import { COLORS, DEFAULT_ICON_SIZE, DEFAULT_PICKER_VALUE, DEFAULT_TEXTAREA_ROWS, SIZES } from '@global/constants'
import Textarea from '@components/controls/Textarea'
import Picker from '@components/controls/Picker'
import Input from '@components/controls/Input'
import Button from '@components/common/Button'
import Icon from '@components/common/Icon'
import './Modal.scss'

export interface ModalProps {
  data: DetailOfEditNote
  onSave: (data: EditableDataOfNote) => void
  onClose: (event: MouseEvent) => void
}

const Modal = ({
  data: {
    note,
    state: { left: x, top: y, width },
  },
  onSave,
  onClose,
}: ModalProps) => {
  const [data, dataSet] = useState<EditableDataOfNote | null>({ ...note })

  const checkPickerValue = (value: string, key: CustomizableKeysOfNote) => {
    return {
      ...data,
      [key]: value !== DEFAULT_PICKER_VALUE ? value : undefined,
    }
  }

  const changeColor = (event: FormEvent) => {
    dataSet(checkPickerValue((event.target as HTMLInputElement).value, PickerType.COLOR))
  }

  const changeSize = (event: FormEvent) => {
    dataSet(checkPickerValue((event.target as HTMLInputElement).value, PickerType.SIZE))
  }

  const handleColorPickerChange = useCallback(changeColor, [changeColor])
  const handleSizePickerChange = useCallback(changeSize, [changeSize])

  const handleOverlayClick = useCallback(
    (event: MouseEvent) => {
      if (event.target && (event.target as HTMLDivElement).classList.contains('modal')) {
        onClose(event)
      }
    },
    [onClose]
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent) => {
      dataSet({
        ...data,
        title: (event.target as HTMLInputElement).value,
      })
    },
    [data]
  )

  const handleTextareaChange = useCallback(
    (event: ChangeEvent) => {
      dataSet({
        ...data,
        description: (event.target as HTMLInputElement).value,
      })
    },
    [data]
  )

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
            value={note.title}
            onChange={handleInputChange}
          />

          <Textarea
            className="modal__textarea"
            label="description"
            name="desc"
            value={note.description}
            rows={DEFAULT_TEXTAREA_ROWS}
            onChange={handleTextareaChange}
          />

          <Picker
            className="modal__color-picker"
            title="Choose color"
            type="color"
            checkedItem={note.color}
            list={[DEFAULT_PICKER_VALUE, ...COLORS]}
            onChange={handleColorPickerChange}
          />

          <Picker
            className="modal__size-picker"
            title="Choose size"
            type="size"
            checkedItem={note.size}
            list={[DEFAULT_PICKER_VALUE, ...SIZES]}
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
            <Icon name="close" size={DEFAULT_ICON_SIZE} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
