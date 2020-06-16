import React, { Component } from 'react';
import { Route, Switch, } from 'react-router-dom'


import LoginView from './LoginView'
import RegisterView from './RegisterView'
import TaskView from './TaskView'
import UserView from './UsersView'
import NewToDoView from './NewToDoView';
import ToDoListingView from './ToDoListingView';
import { UserProtectedRoute, AdminProtectedRoute, SharedProtectedRoute } from '../protected.route'


class RootView extends Component {
    render() {
        return (
            <div className="wrapper">
                <Switch>
                    <Route path="/login" exact component={LoginView}></Route>
                    <Route path="/register" exact component={RegisterView}></Route>
                    <SharedProtectedRoute path="/home" exact component={TaskView}></SharedProtectedRoute>
                    <AdminProtectedRoute path="/users" exact component={UserView}></AdminProtectedRoute>
                    <AdminProtectedRoute path="/newtodo" exact component={NewToDoView}></AdminProtectedRoute>
                    <UserProtectedRoute path="/user/todos" exact component={ToDoListingView}></UserProtectedRoute>
                    <Route path="*" component={() => "404 NOT FOUND"}></Route>
                </Switch>
            </div>
        )
    }
}

export default RootView;