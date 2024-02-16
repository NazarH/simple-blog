export default function EditButtons({rubric, rubricStates, index, setRubricStates})
{
    const saveChanges = async (id) => {
        document.getElementById('editBtn'+id).style='display: block';
        document.getElementById('saveBtn'+id).style='display: none';
        document.getElementById('rubricName'+id).style='color: white;';

        const formData = new FormData();
        formData.append('name', rubricStates.find((rubric) => rubric.id === id).name);
        formData.append('_token', window.csrfToken);

        try {
            await axios.post(`/admin/rubrics/edit/${id}`, formData);

            setTagStates((prevStates) =>
                prevStates.map((tagState) => {
                    if (tagState.id === id) {
                        return { ...tagState, isEditing: false };
                    }
                    return tagState;
                })
            );
        } catch (error) {
            console.error('Error saving tag changes:', error);
        }
    };

    function rubEdit(id)
    {
        document.getElementById('editBtn'+id).style='display: none';
        document.getElementById('saveBtn'+id).style='display: block';
        setRubricStates(prevStates =>
            prevStates.map(rubricState => {
                if (rubricState.id === id) {
                    return { ...rubricState, isEditing: true };
                }
                return rubricState;
            })
        );
    }

    const deletePost = async (id, index) => {
        axios
            .delete('/admin/rubrics/delete/' + id)
            .then(response => {
                console.log("Delete successful")
            });
        document.getElementById('rubN'+index).remove();
    }

    return (
        <td className="buttons">
            <button id={`editBtn${rubric.id}`}
                    className="btn btn-primary"
                    onClick={() => rubEdit(rubric.id)}
            >
                Edit
            </button>
            <button id={`saveBtn${rubric.id}`}
                    className={`btn btn-success hidden`}
                    onClick={() => saveChanges(rubric.id)}
            >
                Save
            </button>
            <button className="btn btn-danger"
                    onClick={() => deletePost(rubric.id, index)}
            >
                Delete
            </button>
        </td>
    );
}
