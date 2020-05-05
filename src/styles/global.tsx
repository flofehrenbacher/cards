import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'
import React from 'react'

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        ${emotionReset};
        html,
        body {
          height: 100%;
        }
        html {
          font-family: Arial, Helvetica, sans-serif;
          box-sizing: border-box;
          color: ${colors.black};
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `}
    />
  )
}

export const colors = {
  black: '#eaf2ef',
  white: '#1e152a',
  blue: '#1e152a',
  mint: '#eaf2ef',
  green: '#1a181b',
}
