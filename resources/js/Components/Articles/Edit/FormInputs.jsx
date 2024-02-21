import React from 'react';

export default function FormInputs({formData, setFormData}) {
    const id = location.state
        ? location.state.id
        : window.location.href.match(/\/(\d+)$/)[1];

    return (
        <div>
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    title: e.target.value
                }))}
            />
            <textarea
                name="text"
                className="form-control"
                placeholder="Write comment here"
                resize="none"
                id="editor"
            />
        </div>
    );
}
