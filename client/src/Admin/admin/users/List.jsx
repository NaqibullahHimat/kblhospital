import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '../../_services/index';
import {updateStatus} from "./UpdateStatus"

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
let update = 0;
    useEffect(() => {
        accountService.getAll().then(x => setUsers(x));
    }, [update]);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        accountService.delete(id).then((res) => {
            setUsers(users.filter(x => x.id !== id));
        });
    }
function updateVarification(user){
    users.forEach(u=> {
        if(u.id === user.id){
            if(u.isVerified){
                setUsers({...user, isVerified:false})
            }
            else{
                setUsers({...user, isVerified:true})
            }
        }
    })
}
    return (
        <div>
            <h1>Users</h1>
            <p>All users from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '30%' }}>Status</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.title} {user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><div className="dropdown">
                            {console.log("list",user.isVerified)}
                           {!(accountService.userValue.firstName === user.firstName )? <div><button className="btn btn-secondary dropdown-toggle" type="button"
                           id="dropdownMenuButton" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                          {user.isVerified?"Verified":"Pending"}
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"  >
                            <a className="dropdown-item" onClick={()=>{
                                updateStatus(user.id, {...user, isVerified:user.isVerified?false:true})
                            }}>{user.isVerified?"Pending":"Verified"}</a>
                            {//<a className="dropdown-item" onClick={()=>updateStatus(user.id, {...user, isVerified:"Blocked"})}>Blocked</a>
                  }
                            </div></div>:""}
                          </div></td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };