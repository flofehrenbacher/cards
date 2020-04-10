import { css } from '@emotion/core'
import { isEmpty } from 'ramda'
import React from 'react'
import { Player } from '../../..'
import { colors } from '../../../styles/global'
import { Link, useHistory } from 'react-router-dom'

const TransitionTime = 200

export function NicknameForm({ players, ...props }: { players: Player[] }) {
  const [name, setName] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)
  const input = React.useRef<HTMLInputElement>(null)

  const history = useHistory()

  React.useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <form
      css={{ display: 'flex', flexDirection: 'column', maxWidth: 160 }}
      onSubmit={(event) => {
        event.preventDefault()
        if (!isEmpty(name) && !players.some((p) => name === p.name)) {
          socket.emit('add user', { name })
          setSubmitted(true)
          setName('')
          setTimeout(() => history.push('/players'), TransitionTime)
        }
      }}
      {...props}
    >
      <label htmlFor="player-name" css={{ fontSize: 14, marginBottom: 4 }}>
        Spielername
      </label>
      <input
        ref={input}
        onChange={(event) => setName(event.target.value)}
        value={name}
        id="player-name"
        css={[inputStyles, { marginBottom: 16 }]}
      ></input>
      <button css={[buttonStyles(submitted), { alignSelf: 'center' }]} title="Namen bestätigen">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512">
          <path
            fill={colors.white}
            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
          />
        </svg>
      </button>
    </form>
  )
}

const inputStyles = css`
  background: ${colors.mint};
  color: ${colors.black};
  border: none;
  font-size: 20px;
  padding-bottom: 4px;
  padding-top: 4px;
  border-bottom: ${colors.black} 2px solid;
`

const buttonStyles = (clicked: boolean) => css`
  border-radius: 0;
  border: ${colors.green} 3px solid;
  background: ${colors.green};
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
  opacity: ${clicked ? 0 : 1};
  width: 40px;
  height: 40px;
  transform: ${clicked ? 'scale(4)' : 'none'};
  transition: ease-in-out all ${TransitionTime}ms;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    border: 3px ${colors.mint} solid;
  }
`
