import React, { useState, useEffect } from 'react';
export default function TagState()
{
    let tags = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/tags/index');
                setTagStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [tagStates, setTagStates] = useState(tags.map(tag => ({ id: tag.id, name: tag.name })));

    return {
        tagStates,
        setTagStates
    }
}
