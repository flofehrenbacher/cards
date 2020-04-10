import emotionReset from 'emotion-reset'
import React from 'react'
import { css, Global } from '@emotion/core'

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        ${emotionReset};
        * {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}
    />
  )
}
