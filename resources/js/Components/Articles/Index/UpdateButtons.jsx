import React from 'react';
import { useDispatch } from 'react-redux';

import {updateArt} from "@/actions/articles.js";

export default function UpdateButtons({article, articleStates, setIsSuccess})
{
    const dispatch = useDispatch();

    const handleUpdateArticle = (artId, active) => {
        const formData = new FormData();

        formData.append('_token', window.csrfToken);
        formData.append(
            'is_active',
            articleStates.find((article) => article.id === artId).is_active ? 0 : 1
        );

        dispatch(updateArt(artId, active, formData));
        setIsSuccess(true);
    };

    return (
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
                onClick={() => handleUpdateArticle(article.id, article.is_active)}
                id={`articleAct-${article.id}`}
            >
                {article.is_active ? 'Deactivate' : 'Activate'}
            </button>
        </form>
    );
}
