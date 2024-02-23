import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from "@/actions/articles.js";

export default function SelectTags({arrStates, setFormData})
{
    const dispatch = useDispatch();
    const [searchTags, setSearchTags] = useState('');
    const options2 = useSelector(state => state.articlesReducer.tags);

    useEffect(() => {
        if (searchTags) {
            dispatch(fetchTags(searchTags));
        }
    }, [dispatch, searchTags]);

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
