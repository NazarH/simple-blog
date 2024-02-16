import React from 'react';

import tagState from "@/Components/Tags/TagState";
import EditButtons from "@/Components/Tags/EditButtons";
import UpdateButtons from "@/Components/Tags/UpdateButtons";
import EditInput from "@/Components/Tags/EditInput";
import CreateInput from "@/Components/Tags/CreateInput";

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
                            <tr key={tag.id} id={`tagN${index}`}>
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
                                />
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
