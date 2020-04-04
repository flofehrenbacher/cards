import { render } from '@testing-library/react'
import { App } from './app'
import React from 'react'

describe('app', () => {
  it('should not explode', () => {
    render(<App />)
  })
})
