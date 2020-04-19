import React from 'react'
import { Header } from './components/atoms/header/header'
import { useAppState } from './app-state'
import { css } from '@emotion/core'
import { colors } from '../styles/global'

export function Layout({ children }: any) {
  const { lastAction } = useAppState()
  return (
    <div css={pageStyles}>
      <Header />
      {children}
      {lastAction && <section css={lastActionStyles}>{lastAction}</section>}
    </div>
  )
}

const lastActionStyles = css`
  color: ${colors.mint};
  z-index: 100;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${colors.green};
`

const pageStyles = css`
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
