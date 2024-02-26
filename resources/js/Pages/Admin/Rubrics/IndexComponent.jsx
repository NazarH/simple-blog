import React, { useState } from 'react';

import rubricState from "@/Components/Rubrics/RubricState";
import CreateInput from "@/Components/Rubrics/CreateInput";
import RubricRow from "@/Components/Rubrics/RubricRow";
import SuccessForm from "@/Components/SuccesForm";

export default function IndexComponent()
{
    const { rubricStates, setRubricStates } = rubricState();
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="container">
            <CreateInput
                setRubricStates={setRubricStates}
                setIsSuccess={setIsSuccess}
            />
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
                                    setIsSuccess={setIsSuccess}
                                />
                            )
                        )
                    }
                </tbody>
            </table>
            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
}
