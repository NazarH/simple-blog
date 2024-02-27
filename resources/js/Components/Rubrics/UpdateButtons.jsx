import React from 'react';
import { useDispatch } from 'react-redux';

import { updateRubric } from '@/actions/rubrics';

export default function UpdateButtons({rubric, setIsSuccess})
{
    const dispatch = useDispatch();

    const handleUpdateTag = (rubricId, active) => {
        const formData = new FormData();

        formData.append('_token', window.csrfToken);
        formData.append('is_active', active ? 0 : 1);

        dispatch(updateRubric(rubricId, active, formData));
        setIsSuccess(true);
    };

    return (
        <form id={`updateForm-${rubric.id}`} onSubmit={(e) => e.preventDefault()}>
            <input
                type="hidden"
                name="_token"
                defaultValue={window.csrfToken}
            />
            <input
                className="hidden"
                name="is_active"
                type="text"
                defaultValue={rubric.is_active ? 0 : 1}
            />
            <button
                type="submit"
                className={`btn ${rubric.is_active ? 'btn-danger' : 'btn-success'}`}
                onClick={() => handleUpdateTag(rubric.id, rubric.is_active)}
                id={`rubricAct-${rubric.id}`}
            >
                {rubric.is_active ? 'Deactivate' : 'Activate'}
            </button>
        </form>
    );
}
