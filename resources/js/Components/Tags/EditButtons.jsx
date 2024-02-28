import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateTagData, toggleTagEdit } from '@/actions/tags';

export default function EditButtons({ tag, tagStates, index, deletePost, setIsSuccess, setErrors, setDisInput}) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const saveTagChanges = (id) => {
        const updatedTagData = {
            name: tagStates.find(tagState => tagState.id === id).name,
        };

        dispatch(updateTagData(id, updatedTagData))
            .then(() => {
                setIsEditing(false);
                setIsSuccess(true);
                setErrors({});
                setDisInput(false)
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors);
                } else {
                    console.log(error);
                }
            });
    };

    const tagEdit = (id) => {
        setIsEditing(true);
        setDisInput(true);
        dispatch(toggleTagEdit(id));
    };

    return (
        <td className="user-btns">
            <button
                className="btn btn-primary"
                onClick={() => tagEdit(tag.id)}
                style={{ display: isEditing ? 'none' : 'block' }}
            >
                Edit
            </button>
            <button
                className="btn btn-success"
                onClick={() => saveTagChanges(tag.id)}
                style={{ display: isEditing ? 'block' : 'none' }}
            >
                Save
            </button>
            <button className="btn btn-danger" onClick={() => deletePost(tag.id)}>
                Delete
            </button>
        </td>
    );
}


