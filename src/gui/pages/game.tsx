import { css } from '@emotion/core'
import React from 'react'
import { Player } from '../../model'
import { Card } from '../components/card/card'
import { Header } from '../components/header/header'
import { SinglePlayer } from '../components/single-player/single-player'
import { pageStyles } from './home'

type Card = import('../../model').Card

export function Game({
  players,
  me,
  myCards,
}: {
  players: Player[]
  me?: Player
  myCards: Card[]
}) {
  return (
    <div css={pageStyles}>
      <Header />
      <section css={playersListStyles}>
        {players
          .filter(p => p.name !== me?.name)
          .map(player => (
            <SinglePlayer name={player.name} key={player.name} />
          ))}
      </section>
      <div css={{ flexGrow: 1 }} />
      <section
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {myCards.map((card, index) => (
          <Card
            card={card}
            css={{
              // top: -Math.sin((index / myCards.length) * 180) * 100,
              left: (myCards.length * 60) / 2 - 30 - index * 60,
              transform: `rotate(${-60 + (index / (myCards.length - 1)) * 120}deg)`,
              zIndex: index,
              flexShrink: 0,
            }}
          />
        ))}
      </section>
    </div>
  )
}

const playersListStyles = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  justify-self: flex-start;
  margin-top: 32px;
`
