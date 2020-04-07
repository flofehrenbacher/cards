import React from 'react'

export function CardsOnHand() {
  const [cards, setCards] = React.useState([])
  return (
    <>
      <p>Meine Hand</p>
      <ul>
        {cards.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
    </>
  )
}
