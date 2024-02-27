import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import EditInput from "@/Components/Rubrics/EditInput.jsx";
import UpdateButtons from "@/Components/Rubrics/UpdateButtons.jsx";
import EditButtons from "@/Components/Rubrics/EditButtons.jsx";

import { deleteRubric } from '@/actions/rubrics';

export default function RubricRow({rubric, index, rubricStates, setRubricStates, setIsSuccess, setPageNumber})
{
    const dispatch = useDispatch();

    const [isDelete, setIsDelete] = useState(false);
    const [errors, setErrors] = useState({});

    const deletePost = (id) => {
        dispatch(deleteRubric(id));
        setIsDelete(true);
        setIsSuccess(true);
        setPageNumber(1);
    };

    return (
        <tr
            id={`rubN${rubric.id}`}
            style={{display: isDelete ? 'none' : 'table-row'}}
        >
            <td>{rubric.id}</td>
            <td>
                <EditInput
                    id={rubric.id}
                    rubricStates={rubricStates}
                    index={index}
                    setRubricStates={setRubricStates}
                    rubric={rubric}
                    errors={errors}
                />
            </td>
            <td>
                <UpdateButtons
                    rubric={rubric}
                    rubricStates={rubricStates}
                    index={index}
                    setRubricStates={setRubricStates}
                    setIsSuccess={setIsSuccess}
                />
            </td>
            <EditButtons
                rubric={rubric}
                rubricStates={rubricStates}
                index={index}
                setRubricStates={setRubricStates}
                deletePost={deletePost}
                setIsSuccess={setIsSuccess}
                setErrors={setErrors}
            />
        </tr>
    );
}
