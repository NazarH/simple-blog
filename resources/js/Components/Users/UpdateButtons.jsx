import React from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from '@/actions/users';

export default function UpdateButtons({ user, setIsSuccess, setPageNumber })
{
    const dispatch = useDispatch();

    const updateUserHandler = (id, action, active) => {
        const formData = new FormData();

        formData.append('_token', window.csrfToken);
        formData.append('is_active', active ? 0 : 1);

        dispatch(updateUser(id, action, active, formData));
        setIsSuccess(true);
        setPageNumber(1);
    };

    return (
        <>
            {user.role !== 'admin' && (
                <>
                    {user.is_active ? (
                        <button
                            className="btn btn-danger"
                            onClick={() => updateUserHandler(user.id, 'ban', 0)}
                        >
                            Ban
                        </button>
                    ) : (
                        <button
                            className="btn btn-success"
                            onClick={() => updateUserHandler(user.id, 'unban', 1)}
                        >
                            Unban
                        </button>
                    )}
                </>
            )}
        </>
    );
};
