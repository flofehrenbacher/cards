import { css } from '@emotion/core'
import React from 'react'
import { Player } from '../..'
import { Header } from '../components/header/header'
import { colors } from '../../styles/global'

export function Players({ players }: { players: Player[] }) {
  console.log({ players })
  return (
    <div css={pageStyles}>
      <Header />
      {players.map((player) => (
        <h2 key={player.name}>{player.name}</h2>
      ))}
    </div>
  )
}

const pageStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: ${colors.white};
  flex-direction: column;
`
