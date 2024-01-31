import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation } from 'react-router-dom';

export default function CreateArticleForm() {
    const [arrStates, setArrStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/articles/form');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOptions, { name }) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedValues,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/admin/articles/create/store', formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        ClassicEditor
            .create(document.querySelector('#editor'), {
                ckfinder: {
                    uploadUrl: 'http://pet-blog.test/admin/articles/upload'
                },
                toolbar: {
                    items: [
                        'heading', '|',
                        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
                        'blockQuote', 'code', 'link', 'imageUpload', '|',
                        'undo', 'redo'
                    ],
                },
            })
            .then(editor => {
                editor.model.document.on('change', () => {
                    const newData = editor.getData();
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        text: newData,
                    }));
                });
            });
    }, []);

    console.log(arrStates);

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form" method="POST">
                <div className="form__block">
                    <input
                        type="hidden"
                        name="_token"
                        defaultValue={window.csrfToken}
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleInputChange}
                    />

                    <textarea
                        name="text"
                        className="form-control"
                        placeholder="Write comment here"
                        resize="none"
                        id="editor"
                    />

                    {arrStates.tags && (
                        <Select
                            name="tag_ids[]"
                            options={arrStates.tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                            isMulti
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: 'tag_ids' })}
                        />
                    )}

                    {arrStates.rubrics && (
                        <Select
                            name="rubric_ids[]"
                            options={arrStates.rubrics.map((rubric) => ({ value: rubric.id, label: rubric.name }))}
                            isMulti
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: 'rubric_ids' })}
                        />
                    )}

                    <button type="submit" className="btn btn-success">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}



