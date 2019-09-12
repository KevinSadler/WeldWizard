import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import WeldersHelper from './components/WeldersHelper'
import './index.css'

ReactDOM.render(
    <Router>
        <WeldersHelper />
    </Router>
    , document.getElementById('root'))
 