import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function SelectTags({arrStates, setFormData}) {
    const [options2, setOptions2] = useState([]);
    const [searchTags, setSearchTags] = useState('');

    useEffect(() => {
        searchTagsAsync(searchTags);
    }, [searchTags]);

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
        <>
            { arrStates.tags && (
                <Select
                    name="tag_ids[]"
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
        </>
    );
}
