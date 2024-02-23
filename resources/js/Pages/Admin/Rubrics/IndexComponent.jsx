import React from 'react';

import rubricState from "@/Components/Rubrics/RubricState";
import CreateInput from "@/Components/Rubrics/CreateInput";
import RubricRow from "@/Components/Rubrics/RubricRow.jsx";

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rubricStates &&
                        rubricStates.map((rubric, index) => (
                                <RubricRow
                                    key={rubric.id}
                                    rubric={rubric}
                                    index={index}
                                    rubricStates={rubricStates}
                                    setRubricStates={setRubricStates}
                                />
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
