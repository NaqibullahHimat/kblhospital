import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { accountService } from '../_services/index';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;
console.log(user);

    return (
        <div>
            <h1>My Profile</h1>
            {user.doctorId ? <Redirect to={`/doctor/profile/${user.doctorId}`} />:""}
            {user.hospitalId ? <Redirect to={`/hospital/profile/${user.hospitalId}`} />:""}
            <p>
                <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to={`${path}/update`}>Update Profile</Link></p>
        </div>
    );
}

export { Details };