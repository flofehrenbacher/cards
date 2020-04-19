import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { clientEmit } from '../socket-io/client-to-server'
import { clientListen } from '../socket-io/server-to-client'
import { GlobalStyles } from '../styles/global'
import {
  AppStateProvider,
  appStateReducer,
  DispatchProvider,
  initialState,
  useAppState,
} from './app-state'
import { LeftArrowButton } from './components/atoms/buttons'
import { Card } from './components/atoms/card'
import { Game } from './components/pages/game/game'
import { Home } from './components/pages/home'
import { Players } from './components/pages/players/players'
import { Layout } from './layout'

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

  function onSubmitNewPlayer(name: string) {
    clientEmit({ type: 'add-player', payload: { name } })
    history.push('/players')
  }

  return (
    <Switch>
      <DispatchProvider value={dispatch}>
        <AppStateProvider value={appState}>
          <Route exact path="/">
            <Home onSubmitNewPlayer={onSubmitNewPlayer} />
          </Route>
          <Route path="/players">
            <Players />
          </Route>
          <Route path="/game">
            <Game onClickLastTrick={() => history.push('/last-trick')} />
          </Route>
          <Route path="/last-trick">
            <LastTrick onLeftArrowClick={() => history.push('/game')} />
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

function LastTrick({ onLeftArrowClick }: { onLeftArrowClick: () => void }) {
  const { lastTrick } = useAppState()
  return (
    <Layout>
      <section
        css={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <LeftArrowButton title="Zurück zum Spiel" onClick={onLeftArrowClick}></LeftArrowButton>
        {lastTrick ? (
          <div css={{ display: 'flex', justifyContent: 'center' }}>
            {lastTrick.map(card => (
              <Card card={card} />
            ))}
          </div>
        ) : (
          <p>Es wurde noch kein Stick gemacht</p>
        )}
      </section>
    </Layout>
  )
}
