import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default function CreateArticleForm() {
    const [searchTags, setSearchTags] = useState('');
    const [searchRubrics, setSearchRubrics] = useState('');

    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);

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
                    uploadUrl: window.location.origin + '/admin/articles/upload'
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

    useEffect(() => {
        searchRubricsAsync(searchRubrics);
    }, [searchRubrics]);

    useEffect(() => {
        searchTagsAsync(searchTags);
    }, [searchTags]);

    const searchRubricsAsync = async (inputValue) => {
        if (inputValue) {
            try {
                const response = await axios.get(`/api/select/rubrics?search=${inputValue}`);
                setOptions(response.data);
            } catch (error) {
                console.error('Error searching rubrics:', error);
                setOptions([]);
            }
        }
    };

    const searchTagsAsync = async (inputValue) => {
        if (inputValue) {
            try {
                const response= await axios.get(`/api/select/tags?search=${inputValue}`)
                setOptions2(response.data);
            } catch (error) {
                console.error('Error searching tags:', error);
                setOptions2([]);
            }
        }
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

                    <Select
                        name="tag_ids[]"
                        options={options2}
                        isMulti
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: 'tag_ids' })}
                        onInputChange={setSearchTags}
                        placeholder="Search tags..."
                    />

                    <Select
                        name="rubric_ids[]"
                        options={options}
                        isMulti
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: 'rubric_ids' })}
                        onInputChange={setSearchRubrics}
                        placeholder="Search rubrics..."
                    />

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}


