import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRubric } from '@/actions/rubrics';

export default function CreateInput({setIsSuccess, setPageNumber})
{
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRubric(name))
            .then(() => {
                setName('');
                setIsSuccess(true);
                setPageNumber(1);
                setErrors({});
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors);
                } else {
                    console.log(error);
                }
            });
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
            {errors.name && <div className="error">{errors.name}</div>}
        </>
    );
}
