import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import { CardType, Player } from '../model/model'
import { GlobalStyles } from '../styles/global'
import { AppStateProvider, appStateReducer, DispatchProvider, initialState } from './app-state'
import { TransitionTime } from './components/nickname-form/nickname-form'
import { Game } from './pages/game'
import { Home } from './pages/home'
import { Players } from './pages/players'

export function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AppWithAccessToRoutes />
      </Router>
    </>
  )
}

function AppWithAccessToRoutes() {
  const [appState, dispatch] = React.useReducer(appStateReducer, initialState)

  const history = useHistory()

  React.useEffect(() => {
    socket.on('update users', (data: Player[]) => {
      dispatch({ type: 'update-players', payload: data })
    })

    socket.on('assign id', (data: Player) => {
      dispatch({ type: 'assign-me', payload: data })
    })

    socket.on('assign cards', (data: CardType[]) => {
      setTimeout(() => history.push('/game'), TransitionTime)
      dispatch({ type: 'assign-cards', payload: data })
    })

    socket.on('update stack', (data: CardType[]) => {
      dispatch({ type: 'update-stack', payload: data })
    })
  }, [])

  return (
    <Switch>
      <DispatchProvider value={dispatch}>
        <AppStateProvider value={appState}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/players">
            <Players />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </AppStateProvider>
      </DispatchProvider>
    </Switch>
  )
}

const main = document.createElement('main')
main.style.height = '100%'
document.body.append(main)

ReactDOM.render(<App />, main)
