import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Router from './Router'

import './app.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Router} />
    </BrowserRouter>
  )
}

export default App
