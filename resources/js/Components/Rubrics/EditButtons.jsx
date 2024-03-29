import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateRubricData, toggleRubricEdit } from '@/actions/rubrics';

export default function EditButtons({ rubric, rubricStates, deletePost, setIsSuccess, setErrors, setDisInput}) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const saveRubricChanges = (id) => {
        const updatedRubricData = {
            name: rubricStates.find(rubricState => rubricState.id === id).name,
        };

        dispatch(updateRubricData(id, updatedRubricData))
            .then(() => {
                setIsEditing(false);
                setIsSuccess(true);
                setDisInput(false);
                setErrors({});
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors);
                } else {
                    console.log(error);
                }
            });
    };

    const rubEdit = (id) => {
        setIsEditing(true);
        setDisInput(true);
        dispatch(toggleRubricEdit(id));
    };

    return (
        <td className="user-btns">
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

