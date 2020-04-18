import React from 'react'
import { css } from '@emotion/core'
import { clientEmit } from '../../socket-io/client-to-server'
import { useAppState } from '../app-state'

export function GiveCards(props: any) {
  const { me } = useAppState()
  return (
    <button
      css={buttonStyles}
      onClick={e => {
        e.preventDefault()
        clientEmit({ event: 'give-cards', payload: { playerName: me?.name } })
      }}
      {...props}
    >
      Karten geben
    </button>
  )
}

const buttonStyles = css`
  border-radius: 0;
  border: white 2px solid;
  background: black;
  color: white;
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
`
