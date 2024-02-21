import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function SelectRubrics({arrStates, setFormData}) {

    const [options, setOptions] = useState([]);
    const [searchRubrics, setSearchRubrics] = useState('');

    useEffect(() => {
        searchRubricsAsync(searchRubrics);
    }, [searchRubrics]);

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
