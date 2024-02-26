import React, { useState, useEffect } from 'react';

import UserStates from "@/Components/Users/UserStates";
import UpdateButtons from "@/Components/Users/UpdateButtons";
import ChangeRole from "@/Components/Users/ChangeRole";
import SuccessForm from "@/Components/SuccesForm";
import { Link } from 'react-router-dom';

export default function IndexComponent()
{
    const {
        userStates,
        setUserStates,
        authStates,
    } = UserStates();

    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="container">
            <Link to='/admin/users/create'>
                <button className="btn btn-primary top-btn">
                    Create
                </button>
            </Link>
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
                                            setIsSuccess={setIsSuccess}
                                        />
                                        <UpdateButtons
                                            user={user}
                                            userStates={userStates}
                                            setUserStates={setUserStates}
                                            setIsSuccess={setIsSuccess}
                                        />
                                    </td>
                            : ''}
                        </tr>
                    ))}
                </tbody>
            </table>
            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
}

