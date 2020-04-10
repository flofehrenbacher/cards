import { css } from '@emotion/core'
import React from 'react'
import { Player } from '../..'
import { NicknameForm } from '../components/nickname-form/nickname-form'
import { Header } from '../components/header/header'
import { colors } from '../../styles/global'

export function Home({ players }: { players: Player[] }) {
  return (
    <div css={pageStyles}>
      <Header />
      <NicknameForm players={players} />
    </div>
  )
}

const pageStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: ${colors.white};
  flex-direction: column;
`
