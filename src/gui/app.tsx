import React from 'react'
import ReactDOM from 'react-dom'
import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'

export const App = () => (
  <>
    <Global styles={emotionReset} />
    <h1 css={headlineStyles}>Cards</h1>
  </>
)

const headlineStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
  background: #000;
  color: #fff;
  letter-spacing: 10px;
`

const main = document.createElement('main')
document.body.append(main)

ReactDOM.render(<App />, main)
