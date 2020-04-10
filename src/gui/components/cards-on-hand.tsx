import React from 'react'
import { css } from '@emotion/core'

export function CardsOnHand() {
  const [cards, setCards] = React.useState([])
  const [stack, setStack] = React.useState<number[]>([])

  React.useEffect(() => {
    socket.on('assign cards', (data: any) => {
      setCards(data)
    })

    socket.on('update stack', (data: number) => {
      setStack((prev) => [...prev, data])
    })
  }, [])

  return (
    <>
      <ul css={stackStyles}>
        {stack.map((s, i) => (
          <li key={s} css={cardStackStyles(i, stack.length)}>
            {s}
          </li>
        ))}
      </ul>
      <ul css={handStyles}>
        {cards.map((c, i) => (
          <li
            key={c}
            css={cardStyles(i, cards.length)}
            onClick={() => {
              console.log('play card', c)
              setCards((prev) => prev.filter((card) => card !== c))
              socket.emit('play card', { card: c })
            }}
          >
            {c}
          </li>
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

const cardStackStyles = (card: number, total: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border-radius: 5px;
  width: 80px;
  height: 160px;
  position: absolute;
  transform: rotate(${card * 4}deg);
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
