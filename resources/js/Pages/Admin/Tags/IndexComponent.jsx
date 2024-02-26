import React, { useState, useEffect } from 'react';

import tagState from "@/Components/Tags/TagState";
import CreateInput from "@/Components/Tags/CreateInput";
import TagRow from "@/Components/Tags/TagRow";

import SuccessForm from "@/Components/SuccesForm";

export default function IndexComponent()
{
    const { tagStates, setTagStates } = tagState();
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="container">
            <CreateInput
                setTagStates={setTagStates}
                setIsSuccess={setIsSuccess}
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
