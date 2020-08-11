import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';

function App() {
    const { pathname } = useLocation();  
    return (
        <div className='app-container'>
            <Nav />
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} 
                />
                <Route exact path="/" component={Home} />
                <Route path="/account" component={Account} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export { App }; 