import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function IndexComponent()
{
    let users = [];
    let auth = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users/index');
                setUserStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAuth = async () => {
            try {
                const response = await axios.get('/api/auth');
                setAuthStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchAuth();
    }, []);

    const [userStates, setUserStates] = useState(users);
    const [authStates, setAuthStates] = useState();

    /* Зміна ролі */

    const changeRole = async (id, newRole) => {
        const formData = new FormData();
        formData.append('role', newRole);
        formData.append('_token', window.csrfToken);

        try {
            await axios.post(`/admin/users/${id}/update`, formData);
            setUserStates((prevStates) =>
                prevStates.map((userState) => {
                    if (userState.id === id) {
                        return { ...userState, role: newRole, isEditing: false };
                    }
                    return userState;
                })
            );
        } catch (error) {
          console.error('Error saving role changes:', error);
        }
    };

    /* ban/unban user */

    const updateUser = async (id, action) => {
        const formData = new FormData();
        formData.append('is_active',
            userStates.find((user) => user.id === id).is_active === 1
                ? 0
                : 1
        );
        formData.append('_token', window.csrfToken);

        try {
            await axios.post(`/admin/users/${id}/${action}`, formData);

            setUserStates((prevStates) =>
                prevStates.map((userState) => {
                    if (userState.id === id) {
                        return { ...userState, is_active: userState.is_active === 1 ? 0 : 1, isEditing: false };
                    }
                    return userState;
                })
            );
        } catch (error) {
            console.error('Error saving tag changes:', error);
        }
    };

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
                    {userStates.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.login}</td>
                            <td>
                                {user.role} {authStates.id === user.id ? '(auth)' : ''}
                            </td>
                            <td>{user.is_active === 1 ? 'Active' : 'Ban'}</td>
                            {authStates.id !== user.id ?
                                <td className={user.role !== 'admin' ? 'user-btns' : ''}>
                                    {authStates.id !== user.id && user.is_active !== 0 && (
                                        <form action={`/admin/users/${user.id}/update`} method="POST">
                                            <input type="hidden"
                                                   name="_token"
                                                   defaultValue={window.csrfToken}
                                            />
                                            <select name="role"
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        changeRole(user.id, e.target.value)}>
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                                <option value="editor">editor</option>
                                            </select>
                                            <button type="submit"
                                                    className="hidden"
                                                    id={`roleChange${user.id}`}>
                                            </button>
                                        </form>
                                    )}
                                    {user.role !== 'admin' && (
                                        <>
                                            {user.is_active === 1 ? (
                                                <button className="btn btn-danger"
                                                        onClick={() => updateUser(user.id, 'ban')}>
                                                    Ban
                                                </button>
                                            ) : (
                                                <button className="btn btn-success"
                                                        onClick={() => updateUser(user.id, 'unban')}>
                                                    Unban
                                                </button>
                                            )}
                                        </>
                                    )}
                                </td>
                            : ''}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

