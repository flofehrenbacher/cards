import React from 'react'
import { css } from '@emotion/core'
import { Card } from '../card/card'

type Card = import('../../../model').Card

export function Hand() {
  const [cards, setCards] = React.useState<Card[]>([])
  const [stack, setStack] = React.useState<Card[]>([])

  React.useEffect(() => {
    socket.on('assign cards', (data: Card[]) => {
      setCards(data)
    })

    socket.on('update stack', (data: Card) => {
      setStack(prev => [...prev, data])
    })
  }, [])

  return (
    <>
      <ul css={stackStyles}>
        {stack.map((card, i) => (
          <Card card={card} key={`${card.icon}-${card.name}`} css={cardStackStyles(i)} />
        ))}
      </ul>
      <ul css={handStyles}>
        {cards.map((card, i) => (
          <Card
            card={card}
            key={`${card.icon}-${card.name}`}
            css={cardStyles(i, cards.length)}
            onClick={() => {
              setCards(prev => prev.filter(c => c !== card))
              socket.emit('play card', { card })
            }}
          />
        ))}
      </ul>
    </>
  )
}

const handStyles = css`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 500px;
  position: relative;
`

const stackStyles = css`
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
`

const cardStackStyles = (card: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border-radius: 5px;
  width: 80px;
  height: 160px;
  position: absolute;
  transform: rotate(${card * 10}deg);
  border: 1px solid black;
  z-index: ${card};
`

const cardStyles = (card: number, total: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border-radius: 5px;
  width: 80px;
  height: 160px;
  position: absolute;
  transform: rotate(${-60 + (card / (total - 1)) * 120}deg);
  left: ${(card / (total - 1)) * 90}%;
  border: 1px solid black;
  z-index: ${card};
`
