import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/actions/users';

export default function UpdateButtons({ user, setUserStates, userStates })
{
    const dispatch = useDispatch();

    const updateUserHandler = (id, action, active) => {
        dispatch(updateUser(id, action, active));
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
