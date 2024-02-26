import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateArt } from "@/actions/articles";
import { deleteArt } from "@/actions/articles"

export default function ArticleRow ({ article, articleStates, setIsSuccess, setPageNumber })
{
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(false);

    const handleDeleteArticle = (id) => {
        dispatch(deleteArt(id));
        setIsDelete(true);
        setIsSuccess(true);
        setPageNumber(1);
    };

    const handleUpdateArticle = (artId) => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append(
            'is_active',
            articleStates.find((article) => article.id === artId).is_active ? 0 : 1
        );

        dispatch(updateArt(artId, formData));
        setIsSuccess(true);
    };

    return (
        <tr
            key={article.id}
            id={`artN${article.id}`}
            style={{ display: isDelete ? 'none' : 'table-row' }}
        >
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>
                <form id={`updateForm-${article.id}`} onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="hidden"
                        name="_token"
                        defaultValue={window.csrfToken}
                    />
                    <input
                        className="hidden"
                        name="is_active"
                        type="text"
                        defaultValue={article.is_active ? 0 : 1}
                    />
                    <button
                        type="submit"
                        className={`btn ${article.is_active ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => handleUpdateArticle(article.id)}
                        id={`articleAct-${article.id}`}
                    >
                        {article.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                </form>
            </td>
            <td className="buttons">
                <Link
                    to={`/admin/articles/edit/${article.id}`}
                    state={{ id: article.id }}
                >
                    <button className="btn btn-primary">
                        Edit
                    </button>
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteArticle(article.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};
