import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRubrics } from "@/actions/articles.js";

export default function SelectRubrics({handleSelectChange})
{
    const dispatch = useDispatch();
    const [searchRubrics, setSearchRubrics] = useState('');
    const options = useSelector(state => state.rubricsReducer.rubrics);

    useEffect(() => {
        if (searchRubrics) {
            dispatch(fetchRubrics(searchRubrics));
        }
    }, [dispatch, searchRubrics]);

    return(
        <>
            <Select
                name="rubric_ids[]"
                options={options}
                isMulti
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: 'rubric_ids' })}
                onInputChange={setSearchRubrics}
                placeholder="Search rubrics..."
            />
        </>
    )
}
