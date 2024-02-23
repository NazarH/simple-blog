import React from 'react';

export default function FormInputs({formData, setFormData}) {
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
