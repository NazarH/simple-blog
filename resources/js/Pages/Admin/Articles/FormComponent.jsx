import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ArticleList from "@/Components/Articles/Index/ArticleList.jsx";
import FormInputs from '@/Components/Articles/Form/FormInputs';
import SelectTags from '@/Components/Articles/Form/SelectTags';
import SelectRubrics from '@/Components/Articles/Form/SelectRubrics';
import FormData from "@/Components/Articles/Form/FormData";

import { createArticle } from "@/actions/articles";

export default function CreateArticleForm()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formData, setFormData } = FormData();

    const handleSelectChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedValues,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createArticle(formData));
        navigate('/admin/articles');
    };

    return (
        <div className="container">
            <form
                onSubmit={ handleSubmit }
                className="form"
                method="POST"
            >
                <div className="form__block">
                    <input
                        type="hidden"
                        name="_token"
                        defaultValue={window.csrfToken}
                    />

                    <FormInputs formData={formData} setFormData={setFormData}/>
                    <SelectTags handleSelectChange={handleSelectChange} />
                    <SelectRubrics handleSelectChange={handleSelectChange} />

                    <button type="submit" className="btn btn-success">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

