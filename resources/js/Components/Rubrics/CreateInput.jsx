import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRubric } from '@/actions/rubrics';

export default function CreateInput({setRubricStates, setIsSuccess})
{
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRubric(name));

        setName('');
        setIsSuccess(true);

        setPageNumber(1);
    };

    return (
        <form onSubmit={handleSubmit} className="simple-form">
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
            />
            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    );
}
