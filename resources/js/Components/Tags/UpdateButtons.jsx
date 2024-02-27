import React from 'react';
import { useDispatch } from 'react-redux';

import { updateTag } from '@/actions/tags.js';

export default function UpdateButtons({tag, setIsSuccess})
{
    const dispatch = useDispatch();

    const handleUpdateTag = (tagId, active) => {
        const formData = new FormData();

        formData.append('_token', window.csrfToken);
        formData.append('is_active', active ? 0 : 1);

        dispatch(updateTag(tagId, active, formData));
        setIsSuccess(true);
    };

    return (
        <>
            <form id={`updateForm-${tag.id}`} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="hidden"
                    name="_token"
                    defaultValue={window.csrfToken}
                />
                <input
                    className="hidden"
                    name="is_active"
                    type="text"
                    defaultValue={tag.is_active ? 0 : 1}
                />
                <button
                    type="submit"
                    className={`btn ${tag.is_active ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleUpdateTag(tag.id, tag.is_active)}
                    id={`tagAct-${tag.id}`}
                >
                    {tag.is_active ? 'Deactivate' : 'Activate'}
                </button>
            </form>
        </>
    );
}
