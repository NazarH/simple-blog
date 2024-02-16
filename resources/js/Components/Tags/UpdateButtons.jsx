export default function UpdateButtons({tag, tagStates, index, setTagStates})
{
    const updateTag = async (tagId, active) => {
        const formData = new FormData();

        formData.append('_token', window.csrfToken);
        formData.append('is_active', tagStates.find((tag) => tag.id === tagId).is_active === 1 ? 0 : 1);

        try {
            await axios.post(`/admin/tags/update/${tagId}`, formData);
            console.log(await axios.get('/api/tags/index'))

            setTagStates(prevStates =>
                prevStates.map((tagState) => {
                    if (tagState.id === tagId) {
                        return { ...tagState, is_active: active === 1 ? 0 : 1 };
                    }
                    return tagState;
                })
            );
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    return (
        <form form id={`updateForm-${tag.id}`} onSubmit={(e) => e.preventDefault()}>
            <input type="hidden"
                   name="_token"
                   defaultValue={window.csrfToken}
            />
            <input className="hidden"
                   name="is_active"
                   type="text"
                   defaultValue={tag.is_active ? 0 : 1}
            />
            <button type="submit"
                    className={`btn ${tag.is_active ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => updateTag(tag.id, tag.is_active)}
                    id={`tagAct-${tag.id}`}
            >
                {tag.is_active ? 'Deactivate' : 'Activate'}
            </button>
        </form>
    );
}
