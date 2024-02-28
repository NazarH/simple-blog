import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateRubricName } from '@/actions/rubrics';

export default function EditInput({id, rubricStates, index, errors, disInput})
{
    const dispatch = useDispatch();

    return (
        <form action={`/admin/rubrics/edit/${id}`} method="POST">
            <input
                type="hidden"
                name="_token"
                defaultValue={window.csrfToken}
            />
            <input
                id={`rubricName${id}`}
                className="disabled background"
                type="text"
                value={rubricStates[index].name}
                placeholder={rubricStates[index].name}
                name="name"
                disabled={!disInput}
                onChange={(e) => {
                    const newName = e.target.value;
                    dispatch(updateRubricName(id, newName));
                }}
            />
            {errors.name && <div className="error">{errors.name}</div>}

            <button id={`saveTagChanges${id}`} className="hidden"></button>
        </form>
    );
}
