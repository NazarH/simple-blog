import { useDispatch } from 'react-redux';

import { changeRole } from '@/actions/users';

export default function ChangeRole({authStates, user, setIsSuccess, setPageNumber})
{
    const dispatch = useDispatch();

    const handleUserRole = (id, newRole) => {
        const formData = new FormData();

        formData.append('role', newRole);
        formData.append('_token', window.csrfToken);

        dispatch(changeRole(id, newRole, formData));
        setIsSuccess(true);
        setPageNumber(1);
    };

    return (
        <>
            { authStates && authStates.id !== user.id && (
                <form action={`/admin/users/${user.id}/update`} method="POST">
                    <input
                        type="hidden"
                        name="_token"
                        defaultValue={window.csrfToken}
                    />
                    <select
                        name="role"
                        value={user.role}
                        onChange={(e) => handleUserRole(user.id, e.target.value)}
                        disabled={!user.is_active}
                    >
                        <option value="user"> user </option>
                        <option value="admin"> admin </option>
                        <option value="editor"> editor </option>
                    </select>
                    <button
                        type="submit"
                        className="hidden"
                        id={`roleChange${user.id}`}
                    >
                    </button>
                </form>
            )}
        </>
    )
}
