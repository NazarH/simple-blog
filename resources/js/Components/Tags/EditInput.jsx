import React from 'react';
import { useDispatch } from 'react-redux';

import { updateTagName } from '@/actions/tags';

export default function EditInput({ id, tagStates, index, errors }) {
    const dispatch = useDispatch();

    return (
        <form action={`/admin/tags/edit/${id}`} method="POST">
            <input
                type="hidden"
                name="_token"
                defaultValue={window.csrfToken}
            />
            <input
                id={`tagName${id}`}
                className="disabled background"
                type="text"
                value={tagStates[index].name}
                placeholder={tagStates[index].name}
                name="name"
                disabled={!tagStates[index].isEditing}
                onChange={(e) => {
                    const newName = e.target.value;
                    dispatch(updateTagName(id, newName));
                }}
            />
            {errors.name && <div className="error">{errors.name}</div>}

            <button id={`saveTagChanges${id}`} className="hidden"></button>
        </form>
    );
}

