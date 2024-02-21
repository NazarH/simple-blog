import React from 'react';
import { useDispatch } from 'react-redux';

import { updateTagData } from '@/actions/tags';
import { toggleTagEdit } from '@/actions/tags';
import { deleteTag } from '@/actions/tags';

export default function EditButtons({tag, tagStates, index, setTagStates})
{
    const dispatch = useDispatch();

    const saveTagChanges = (id) => {
        document.getElementById('editTagBtn'+id).style='display: block';
        document.getElementById('saveTagBtn'+id).style='display: none';
        document.getElementById('tagName'+id).style='color: white;';

        const updatedTagData = {
            name: tagStates.find(tagState => tagState.id === id).name,
            _token: window.csrfToken
        };

        try {
            dispatch(updateTagData(id, updatedTagData));
        } catch (error) {
            console.error('Error saving tag changes:', error);
        }
    };

    const tagEdit = (id) => {
        document.getElementById('editTagBtn'+id).style='display: none';
        document.getElementById('saveTagBtn'+id).style='display: block';
        document.getElementById('tagName'+id).style='color: black;';

        dispatch(toggleTagEdit(id));
    };

    const deletePost = (id, index) => {
        dispatch(deleteTag(id));

        document.getElementById('tagN' + index).remove();
    };

    return (
        <td className="buttons">
            <button
                id={`editTagBtn${tag.id}`}
                className="btn btn-primary"
                onClick={() => tagEdit(tag.id)}
            >
                Edit
            </button>
            <button
                id={`saveTagBtn${tag.id}`}
                className={`btn btn-success hidden`}
                onClick={() => saveTagChanges(tag.id)}
            >
                Save
            </button>
            <button className="btn btn-danger" onClick={() => deletePost(tag.id, index)}>
                Delete
            </button>
        </td>
    );
}


