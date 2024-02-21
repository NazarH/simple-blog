import React, { useState, useEffect } from 'react';
import Select from 'react-select';
export default function SelectTags({handleSelectChange})
{
    const [searchTags, setSearchTags] = useState('');
    const [options2, setOptions2] = useState([]);

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

    useEffect(() => {
        searchTagsAsync(searchTags);
    }, [searchTags]);

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
