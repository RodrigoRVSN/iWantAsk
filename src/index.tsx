/* eslint-disable no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './services/firebase'

import './styles/global.scss'
import './styles/animations.scss'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root')
)
