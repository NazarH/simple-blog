import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormInputs from '@/Components/Articles/Edit/FormInputs';
import SelectTags from '@/Components/Articles/Edit/SelectTags';
import SelectRubrics from '@/Components/Articles/Edit/SelectRubrics';
import FormData from '@/Components/Articles/Edit/FormData';
import SuccessForm from "@/Components/SuccesForm";

import { fetchEditData } from "@/actions/articles";
import { formSubmit } from "@/actions/articles";

export default function EditArticleForm() {
    const location = useLocation();
    const id = location.state
        ? location.state.id
        : window.location.href.match(/\/(\d+)$/)[1];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchEditData(id));
    }, []);

    const arrStates = useSelector(state => state.articlesReducer.article);
    const { formData, setFormData } = FormData(arrStates);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        dispatch(formSubmit(formData, arrStates))
            .then(() => {
                setIsSuccess(true);
                setErrors({});

                setTimeout(() => {
                    navigate('/admin/articles');
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
        <div className="container">
            <form onSubmit={handleFormSubmit} className="form">
                <div className="form__block">
                    <FormInputs
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                    />
                    <SelectTags
                        arrStates={arrStates}
                        setFormData={setFormData}
                    />
                    <SelectRubrics
                        arrStates={arrStates}
                        setFormData={setFormData}
                        errors={errors}
                    />

                    <button type="submit" className="btn btn-success">
                        Edit
                    </button>
                </div>
            </form>
            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
}
