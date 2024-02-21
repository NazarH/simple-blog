import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormInputs from '@/Components/Articles/Edit/FormInputs';
import SelectTags from '@/Components/Articles/Edit/SelectTags';
import SelectRubrics from '@/Components/Articles/Edit/SelectRubrics';
import FormData from '@/Components/Articles/Edit/FormData';

import { fetchEditData } from "@/actions/articles";
import { formSubmit } from "@/actions/articles";

export default function EditArticleForm() {
    const location = useLocation();
    const id = location.state ? location.state.id : window.location.href.match(/\/(\d+)$/)[1];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEditData(id));
    }, []);

    const arrStates = useSelector(state => state.articlesReducer.article);
    let [count, setCount] = useState(0);
    const { formData, setFormData } = FormData(arrStates);
    const initialRubricIds = arrStates.a_rubrics && arrStates.a_rubrics.map(rubric => rubric.id);
    const initialTagIds = arrStates.a_tags && arrStates.a_tags.map(tag => tag.id);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(arrStates.rubrics.length === formData.rubric_ids.length && arrStates.tags.length === formData.tag_ids.length) {
            if(count === 0) {
                setCount(1);
                formData.tag_ids = initialTagIds;
                formData.rubric_ids = initialRubricIds;
            }
        }

        dispatch(formSubmit(formData, arrStates));
        navigate('/admin/articles');
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit} className="form">
                <div className="form__block">
                    <FormInputs formData={formData} setFormData={setFormData}/>
                    <SelectTags arrStates={arrStates} setFormData={setFormData}/>
                    <SelectRubrics arrStates={arrStates} setFormData={setFormData}/>

                    <button type="submit" className="btn btn-success">
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
}
