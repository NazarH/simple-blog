import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTag } from '@/actions/tags';

export default function CreateInput({setTagStates, setIsSuccess})
{
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTag(name));

        setName('');

        setIsSuccess(true);
    };

    return (
        <>
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
        </>
    );
}
