import { css } from '@emotion/core'
import { isEmpty } from 'ramda'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { clientEmit } from '../../../socket-io/client-to-server'
import { colors } from '../../../styles/global'
import { useAppState } from '../../app-state'
import { RightArrowButton } from '../atoms/buttons/buttons'

export function NicknameForm({
  onSubmitNewPlayer,
  ...props
}: {
  onSubmitNewPlayer: (name: string) => void
}) {
  const { players } = useAppState()
  const [name, setName] = React.useState('')
  const input = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <form
      css={{ display: 'flex', flexDirection: 'column', maxWidth: 160 }}
      onSubmit={event => {
        event.preventDefault()
        if (!isEmpty(name) && !players.some(p => name === p.name)) {
          onSubmitNewPlayer(name)
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
      <RightArrowButton title="Namen bestätigen" />
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
