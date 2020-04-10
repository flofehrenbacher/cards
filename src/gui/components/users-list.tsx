import React from 'react'
import { Player } from '../..'

export function UsersList({ me, users, ...props }: { me: Player | undefined; users: Player[] }) {
  return (
    <ol css={{ display: 'flex', justifyContent: 'space-evenly' }} {...props}>
      {users.map((u, i) => (
        <li
          key={u.name}
          css={{
            color: u.name === me?.name ? 'white' : 'green',
            padding: 16,
            borderBottom: '2px solid white',
            borderTop: '2px solid white',
            marginRight: 16,
          }}
        >
          Spieler {i + 1}: {u.name}
        </li>
      ))}
    </ol>
  )
}
