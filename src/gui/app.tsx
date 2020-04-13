import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyles } from '../styles/global'
import { Home } from './pages/home'
import { Players } from './pages/players'
import { Game } from './pages/game'
import { Player, Card } from '../model/model'

export default function App() {
  const [me, setMe] = React.useState<Player | undefined>(undefined)
  const [myCards, setMyCards] = React.useState<Card[]>([])
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

    socket.on('assign cards', (data: Card[]) => {
      setMyCards(data)
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
            <Players players={players} me={me} />
          </Route>
          <Route path="/game">
            <Game players={players} me={me} myCards={myCards} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

const main = document.createElement('main')
main.style.height = '100%'
document.body.append(main)

ReactDOM.render(<App />, main)
