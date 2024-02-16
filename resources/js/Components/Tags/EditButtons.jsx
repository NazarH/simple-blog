export default function EditButtons({tag, tagStates, index, setTagStates})
{
    const saveTagChanges = async (id) => {
        document.getElementById('editTagBtn'+id).style='display: block';
        document.getElementById('saveTagBtn'+id).style='display: none';
        document.getElementById('tagName'+id).style='color: white;';

        const formData = new FormData();

        formData.append('name', tagStates.find((tag) => tag.id === id).name);
        formData.append('_token', window.csrfToken);

        try {
            await axios.post(`/admin/tags/edit/${id}`, formData);

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

    function tagEdit(id) {
        document.getElementById('editTagBtn'+id).style='display: none';
        document.getElementById('saveTagBtn'+id).style='display: block';
        document.getElementById('tagName'+id).style='color: black;';

        setTagStates(prevStates =>
            prevStates.map(tagState => {
                if (tagState.id === id) {
                    return { ...tagState, isEditing: true };
                }
                return tagState;
            })
        );
    }

    const deletePost = async (id, index) => {
        axios
            .delete('/admin/tags/delete/'+id)
            .then(response => {
                console.log("Delete successful")
            });
        //const updatedTags = await axios.get('/api/tags/index');
        //setTagStates(updatedTags.data);
        document.getElementById('tagN'+index).remove();
    }

    return (
        <td className="buttons">
            <button id={`editTagBtn${tag.id}`}
                    className="btn btn-primary"
                    onClick={() => tagEdit(tag.id)}
            >
                Edit
            </button>
            <button id={`saveTagBtn${tag.id}`}
                    className={`btn btn-success hidden`}
                    onClick={() => saveTagChanges(tag.id)}
            >
                Save
            </button>
            <button className="btn btn-danger"
                    onClick={() => deletePost(tag.id, index)}
            >
                Delete
            </button>
        </td>
    );
}
