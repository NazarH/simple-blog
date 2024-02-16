import React, { useState, useEffect } from 'react';

export default function CreateInput({setTagStates})
{
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/admin/tags/store', { name, _token: window.csrfToken });
            const updatedTags = await axios.get('/api/tags/index');

            setTagStates(updatedTags.data);
            setName('');

        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="simple-form">
            <input type="text"
                   name="name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="form-control"
            />
            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    )
}
