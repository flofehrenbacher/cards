import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { clientListen } from '../socket-io/server-to-client'
import { GlobalStyles } from '../styles/global'
import { AppStateProvider, appStateReducer, DispatchProvider, initialState } from './app-state'
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
    clientListen(history, dispatch)
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
