import { css } from '@emotion/core'
import React from 'react'
import { NicknameForm } from '../components/nickname-form/nickname-form'
import { Header } from '../components/header/header'
import { colors } from '../../styles/global'
import { Player } from '../../model'

export function Home({ players }: { players: Player[] }) {
  return (
    <div css={pageStyles}>
      <Header />
      <NicknameForm players={players} />
    </div>
  )
}

export const pageStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  flex-direction: column;
  padding-top: 64px;
  overflow: hidden;
`
