import React from 'react'
import { css } from '@emotion/core'
import { Player } from './players-list'

export function JoinForm({
  setPlayers,
}: {
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}) {
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
        setPlayers((players) => [...players, { name }])
        socket.emit('add user', { name })
        setName('')
      }}
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
`
