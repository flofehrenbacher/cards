import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyles } from '../styles/global'
import { Home } from './pages/home'
import { Players } from './pages/players'
import { Player } from '..'

export default function App() {
  const [me, setMe] = React.useState<Player | null>(null)
  const [players, setPlayers] = React.useState<Player[]>(() => [])

  React.useEffect(() => {
    socket.on('update users', (data: Player[]) => {
      console.log({ data })
      setPlayers(data)
    })

    socket.on('assign id', (data: Player) => {
      setMe({
        name: data.name,
        id: data.id,
      })
    })
  }, [])

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home players={players} />
          </Route>
          <Route path="/players">
            <Players players={players} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

const main = document.createElement('main')
document.body.append(main)

ReactDOM.render(<App />, main)
