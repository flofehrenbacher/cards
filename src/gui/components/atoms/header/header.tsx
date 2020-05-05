import { css } from '@emotion/core'
import React from 'react'
import { colors } from '../../../../styles/global'

export function Header(props: any) {
  return (
    <h1 css={[headerStyles, { justifySelf: 'flex-start' }]} {...props}>
      Kattln
    </h1>
  )
}

const headerStyles = css`
  position: fixed;
  top: 5;
  text-align: center;
  font-size: 32px;
  letter-spacing: 4px;
  width: 100%;
  padding: 16px;
  background: ${colors.blue};
  color: ${colors.mint};
  z-index: 100;
`
