import React from 'react';

export default function FormInputs({formData, setFormData, errors}) {
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
            {errors.title && <div className="error">{errors.title}</div>}

            <textarea
                name="text"
                className="form-control"
                placeholder="Write comment here"
                resize="none"
                id="editor"
            />
            {errors.text && <div className="error">{errors.text}</div>}
        </div>
    );
}
