import { css } from '@emotion/core'
import React from 'react'

import { colors } from '../../styles/global'
import { Header } from '../components/header/header'
import { NicknameForm } from '../components/nickname-form/nickname-form'

export function Home() {
  return (
    <div css={pageStyles}>
      <Header />
      <NicknameForm />
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
  position: fixed;
  bottom: 0;
`
