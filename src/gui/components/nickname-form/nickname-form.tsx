import { css } from '@emotion/core'
import { isEmpty } from 'ramda'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { colors } from '../../../styles/global'
import { useAppState } from '../../app-state'
import { clientEmit } from '../../../socket-io/client-to-server'

export const TransitionTime = 500

export function NicknameForm(props: any) {
  const { players } = useAppState()
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
      onSubmit={event => {
        event.preventDefault()
        if (!isEmpty(name) && !players.some(p => name === p.name)) {
          clientEmit({ event: 'add-player', payload: { name } })
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
        onChange={event => setName(event.target.value)}
        value={name}
        id="player-name"
        css={[inputStyles, { marginBottom: 16 }]}
      ></input>
      <button css={[buttonStyles(submitted), { alignSelf: 'center' }]} title="Namen bestätigen">
        <img
          src={`${window.location.origin}/public/arrow.svg`}
          css={{ width: '100%', height: 'auto' }}
        />
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
  background: ${colors.white};
  cursor: pointer;
  opacity: ${clicked ? 0 : 1};
  width: 50px;
  height: 50px;
  transform: ${clicked ? 'scale(4)' : 'none'};
  transition: ease-in-out all ${TransitionTime}ms;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    border: 3px ${colors.mint} solid;
  }
`
