import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState } from 'react'

import { CheckboxesView } from './Checkboxes.view'

type CheckboxesProps = {
  items: string[]
  onUpdate: (selected: string[]) => void
}

export const Checkboxes = ({ items, onUpdate }: CheckboxesProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const clickCallback = (e: any) => {
    const { value } = e.target
    setSelected(() => [value])
    onUpdate([value])
  }

  return <CheckboxesView items={items} clickCallback={clickCallback} selected={selected} />
}

Checkboxes.propTypes = {
  items: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

Checkboxes.defaultProps = {}
