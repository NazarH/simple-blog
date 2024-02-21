import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteRubric } from '@/actions/rubrics';
import { updateRubricData } from '@/actions/rubrics';
import { toggleRubricEdit } from '@/actions/rubrics';

export default function EditButtons({rubric, rubricStates, index, setRubricStates})
{
    const dispatch = useDispatch();

    const saveRubricChanges = (id) => {
        document.getElementById('editBtn'+id).style='display: block';
        document.getElementById('saveBtn'+id).style='display: none';
        document.getElementById('rubricName'+id).style='color: white;';

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
        document.getElementById('editBtn'+id).style='display: none';
        document.getElementById('saveBtn'+id).style='display: block';
        dispatch(toggleRubricEdit(id));
    };

    const deletePost = (id, index) => {
        dispatch(deleteRubric(id));
        document.getElementById('rubN' + index).remove();
    };

    return (
        <td className="buttons">
            <button
                id={`editBtn${rubric.id}`}
                className="btn btn-primary"
                onClick={() => rubEdit(rubric.id)}
            >
                Edit
            </button>
            <button
                id={`saveBtn${rubric.id}`}
                className={`btn btn-success hidden`}
                onClick={() => saveRubricChanges(rubric.id)}
            >
                Save
            </button>
            <button className="btn btn-danger" onClick={() => deletePost(rubric.id, index)}>
                Delete
            </button>
        </td>
    );
}
