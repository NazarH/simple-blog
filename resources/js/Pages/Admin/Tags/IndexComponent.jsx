import React, { useState, useEffect } from 'react';
import Add from '@/Components/Add';
import axios from 'axios';

export default function IndexComponent() {
    let tags = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/tags/index');
                setTagStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [name, setName] = useState('');
    const [tagStates, setTagStates] = useState(tags.map(tag => ({ id: tag.id, name: tag.name })));

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

    /* Активація тегів */

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

    /* Додавання нового тегу */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/admin/tags/store', { name, _token: window.csrfToken });
            const updatedTags = await axios.get('/api/tags/index');
            setTagStates(updatedTags.data);
            setName('');
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    /* Видалення тегу */

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
        <div className="container">
            <form
                onSubmit={handleSubmit}
                className="simple-form"
            >
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Create
                </button>
            </form>
            <table
              id="example2"
              className="table table-bordered table-hover"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tag Name</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tagStates.map((tag, index) => (
                        <tr key={tag.id} id={`tagN${index}`}>
                            <td>{tag.id}</td>
                            <td>
                                <form action={`/admin/tags/edit/${tag.id}`} method="POST">
                                    <input
                                        type="hidden"
                                        name="_token"
                                        defaultValue={window.csrfToken}
                                    />
                                    <input
                                        id={`tagName${tag.id}`}
                                        className="disabled background"
                                        type="text"
                                        value={tagStates[index].name}
                                        placeholder={tagStates[index].name}
                                        name="name"
                                        disabled={!tagStates[index].isEditing}
                                        onChange={(e) => {
                                            const newName = e.target.value;
                                            setTagStates(prevStates => prevStates.map(tagState => {
                                            if (tagState.id === tag.id) {
                                                return { ...tagState, name: newName };
                                            }
                                                return tagState;
                                            }));
                                        }}
                                    />
                                    <button id={`saveTagChanges${tag.id}`} className="hidden"></button>
                                </form>
                            </td>
                            <td>
                                <form form id={`updateForm-${tag.id}`} onSubmit={(e) => e.preventDefault()}>
                                    <input type="hidden" name="_token" defaultValue={window.csrfToken} />
                                    <input className="hidden" name="is_active" type="text" defaultValue={tag.is_active === 1 ? 0 : 1} />
                                    <button
                                        type="submit"
                                        className={`btn ${tag.is_active === 1 ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => updateTag(tag.id, tag.is_active)}
                                        id={`tagAct-${tag.id}`}
                                    >
                                        {tag.is_active === 1 ? 'Deactivate' : 'Activate'}
                                    </button>
                                </form>
                            </td>
                            <td className="buttons">
                                <button
                                  id={`editTagBtn${tag.id}`}
                                  className="btn btn-primary"
                                  onClick={() => tagEdit(tag.id)}
                                >
                                    Edit
                                </button>
                                <button
                                  id={`saveTagBtn${tag.id}`}
                                  className={`btn btn-success hidden`}
                                  onClick={() => saveTagChanges(tag.id)}
                                >
                                    Save
                                </button>
                                <button className="btn btn-danger" onClick={() => deletePost(tag.id, index)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
