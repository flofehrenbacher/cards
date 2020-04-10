import { render } from '@testing-library/react'
import { App } from './app'
import React from 'react'

jest.mock('./app', () => ({
  App: () => <></>,
}))

describe('app', () => {
  it('should not explode', () => {
    render(<App />)
  })
})
