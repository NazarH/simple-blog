import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function EditArticleForm() {
    const location = useLocation();
    const id = location.state ? location.state.id : window.location.href.match(/\/(\d+)$/)[1];

    let [count, setCount] = useState(0);
    const [arrStates, setArrStates] = useState({});
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

    useEffect(() => {
        setFormData({
            title: arrStates.article
                ? arrStates.article.title
                : ''
        });

        const editor = ClassicEditor.create(document.querySelector('#editor'), {
            ckfinder: {
                uploadUrl: window.location.origin + '/admin/articles/upload',
            },
            toolbar: {
                items: [
                    'heading', '|',
                    'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
                    'blockQuote', 'code', 'link', 'imageUpload', '|',
                    'undo', 'redo',
                ],
            },

        }).then((editor) => {
            editor.model.document.on('change', () => {
                const newData = editor.getData();

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    text: newData,
                }));
            });

            editor.setData(arrStates.article && arrStates.article.text);

        }).catch((error) => {
            console.error(error);
        });

        return () => {
            if (editor) {
                const currentUrl = window.location.href;
                const regex = /\/admin\/articles\/edit\//;
                if (regex.test(currentUrl)) {
                    document.querySelector('.ck.ck-reset.ck-editor.ck-rounded-corners').remove();
                }
            }
        };
    }, [arrStates.article]);

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
            <form onSubmit={handleFormSubmit} className="form">
                <div className="form__block">
                    <input type="text"
                           name="title"
                           placeholder="Title"
                           className="form-control"
                           value={formData.title}
                           onChange={(e) => setFormData((prevFormData) => ({
                               ...prevFormData,
                               title: e.target.value
                           }))}
                    />
                    <textarea name="text"
                              className="form-control"
                              placeholder="Write comment here"
                              resize="none"
                              id="editor"
                    />

                    { arrStates.tags && (
                        <Select name="tag_ids[]"
                                options={options2}
                                isMulti
                                onChange={(selectedOptions) => setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    tag_ids: selectedOptions.map((option) => option.value),
                                }))}
                                onInputChange={setSearchTags}
                                defaultValue={
                                    arrStates.tags.map((tag) => ({
                                        'value': tag.id,
                                        'label': tag.name
                                    }))
                                }
                        />
                    )}

                    { arrStates.rubrics && (
                        <Select name="rubric_ids[]"
                                options={options}
                                isMulti
                                onChange={(selectedOptions) => setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    rubric_ids: selectedOptions.map((option) => option.value),
                                }))}
                                onInputChange={setSearchRubrics}
                                defaultValue={
                                    arrStates.rubrics.map((rubric) => ({
                                        'value': rubric.id,
                                        'label': rubric.name
                                    }))
                                }
                        />
                    )}

                    <button type="submit" className="btn btn-success">
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
}
