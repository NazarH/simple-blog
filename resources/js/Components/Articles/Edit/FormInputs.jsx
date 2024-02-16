import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FormInputs({formData, setFormData}) {
    const id = location.state ? location.state.id : window.location.href.match(/\/(\d+)$/)[1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/articles/edit/' + id);
                setFormData(prevState => ({
                    ...prevState,
                    title: response.data.article ? response.data.article.title : ''
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
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
        </div>
    );
}
