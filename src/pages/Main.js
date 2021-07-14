import React, { useContext } from 'react'
import { Switch, Route } from 'react-router'
import Home from './home/Home'
import Register from './register/Register'
import Login from './login/Login'
import Single from './single/Single'
import Write from './write/Write'
import Settings from './settings/Settings'
import { GlobalState } from '../GlobalState'
import PostManage from './postManage'
import UserManage from './userManage'

export default function Main() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Home} />

            <Route exact path="/post-manage" component={PostManage} />
            <Route exact path="/user-manage" component={UserManage} />

            <Route exact path="/register" component={isLogged ? Home : Register} />

            <Route exact path="/login" component={isLogged ? Home : Login} />
            <Route exact path="/posts/:id" component={Single} />

            <Route exact path="/write" component={isLogged ? Write : Login} />
            <Route exact path="/settings" component={isLogged ? Settings : Login} />
            {isLogged ? <Settings /> : <Login />}
        </Switch>
    )
}

