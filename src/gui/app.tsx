import React from 'react'
import ReactDOM from 'react-dom'
import { css, Global } from '@emotion/core'
import emotionReset from 'emotion-reset'
import { JoinForm } from './components/join-form'
import { UsersList } from './components/users-list'
import { GiveCards } from './components/give-cards'
import { CardsOnHand } from './components/cards-on-hand'
import { User } from '..'

export function App() {
  const [users, setPlayers] = React.useState<User[]>(() => [])
  const [me, setMe] = React.useState<User | undefined>(undefined)

  React.useEffect(() => {
    socket.on('update users', (data: User[]) => {
      setPlayers(data)
    })

    socket.on('assign id', (data: User) => {
      setMe({
        name: data.name,
        id: data.id,
      })
    })
  }, [])

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
        <UsersList users={users} css={{ width: '90%', padding: 8, marginBottom: 16 }} />
        <h1 css={[headlineStyles, { marginBottom: 16 }]}>Cards</h1>
        {me ? <h2>{me.name}</h2> : <JoinForm users={users} />}
        <GiveCards />
        <CardsOnHand />
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
