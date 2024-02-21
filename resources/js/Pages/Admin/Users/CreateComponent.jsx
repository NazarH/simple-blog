import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { createUser } from '@/actions/users';

export default function CreateComponent()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                navigate('/admin/users');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
        <div>
            <input type="hidden" name="_token" value={window.csrfToken} />
            <input
                type="text"
                name="login"
                placeholder="login"
                value={formData.login}
                onChange={handleChange}
                className="form-control"
            />
            <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
            />
            <input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <button type="submit" className="btn btn-success">
            Create
        </button>
        </form>
    );
}
