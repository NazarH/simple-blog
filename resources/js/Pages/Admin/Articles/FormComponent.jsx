import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormInputs from '@/Components/Articles/Form/FormInputs';
import SelectTags from '@/Components/Articles/Form/SelectTags';
import SelectRubrics from '@/Components/Articles/Form/SelectRubrics';
import FormData from "@/Components/Articles/Form/FormData";
import SuccessForm from "@/Components/SuccesForm";

import { createArticle } from "@/actions/articles";

export default function CreateArticleForm()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { formData, setFormData } = FormData();
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSelectChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedValues,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createArticle(formData))
            .then(() => {
                setIsSuccess(true);

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

                    <FormInputs formData={formData} setFormData={setFormData} errors={errors}/>
                    <SelectTags handleSelectChange={handleSelectChange} />
                    <SelectRubrics handleSelectChange={handleSelectChange} errors={errors}/>

                    <button type="submit" className="btn btn-success">
                        Create
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
