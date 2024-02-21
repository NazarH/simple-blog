import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function SelectRubrics({handleSelectChange})
{
    const [searchRubrics, setSearchRubrics] = useState('');
    const [options, setOptions] = useState([]);

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

    useEffect(() => {
        searchRubricsAsync(searchRubrics);
    }, [searchRubrics]);

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

