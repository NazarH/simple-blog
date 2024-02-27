import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTags } from "@/actions/articles.js";

export default function SelectTags({handleSelectChange})
{
    const dispatch = useDispatch();
    const [searchTags, setSearchTags] = useState('');
    const options2 = useSelector(state => state.tagsReducer.tags);

    useEffect(() => {
        if (searchTags) {
            dispatch(fetchTags(searchTags));
        }
    }, [dispatch, searchTags]);

    return(
        <>
            <Select
                name="tag_ids[]"
                options={options2}
                isMulti
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: 'tag_ids' })}
                onInputChange={setSearchTags}
                placeholder="Search tags..."
            />
        </>
    );
}
