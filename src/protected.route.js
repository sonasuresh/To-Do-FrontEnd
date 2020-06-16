import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isUserAuthenticated, isAdminAuthenticated } from './auth'

export const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAdminAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

                }
            }}
        />
    );
}

export const UserProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isUserAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

                }
            }}
        />
    );
}

export const SharedProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isUserAuthenticated() || isAdminAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: props.location, state: { from: props.location } }} />

                }
            }}
        />
    );
}
