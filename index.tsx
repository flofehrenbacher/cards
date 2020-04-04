import { Global } from '@emotion/core'
import { MuiThemeProvider } from '@material-ui/core'
import Amplify from 'aws-amplify'
import {
  ConfirmSignIn,
  ForgotPassword,
  Loading,
  RequireNewPassword,
  SignIn,
  TOTPSetup,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react'
import React from 'react'
import ReactDOM from 'react-dom'

import * as Config from '../utils/config'
import * as logging from '../utils/logging'
import { ErrorBoundary } from './components/error-boundary'
import { Table } from './components/table'
import { NotificationProvider } from './context/notification-provider'
import { globalStyles } from './styles/global'
import { muiTheme } from './styles/mui-theme'

logging.useSimpleFormat()

if (document.location.host.includes('localhost')) {
  Config.setEnv('dev')
} else if (document.location.host.includes('stage')) {
  Config.setEnv('stage')
} else {
  Config.setEnv('prod')
}

const App = () => (
  <ErrorBoundary>
    <MuiThemeProvider theme={muiTheme}>
      <Global styles={globalStyles} />
      <NotificationProvider>
        <Table />
      </NotificationProvider>
    </MuiThemeProvider>
  </ErrorBoundary>
)

/* eslint-disable */
const AppWithAuth = withAuthenticator(App, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <RequireNewPassword />,
  <VerifyContact />,
  <ForgotPassword />,
  <TOTPSetup />,
  <Loading />,
])

const main = document.createElement('main')
document.body.append(main)

Config.getUserPoolId().then(userPoolId => {
  Config.getUserPoolWebClientId().then(userPoolWebClientId => {
    Amplify.configure({
      Auth: {
        region: 'eu-central-1',
        mandatorySignIn: true,
        authenticationFlowType: 'USER_PASSWORD_AUTH',
        userPoolId,
        userPoolWebClientId,
      },
    })
    ReactDOM.render(<AppWithAuth />, main)
  })
})
