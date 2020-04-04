import React from 'react'
import ReactDOM from 'react-dom'
import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'
import { JoinForm } from './components/join-form'
import { PlayersList, Player } from './components/players-list'

export function App() {
  const [players, setPlayers] = React.useState<Player[]>([])

  return (
    <>
      <Global
        styles={css`
          ${emotionReset};
          * {
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
      />
      <div css={pageStyles}>
        <PlayersList players={players} css={{ width: '90%', padding: 8, marginBottom: 16 }} />
        <h1 css={[headlineStyles, { marginBottom: 16 }]}>Cards</h1>
        <JoinForm setPlayers={setPlayers} />
      </div>
    </>
  )
}

const pageStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  flex-direction: column;
`

const headlineStyles = css`
  font-size: 50px;
  letter-spacing: 10px;
`

const main = document.createElement('main')
document.body.append(main)

ReactDOM.render(<App />, main)
