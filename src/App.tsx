/* eslint-disable no-use-before-define */
import React, { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { UserRoom } from './pages/UserRoom'
import { AdminRoom } from './pages/AdminRoom'

import { AuthContextProvider } from './contexts/AuthContext'

function App(): JSX.Element {
    return (
        <>
            <BrowserRouter>
                <AuthContextProvider>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/rooms/new" exact component={NewRoom} />
                        <Route path="/rooms/:id" component={UserRoom} />
                        <Route path="/admin/rooms/:id" component={AdminRoom} />
                    </Switch>
                </AuthContextProvider>
            </BrowserRouter>
        </>
    )
}

export default App
