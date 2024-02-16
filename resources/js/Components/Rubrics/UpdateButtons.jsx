export default function UpdateButtons({rubric, rubricStates, index, setRubricStates})
{
    const updateTag = async (rubId, active) => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append('is_active', rubricStates.find((rubric) => rubric.id === rubId).is_active ? 0 : 1);

        try {
            await axios.post(`/admin/rubrics/update/${rubId}`, formData);

            setRubricStates(prevStates =>
                prevStates.map(rubricStates => {
                    if (rubricStates.id === rubId) {
                        return { ...rubricStates, is_active: active ? 0 : 1 };
                    }
                    return rubricStates;
                })
            );
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    return (
        <form id={`updateForm-${rubric.id}`}
              onSubmit={(e) => e.preventDefault()}
        >
            <input type="hidden"
                   name="_token"
                   defaultValue={window.csrfToken}
            />
            <input className="hidden"
                   name="is_active"
                   type="text"
                   defaultValue={rubric.is_active ? 0 : 1}
            />
            <button type="submit"
                    className={`btn ${rubric.is_active ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => updateTag(rubric.id, rubric.is_active)}
                    id={`rubricAct-${rubric.id}`}
            >
                {rubric.is_active ? 'Deactivate' : 'Activate'}
            </button>
        </form>
    );
}
