import React, { MouseEvent, useCallback } from 'react'
import cx from 'classnames'

import { Note } from '@global/notes'
import { dispatchEvent, getHTMLElementState } from '@utils/index'
import { DEFAULT_ICON_SIZE, EDIT_CARD_EVENT } from '@global/constants'
import Button from '@components/common/Button'
import Icon from '@components/common/Icon'
import './Card.scss'

interface CardInnerProps {
  data: Note
  isEditable?: boolean
}

const CardInner = ({ data, isEditable }: CardInnerProps) => {
  const { id, title, section, description, color, size } = data
  const isShowedDesc = section && size !== 'sm'
  const hasId = id >= 0

  const handleClickEditButton = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const { top, left, offsetWidth: width } = getHTMLElementState(target.closest<HTMLElement>('.card'))

      dispatchEvent(EDIT_CARD_EVENT, {
        note: data,
        state: {
          top,
          left,
          width,
        },
      })
    },
    [data]
  )

  return (
    <>
      {color && <div className={cx('card__label', { [`card__label--${color}`]: color })} aria-hidden={true} />}

      {isEditable && (
        <div className="card__menu">
          <Button className="card__edit-button" variant="icon" label="Edit note" onClick={handleClickEditButton}>
            <Icon name="pen" className="card__icon" size={DEFAULT_ICON_SIZE} />
          </Button>
        </div>
      )}

      <span className="card__title">
        {hasId && (
          <span className="card__id" aria-hidden={true}>
            {id}
          </span>
        )}
        {title}
      </span>

      {isShowedDesc && <span className="card__description">{description}</span>}
    </>
  )
}

export default CardInner
