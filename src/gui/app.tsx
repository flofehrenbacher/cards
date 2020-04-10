import React from 'react'
import ReactDOM from 'react-dom'
import { css, Global } from '@emotion/core'
import { JoinForm } from './components/join-form'
import { UsersList } from './components/users-list'
import { GiveCards } from './components/give-cards'
import { Hand } from './components/hand/hand'
import { User } from '..'
import { GlobalStyles } from '../styles/global'

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
      <GlobalStyles />
      <div css={pageStyles}>
        <h1 css={[headlineStyles, { marginBottom: 16, justifySelf: 'flex-start' }]}>Kattln</h1>
        {me ? <h2>{me.name}</h2> : <JoinForm users={users} />}
        <UsersList me={me} users={users} css={{ width: '90%', padding: 8, marginBottom: 16 }} />
        <GiveCards />
        <Hand />
      </div>
    </>
  )
}

const pageStyles = css`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  flex-direction: column;
`

const headlineStyles = css`
  text-align: center;
  font-size: 50px;
  letter-spacing: 10px;
  width: 100%;
  padding: 12px;
  background: white;
  color: black;
`

const main = document.createElement('main')
document.body.append(main)

ReactDOM.render(<App />, main)
