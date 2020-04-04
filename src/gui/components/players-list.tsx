import React from 'react'

export type Player = {
  name: string
}

export function PlayersList({ players, ...props }: { players: Player[] }) {
  return (
    <ol css={{ display: 'flex', justifyContent: 'space-evenly' }} {...props}>
      {players.map((p, i) => (
        <li
          key={i}
          css={{
            color: 'white',
            padding: 16,
            borderBottom: '2px solid white',
            borderTop: '2px solid white',
            marginRight: 16,
          }}
        >
          Spieler {i + 1}: {p.name}
        </li>
      ))}
    </ol>
  )
}
