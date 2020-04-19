import React from 'react'
import { css } from '@emotion/core'
import { PlayerIcon } from '../../player-icon'
import { colors } from '../../../../styles/global'

export function SinglePlayer({ name, ...props }: { name: string }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
      `}
      {...props}
    >
      <PlayerIcon css={{ height: 40, width: 40 }} />
      <p
        css={css`
          display: flex;
          justify-content: center;
          background: ${colors.mint};
        `}
        key={name}
      >
        {name}
      </p>
    </div>
  )
}
