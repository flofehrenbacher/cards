import React from 'react'
import { css } from '@emotion/core'

export function GiveCards(props: any) {
  return (
    <button
      css={buttonStyles}
      onClick={(e) => {
        e.preventDefault()
        socket.emit('give cards')
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
