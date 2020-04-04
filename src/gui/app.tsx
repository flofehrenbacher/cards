import React from 'react'
import ReactDOM from 'react-dom'

export const App = () => <h1>blue</h1>

const main = document.createElement('main')
document.body.append(main)

ReactDOM.render(<App />, main)
