import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRubricName } from '@/actions/rubrics';

export default function EditInput({id, rubricStates, index})
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
                disabled={!rubricStates[index].isEditing}
                onChange={(e) => {
                    const newName = e.target.value;
                    dispatch(updateRubricName(id, newName));
                }}
            />
            <button id={`saveTagChanges${id}`} className="hidden">
            </button>
        </form>
    );
}
