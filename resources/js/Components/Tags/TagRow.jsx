import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import EditInput from "@/Components/Tags/EditInput.jsx";
import UpdateButtons from "@/Components/Tags/UpdateButtons.jsx";
import EditButtons from "@/Components/Tags/EditButtons.jsx";

import {deleteTag} from "@/actions/tags.js";

export default function TagRow({tag, index, tagStates, setTagStates, setIsSuccess, setPageNumber})
{
    const dispatch = useDispatch();

    const [isDelete, setIsDelete] = useState(false);
    const [errors, setErrors] = useState({});
    const [disInput, setDisInput] = useState(false);

    const deletePost = (id) => {
        dispatch(deleteTag(id))
        setIsDelete(true);
        setIsSuccess(true);
        setPageNumber(1);
    };

    return (
        <tr
            id={`tagN${tag.id}`}
            style={{display: isDelete ? 'none' : 'table-row'}}
        >
            <td>{tag.id}</td>
            <td>
                <EditInput
                    id={tag.id}
                    tagStates={tagStates}
                    index={index}
                    setTagStates={setTagStates}
                    errors={errors}
                    disInput={disInput}
                />
            </td>
            <td>
                <UpdateButtons
                    tag={tag}
                    tagStates={tagStates}
                    index={index}
                    setTagStates={setTagStates}
                    setIsSuccess={setIsSuccess}
                />
            </td>

            <EditButtons
                tag={tag}
                tagStates={tagStates}
                index={index}
                setTagStates={setTagStates}
                deletePost={deletePost}
                setIsSuccess={setIsSuccess}
                setErrors={setErrors}
                setDisInput={setDisInput}
            />
        </tr>
    );
}
