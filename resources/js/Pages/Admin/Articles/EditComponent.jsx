import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function EditArticleForm() {
    const location = useLocation();
    const id = location.state ? location.state.id : window.location.href.match(/\/(\d+)$/)[1];
    const [arrStates, setArrStates] = useState({});
    let [count, setCount] = useState(0);

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

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tag_ids: [],
        rubric_ids: [],
    });

    useEffect(() => {
        setFormData({
            title: arrStates.article ? arrStates.article.title : '',
            text: arrStates.article ? arrStates.article.text : '',
            tag_ids: arrStates.tags && arrStates.tags.map((tag) => ({ value: tag.id, label: tag.name })),
            rubric_ids: arrStates.rubrics && arrStates.rubrics.map((rubric) => ({ value: rubric.id, label: rubric.name })),
        });

        const editor = ClassicEditor
            .create(document.querySelector('#editor'), {
                ckfinder: {
                    uploadUrl: 'http://pet-blog.test/admin/articles/upload',
                },
                toolbar: {
                    items: [
                        'heading', '|',
                        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
                        'blockQuote', 'code', 'link', 'imageUpload', '|',
                        'undo', 'redo',
                    ],
                },
            })
            .then((editor) => {
                editor.model.document.on('change', () => {
                    const newData = editor.getData();
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        text: newData,
                    }));
                });

                editor.setData(arrStates.article && arrStates.article.text);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            if (editor) {
                const currentUrl = window.location.href;
                const regex = /\/admin\/articles\/edit\//;
                if (regex.test(currentUrl)) document.querySelector('.ck.ck-reset.ck-editor.ck-rounded-corners').remove();
            }
        };
    }, [arrStates.article]);

    const findSelectedOptions = (selectedValues, options) => {
        const selectedOptions = options.filter((option) => selectedValues.includes(option.id));
        return selectedOptions.map((option) => ({
            value: option.id,
            label: option.name,
        }));
    };

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

        try {
            const response = await axios.post(`/admin/articles/edit/${arrStates.article && arrStates.article.id}/update`, formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            <form
                onSubmit={handleFormSubmit}
                className="form"
            >
                <div className="form__block">
                    {/* ... (existing code) */}

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, title: e.target.value }))}
                    />
                    <textarea name="text" className="form-control" placeholder="Write comment here" resize="none" id="editor" />

                    {arrStates.tags && (
                        <Select
                            name="tag_ids[]"
                            options={arrStates.tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                            isMulti
                            onChange={(selectedOptions) => setFormData((prevFormData) => ({
                                ...prevFormData,
                                tag_ids: selectedOptions.map((option) => option.value),
                            }))}
                            defaultValue={findSelectedOptions(arrStates.a_tags && arrStates.a_tags.map(tag => tag.id), arrStates.tags && arrStates.tags)}
                        />
                    )}

                    {arrStates.rubrics && (
                        <Select
                            name="rubric_ids[]"
                            options={arrStates.rubrics.map((rubric) => ({ value: rubric.id, label: rubric.name }))}
                            isMulti
                            onChange={(selectedOptions) => setFormData((prevFormData) => ({
                                ...prevFormData,
                                rubric_ids: selectedOptions.map((option) => option.value),
                            }))}
                            defaultValue={findSelectedOptions(arrStates.a_rubrics && arrStates.a_rubrics.map(rubric => rubric.id), arrStates.rubrics && arrStates.rubrics)}
                        />
                    )}

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
}
