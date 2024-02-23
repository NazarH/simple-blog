import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import EditInput from "@/Components/Tags/EditInput.jsx";
import UpdateButtons from "@/Components/Tags/UpdateButtons.jsx";
import EditButtons from "@/Components/Tags/EditButtons.jsx";

import {deleteTag} from "@/actions/tags.js";

export default function TagRow({tag, index, tagStates, setTagStates})
{
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(false);

    const deletePost = (id) => {
        dispatch(deleteTag(id));
        setIsDelete(true);
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
                />
            </td>
            <td>
                <UpdateButtons
                    tag={tag}
                    tagStates={tagStates}
                    index={index}
                    setTagStates={setTagStates}
                />
            </td>

            <EditButtons
                tag={tag}
                tagStates={tagStates}
                index={index}
                setTagStates={setTagStates}
                deletePost={deletePost}
            />
        </tr>
    );
}
