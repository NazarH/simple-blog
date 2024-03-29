import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createUser } from '@/actions/users';

import SuccessForm from "@/Components/SuccesForm.jsx";

export default function CreateComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        login: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(formData))
            .then(() => {
                setIsSuccess(true);
                setIsSubmitted(true);
                setErrors({});

                setTimeout(() => {
                    navigate('/admin/users');
                }, 2000);
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
            <form onSubmit={handleSubmit} className="user-form">
                <div>
                    <input
                        type="hidden"
                        name="_token"
                        value={window.csrfToken}
                    />
                    <input
                        type="text"
                        name="login"
                        placeholder="login"
                        value={formData.login}
                        onChange={handleChange}
                        className="form-control"
                        disabled={isSubmitted}
                    />
                    { errors.login && <div className="error">{errors.login}</div> }

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        disabled={isSubmitted}
                    />
                    { errors.password && <div className="error">{errors.password}</div> }

                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        disabled={isSubmitted}
                    />
                    { errors.email && <div className="error">{errors.email}</div> }
                </div>
                <button type="submit" className="btn btn-success">
                    Create
                </button>
            </form>

            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </>
    );
}

