import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '@/actions/users';
import { fetchAuth } from '@/actions/users';

export default function UserState() {
    const dispatch = useDispatch();
    const userStates = useSelector(state => state.usersReducer.users);
    const authStates = useSelector(state => state.usersReducer.auth);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchAuth());
    }, [dispatch]);

    return { userStates, authStates };
}
