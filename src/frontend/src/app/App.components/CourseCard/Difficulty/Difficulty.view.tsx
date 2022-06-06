import React from 'react'

import classNames from 'classnames';
import { DifficultyStyled } from './Difficulty.style';

const MAX_DIFFICULTY = 5;

interface IDifficulty {
  difficulty: number
}

export const Difficulty = ({ difficulty }: IDifficulty) => {
  return (
    <DifficultyStyled className='overall-progress'>
      <div className='difficulty-items'>
        {new Array(MAX_DIFFICULTY)
          .fill('')
          .map((_, index) => (
            <div key={index} className={classNames('difficulty-item', index + 1 <= difficulty && 'isFilled')} />
          ))}
      </div>
    </DifficultyStyled>
  )
}