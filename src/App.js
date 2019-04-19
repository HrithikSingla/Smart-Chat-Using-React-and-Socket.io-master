import React, { Component } from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/" component={Login} />
                    <Route path = "/Signup" component = {Signup} />
                    <Route exact path = "/Home" component={Home} />
                    <Route path = "/Login" component = {Login} />
                    <div className="App">
                        <Login />
                    </div>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
