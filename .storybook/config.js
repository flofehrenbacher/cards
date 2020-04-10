import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { GlobalStyles } from '../src/styles/global'

const withGlobal = (cb) => (
  <React.Fragment>
    <GlobalStyles />
    {cb()}
  </React.Fragment>
)

addDecorator(withGlobal)
