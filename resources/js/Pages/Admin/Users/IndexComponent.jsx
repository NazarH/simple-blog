import React, { useState, useEffect } from 'react';

import axios from 'axios';

import UserStates from "@/Components/Users/UserStates";
import UpdateButtons from "@/Components/Users/UpdateButtons";
import ChangeRole from "@/Components/Users/ChangeRole";
import CreateForm from "@/Components/Users/CreateForm.jsx";

export default function IndexComponent()
{
    const {
        userStates,
        setUserStates,
        authStates,
        setAuthStates
    } = UserStates();

    return (
        <div className="container">
            <CreateForm />
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userStates &&
                        userStates.map((user) => (
                        <tr key={ user.id }>
                            <td>{ user.id }</td>
                            <td>{ user.login }</td>
                            <td>
                                {user.role}
                                { authStates && authStates.id === user.id ? '(auth)' : '' }
                            </td>
                            <td>
                                { user.is_active ? 'Active' : 'Ban' }
                            </td>
                            { authStates &&
                                authStates.id !== user.id ?
                                    <td className={ user.role !== 'admin' ? 'user-btns' : '' }>
                                        <ChangeRole
                                            authStates={authStates}
                                            user={user}
                                            setUserStates={setUserStates}
                                        />
                                        <UpdateButtons
                                            user={user}
                                            userStates={userStates}
                                            setUserStates={setUserStates}
                                        />
                                    </td>
                            : ''}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

