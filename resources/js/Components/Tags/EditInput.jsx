import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTagName } from '@/actions/tags';

export default function EditInput({ id, tagStates, index }) {
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
                    // Відправляємо дію для оновлення імені тега
                    dispatch(updateTagName(id, newName));
                }}
            />
            <button id={`saveTagChanges${id}`} className="hidden"></button>
        </form>
    );
}

