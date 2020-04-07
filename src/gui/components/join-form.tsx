import React from 'react'
import { css } from '@emotion/core'
import { isEmpty } from 'ramda'
import { User } from '../..'

export function JoinForm({ users, ...props }: { users: User[] }) {
  const [name, setName] = React.useState('')
  const input = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <form
      css={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={(event) => {
        event.preventDefault()
        if (!isEmpty(name) && !users.some((p) => name === p.name)) {
          socket.emit('add user', { name })
          setName('')
        }
      }}
      {...props}
    >
      <label htmlFor="player-name" css={{ marginBottom: 8 }}>
        Name
      </label>
      <input
        ref={input}
        onChange={(event) => setName(event.target.value)}
        value={name}
        id="player-name"
        css={[inputStyles, { marginBottom: 8 }]}
      ></input>
      <button css={buttonStyles}>Beitreten</button>
      <button
        css={buttonStyles}
        onClick={(e) => {
          e.preventDefault()
          socket.emit('reset users')
        }}
      >
        Reset
      </button>
    </form>
  )
}

const inputStyles = css`
  background: transparent;
  color: white;
  border: none;
  font-size: 18px;
  border-bottom: white 2px solid;
`

const buttonStyles = css`
  border-radius: 0;
  border: white 2px solid;
  background: black;
  color: white;
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
`
