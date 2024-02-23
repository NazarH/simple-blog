import React from 'react';

import tagState from "@/Components/Tags/TagState";
import CreateInput from "@/Components/Tags/CreateInput";
import TagRow from "@/Components/Tags/TagRow";

export default function IndexComponent()
{
    const { tagStates, setTagStates } = tagState();

    return (
        <div className="container">
            <CreateInput setTagStates={setTagStates} />
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
                                />
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
