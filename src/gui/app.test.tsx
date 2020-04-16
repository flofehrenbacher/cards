import { render } from '@testing-library/react'
import React from 'react'
import { App } from './app'

jest.mock('./app', () => ({
  App: () => <></>,
}))

describe('app', () => {
  it('should not explode', () => {
    render(<App />)
  })
})
