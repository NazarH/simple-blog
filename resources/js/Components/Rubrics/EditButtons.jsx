import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateRubricData, toggleRubricEdit } from '@/actions/rubrics';

export default function EditButtons({ rubric, rubricStates, deletePost}) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const saveRubricChanges = (id) => {
        setIsEditing(false);

        const updatedRubricData = {
            name: rubricStates.find(rubricState => rubricState.id === id).name,
            _token: window.csrfToken
        };

        try {
            dispatch(updateRubricData(id, updatedRubricData));
        } catch (error) {
            console.error('Error saving rubric changes:', error);
        }
    };

    const rubEdit = (id) => {
        setIsEditing(true);
        dispatch(toggleRubricEdit(id));
    };

    return (
        <td
            className="buttons"
        >
            <button
                className="btn btn-primary"
                onClick={() => rubEdit(rubric.id)}
                style={{ display: isEditing ? 'none' : 'block' }}
            >
                Edit
            </button>
            <button
                className="btn btn-success"
                onClick={() => saveRubricChanges(rubric.id)}
                style={{ display: isEditing ? 'block' : 'none' }}
            >
                Save
            </button>
            <button className="btn btn-danger" onClick={() => deletePost(rubric.id)}>
                Delete
            </button>
        </td>
    );
}

