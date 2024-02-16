export default function ChangeRole({authStates, user, setUserStates})
{
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
                        onChange={(e) => changeRole(user.id, e.target.value)}
                        disabled={!user.is_active}
                    >
                        <option value="user">
                            user
                        </option>
                        <option value="admin">
                            admin
                        </option>
                        <option value="editor">
                            editor
                        </option>
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
