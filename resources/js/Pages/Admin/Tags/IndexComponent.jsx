import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from "react-js-pagination";

import tagState from "@/Components/Tags/TagState";
import CreateInput from "@/Components/Tags/CreateInput";
import TagRow from "@/Components/Tags/TagRow";
import SuccessForm from "@/Components/SuccesForm";

import { fetchTags } from '@/actions/tags';

export default function IndexComponent()
{
    const dispatch = useDispatch();

    const [isSuccess, setIsSuccess] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const { tagStates, setTagStates } = tagState(pageNumber);

    return (
        <div className="container">
            <CreateInput
                setTagStates={setTagStates}
                setIsSuccess={setIsSuccess}
                setPageNumber={setPageNumber}
            />
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tag Name</th>
                    <th>Active</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {tagStates &&
                        tagStates.map((tag, index) => (
                            <TagRow
                                key={tag.id}
                                tag={tag}
                                index={index}
                                tagStates={tagStates}
                                setTagStates={setTagStates}
                                setIsSuccess={setIsSuccess}
                                setPageNumber={setPageNumber}
                            />
                        )
                    )}
                </tbody>
            </table>

            <Pagination
                activePage={pageNumber}
                totalItemsCount={
                    tagStates &&
                        tagStates.length > 0
                            ? tagStates[0].total
                            : 0
                }
                itemsCountPerPage={5}
                onChange={(pageNumber) => {
                    dispatch(fetchTags(pageNumber));
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
