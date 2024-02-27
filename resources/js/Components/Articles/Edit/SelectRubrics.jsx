import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRubrics } from "@/actions/articles.js";

export default function SelectRubrics({arrStates, setFormData}) {
    const dispatch = useDispatch();
    const [searchRubrics, setSearchRubrics] = useState('');
    const options = useSelector(state => state.articlesReducer.rubrics);

    useEffect(() => {
        if (searchRubrics) {
            dispatch(fetchRubrics(searchRubrics));
        }
    }, [dispatch, searchRubrics]);

    return (
        <>
            { arrStates.rubrics && (
                <Select
                    name="rubric_ids[]"
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
        </>
    );
}
