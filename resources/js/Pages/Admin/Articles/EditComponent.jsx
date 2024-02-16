import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import FormInputs from '../../../Components/Articles/Edit/FormInputs';
import SelectTags from '../../../Components/Articles/Edit/SelectTags';
import SelectRubrics from '../../../Components/Articles/Edit/SelectRubrics';
import FormData from '../../../Components/Articles/Edit/FormData';

export default function EditArticleForm() {
    const location = useLocation();
    const id = location.state ? location.state.id : window.location.href.match(/\/(\d+)$/)[1];

    let [count, setCount] = useState(0);
    const [arrStates, setArrStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/articles/edit/' + id);
                setArrStates(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Помилка отримання даних:', error);
            }
        };

        fetchData();
    }, []);

    const { formData, setFormData } = FormData(arrStates);

    const initialRubricIds = arrStates.a_rubrics && arrStates.a_rubrics.map(rubric => rubric.id);
    const initialTagIds = arrStates.a_tags && arrStates.a_tags.map(tag => tag.id);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(arrStates.rubrics.length === formData.rubric_ids.length && arrStates.tags.length === formData.tag_ids.length) {
            if(count === 0) {
                setCount(1);
                formData.tag_ids = initialTagIds;
                formData.rubric_ids = initialRubricIds;
            }
        }
        console.log(formData);
        try {
            const response = await axios.post(`/admin/articles/edit/${arrStates.article && arrStates.article.id}/update`, formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
