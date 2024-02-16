export default function UpdateButtons({user, userStates, setUserStates})
{
    const updateUser = async (id, action) => {
        const formData = new FormData();

        formData.append('is_active',
            !userStates.find((user) => user.id === id).is_active
        );
        formData.append('_token', window.csrfToken);

        try {
            await axios.post(`/admin/users/${id}/${action}`, formData);

            setUserStates((prevStates) =>
                prevStates.map((userState) => {
                    if (userState.id === id) {
                        return { ...userState, is_active: userState.is_active ? 0 : 1, isEditing: false };
                    }
                    return userState;
                })
            );
        } catch (error) {
            console.error('Error saving tag changes:', error);
        }
    };

    return (
        <>
            {user.role !== 'admin' && (
                <>
                    {user.is_active ? (
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
        </>
    )
}
