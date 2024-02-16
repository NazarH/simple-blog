import React from 'react';

import rubricState from "@/Components/Rubrics/RubricState";
import EditButtons from "@/Components/Rubrics/EditButtons";
import UpdateButtons from "@/Components/Rubrics/UpdateButtons";
import EditInput from "@/Components/Rubrics/EditInput";
import CreateInput from "@/Components/Rubrics/CreateInput";

export default function IndexComponent()
{
    const { rubricStates, setRubricStates } = rubricState();

    return (
        <div className="container">
            <CreateInput setRubricStates={setRubricStates}/>
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rubric Name</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {rubricStates &&
                        rubricStates.map((rubric, index) => (
                            <tr key={rubric.id} id={`rubN${index}`}>
                                <td>{rubric.id}</td>
                                <td>
                                    <EditInput
                                        id={rubric.id}
                                        rubricStates={rubricStates}
                                        index={index}
                                        setRubricStates={setRubricStates}
                                        rubric={rubric}
                                    />
                                </td>
                                <td>
                                    <UpdateButtons
                                        rubric={rubric}
                                        rubricStates={rubricStates}
                                        index={index}
                                        setRubricStates={setRubricStates}
                                    />
                                </td>
                                <EditButtons
                                    rubric={rubric}
                                    rubricStates={rubricStates}
                                    index={index}
                                    setRubricStates={setRubricStates}
                                />
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
