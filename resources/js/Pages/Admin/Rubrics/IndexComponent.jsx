import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function IndexComponent()
{
    let rubrics = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/rubrics/index');
                setRubricStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [name, setName] = useState('');

    const [rubricStates, setRubricStates] = useState(
        rubrics.map(rubric => ({
            id: rubric.id,
            name: rubric.name,
            isEditing: false,
        }))
    );

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

    /* Додавання нової рубрики */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/admin/rubrics/store', { name, _token: window.csrfToken });
            const updatedTags = await axios.get('/api/rubrics/index');
            setRubricStates(updatedTags.data);
            setName('');
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    /* Активація рубрик */

    const updateTag = async (rubId, active) => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append('is_active', rubricStates.find((rubric) => rubric.id === rubId).is_active === 1 ? 0 : 1);

        try {
            await axios.post(`/admin/rubrics/update/${rubId}`, formData);

            setRubricStates(prevStates =>
                prevStates.map(rubricStates => {
                    if (rubricStates.id === rubId) {
                        return { ...rubricStates, is_active: active === 1 ? 0 : 1 };
                    }
                    return rubricStates;
                })
            );
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    /* Видалення тегу */

    const deletePost = async (id, index) => {
        try {
            const response = await axios.delete('/admin/rubrics/delete/' + id);
            console.log("Видалення успішне");
        } catch (error) {
            console.error("Видалення не вдалося", error);
        }
        document.getElementById('rubN'+index).remove();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="simple-form">
                <input type="text"
                       name="name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rubric Name</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {rubricStates &&
                        rubricStates.map((rubric, index) => (
                            <tr key={rubric.id}>
                                <td>{rubric.id}</td>
                                <td>
                                    <form action={`/admin/rubrics/edit/${rubric.id}`} method="POST">
                                        <input type="hidden"
                                               name="_token"
                                               defaultValue={window.csrfToken}
                                        />
                                        <input id={`rubricName${rubric.id}`}
                                               className="disabled background"
                                               type="text"
                                               value={rubricStates[index].name}
                                               placeholder={rubricStates[index].name}
                                               name="name"
                                               disabled={!rubricStates[index].isEditing}
                                               onChange={(e) => {
                                                   const newName = e.target.value;
                                                   setRubricStates(prevStates => prevStates.map(rubricState => {
                                                       if (rubricState.id === rubric.id) {
                                                           return { ...rubricState, name: newName };
                                                       }
                                                       return rubricState;
                                                   }));
                                               }}
                                        />
                                        <button id={`saveTagChanges${rubric.id}`} className="hidden">
                                        </button>
                                    </form>
                                </td>
                                <td>
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
                                               defaultValue={rubric.is_active === 1 ? 0 : 1}
                                        />
                                        <button type="submit"
                                                className={`btn ${rubric.is_active ? 'btn-danger' : 'btn-success'}`}
                                                onClick={() => updateTag(rubric.id, rubric.is_active)}
                                                id={`rubricAct-${rubric.id}`}
                                        >
                                            {rubric.is_active ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </form>
                                </td>
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
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
