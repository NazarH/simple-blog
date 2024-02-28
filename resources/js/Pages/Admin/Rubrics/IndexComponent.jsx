import Pagination from "react-js-pagination";
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import rubricState from "@/Components/Rubrics/RubricState";
import CreateInput from "@/Components/Rubrics/CreateInput";
import RubricRow from "@/Components/Rubrics/RubricRow";
import SuccessForm from "@/Components/SuccesForm";

import { fetchRubrics } from '@/actions/rubrics';

export default function IndexComponent()
{
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const { rubricStates, setRubricStates } = rubricState(pageNumber);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="container">
            <CreateInput
                setIsSuccess={setIsSuccess}
                setPageNumber={setPageNumber}
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
                    {
                        rubricStates &&
                            rubricStates.map((rubric, index) => (
                                    <RubricRow
                                        key={rubric.id}
                                        rubric={rubric}
                                        index={index}
                                        rubricStates={rubricStates}
                                        setRubricStates={setRubricStates}
                                        setIsSuccess={setIsSuccess}
                                        setPageNumber={setPageNumber}
                                    />
                                )
                            )
                    }
                </tbody>
            </table>

            <Pagination
                activePage={pageNumber}
                totalItemsCount={
                    rubricStates &&
                        rubricStates.length > 0
                            ? rubricStates[0].total
                            : 0
                }
                itemsCountPerPage={5}
                onChange={(pageNumber) => {
                    dispatch(fetchRubrics(pageNumber));
                    setPageNumber(pageNumber++);
                }}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />

            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
}
