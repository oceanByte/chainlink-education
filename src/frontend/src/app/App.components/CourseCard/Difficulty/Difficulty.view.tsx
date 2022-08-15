import React from 'react'

import classNames from 'classnames';
import Tooltip from 'rc-tooltip'
import { DifficultyStyled } from './Difficulty.style';
import './Difficulty.style.css'

const MAX_DIFFICULTY = 5;

interface IDifficulty {
  difficulty: number
}

export const Difficulty = ({ difficulty }: IDifficulty) => {
  return (
    <Tooltip
      destroyTooltipOnHide
      placement="bottom"
      trigger={['hover']}
      overlay="Difficulty"
      overlayClassName="difficulty__tooltip"
    >
      <DifficultyStyled className='overall-progress'>
        <div className='difficulty-items'>
          {new Array(MAX_DIFFICULTY)
            .fill('')
            .map((_, index) => (
              <div key={index} className={classNames('difficulty-item', index + 1 <= difficulty && 'isFilled')} />
            ))}
        </div>
      </DifficultyStyled>
    </Tooltip>
  )
}