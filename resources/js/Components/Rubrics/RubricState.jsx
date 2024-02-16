import React, { useState, useEffect } from 'react';

export default function RubricState()
{
    let rubrics = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/rubrics/index');
                setRubricStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [rubricStates, setRubricStates] = useState(
        rubrics.map(rubric => ({
            id: rubric.id,
            name: rubric.name,
            isEditing: false,
        }))
    );

    return{
        rubricStates,
        setRubricStates
    }
}
