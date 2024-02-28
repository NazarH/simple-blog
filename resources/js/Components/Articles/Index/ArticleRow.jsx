import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateArt } from "@/actions/articles";
import { deleteArt } from "@/actions/articles"

import UpdateButtons from "@/Components/Articles/Index/UpdateButtons";

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

    return (
        <tr
            key={article.id}
            id={`artN${article.id}`}
            style={{ display: isDelete ? 'none' : 'table-row' }}
        >
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>
                <UpdateButtons
                    article={article}
                    articleStates={articleStates}
                    setIsSuccess={setIsSuccess}
                />
            </td>
            <td className="buttons">
                <Link
                    to={`/admin/articles/edit/${article.id}`}
                    state={{ id: article.id }}
                >
                    <button className="btn btn-primary"> Edit </button>
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteArticle(article.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};
