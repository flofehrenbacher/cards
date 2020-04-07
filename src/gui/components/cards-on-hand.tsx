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
      <p>Meine Hand</p>
      <ul css={handStyles}>
        {cards.map((c) => (
          <li
            key={c}
            css={cardStyles}
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
      <p>Stapel</p>
      <ul css={handStyles}>
        {stack.map((s) => (
          <li key={s} css={cardStyles}>
            {s}
          </li>
        ))}
      </ul>
    </>
  )
}

const handStyles = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const cardStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border-radius: 5px;
  width: 30px;
  height: 60px;
`
