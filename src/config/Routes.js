import React from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Home from '../views/Home'
import Senschema from '../views/Senschema'

function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home" component={Home} />
                <Route exact path="/swagger-to-schema" component={Senschema} />
            </Switch>
        </HashRouter>
    )
}

export default Routes;