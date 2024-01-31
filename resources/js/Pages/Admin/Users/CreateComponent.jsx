import React from 'react';
import { useState } from 'react';

export default function CreateComponent()
{
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const response = await axios.post('/admin/users/store', formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
