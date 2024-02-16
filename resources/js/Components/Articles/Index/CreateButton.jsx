import React from 'react';
import { Link } from 'react-router-dom';

const CreateButton = () => {
    return (
        <Link to="/admin/articles/create">
            <button className="btn btn-primary top-btn">Створити</button>
        </Link>
    );
};

export default CreateButton;
