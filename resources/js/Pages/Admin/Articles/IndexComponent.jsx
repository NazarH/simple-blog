import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function IndexComponent()
{
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/articles/index');
                setArticleStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [articleStates, setArticleStates] = useState([]);

    /* Активація статей */

    const updateTag = async (artId, active) => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append('is_active', articleStates.find((article) => article.id === artId).is_active === 1 ? 0 : 1);

        try {
            await axios.post(`/admin/articles/update/${artId}`, formData);

            setArticleStates(prevStates =>
                prevStates.map(articleStates => {
                    if (articleStates.id === artId) {
                        return { ...articleStates, is_active: active === 1 ? 0 : 1 };
                    }
                        return articleStates;
                    })
                );
            } catch (error) {
                console.error('Error updating tag:', error);
            }
    };

    /* Видалення посту */

    const deleteArt = async (id) => {
            try {
                const response = await axios.delete('/admin/articles/delete/' + id);
                console.log("Видалення успішне");
            } catch (error) {
                console.error("Видалення не вдалося", error);
            }
    }

    return (
        <div className="container">
            <Link to="/admin/articles/create">
                <button className="btn btn-primary top-btn">
                    Create
                </button>
            </Link>
            <table
                id="example2"
                className="table table-bordered table-hover"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {articleStates && articleStates.map(article => (
                        <tr key={ article.id }>
                            <td>
                                { article.id }
                            </td>
                            <td>
                                { article.title }
                            </td>
                            <td>
                                <form
                                    form
                                    id={`updateForm-${ article.id }`}
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        defaultValue={ window.csrfToken }
                                    />
                                    <input
                                        className="hidden"
                                        name="is_active"
                                        type="text"
                                        defaultValue={ article.is_active === 1 ? 0 : 1 }
                                    />
                                    <button
                                        type="submit"
                                        className={`btn ${ article.is_active === 1 ? 'btn-danger' : 'btn-success' }`}
                                        onClick={() => updateTag( article.id, article.is_active )}
                                        id={`articleAct-${ article.id }`}
                                    >
                                        { article.is_active === 1 ? 'Deactivate' : 'Activate' }
                                    </button>
                                </form>
                            </td>
                            <td className="buttons">
                                <Link
                                    to={`/admin/articles/edit/${ article.id }`}
                                    state={{
                                        id: article.id
                                    }}
                                >
                                    <button className="btn btn-primary">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteArt(article.id)}
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
