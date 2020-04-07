import React from 'react'
import { User } from '../..'

export function UsersList({ users, ...props }: { users: User[] }) {
  return (
    <ol css={{ display: 'flex', justifyContent: 'space-evenly' }} {...props}>
      {users.map((p, i) => (
        <React.Fragment key={p.name}>
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
          <button onClick={() => socket.emit('remove user', p)}>x</button>
        </React.Fragment>
      ))}
    </ol>
  )
}
