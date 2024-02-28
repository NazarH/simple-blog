import React, { useState } from 'react';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserStates from "@/Components/Users/UserStates";
import UpdateButtons from "@/Components/Users/UpdateButtons";
import ChangeRole from "@/Components/Users/ChangeRole";
import SuccessForm from "@/Components/SuccesForm";

import { fetchUsers } from '@/actions/users';

export default function IndexComponent()
{
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const { userStates, authStates } = UserStates(pageNumber);
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
                    {
                        userStates &&
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
                                    {
                                        authStates &&
                                            authStates.id !== user.id
                                                ? <td className={ user.role !== 'admin' ? 'user-btns' : '' }>
                                                        <ChangeRole
                                                            authStates={authStates}
                                                            user={user}
                                                            setIsSuccess={setIsSuccess}
                                                            setPageNumber={setPageNumber}
                                                        />
                                                        <UpdateButtons
                                                            user={user}
                                                            setIsSuccess={setIsSuccess}
                                                            setPageNumber={setPageNumber}
                                                        />
                                                    </td>
                                                : <td className="empty-td"></td>
                                    }
                                </tr>
                            ))
                    }
                </tbody>
            </table>

            <Pagination
                activePage={pageNumber}
                totalItemsCount={
                    userStates &&
                        userStates.length > 0
                            ? userStates[0].total
                            : 0
                }
                itemsCountPerPage={5}
                onChange={(pageNumber) => {
                    dispatch(fetchUsers(pageNumber));
                    setPageNumber(pageNumber++);
                }}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />

            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
}

