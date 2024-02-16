import React, { useState, useEffect } from 'react';

export default function UserStates()
{
    let users = [];
    let auth = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users/index');
                setUserStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAuth = async () => {
            try {
                const response = await axios.get('/api/auth');
                setAuthStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchAuth();
    }, []);

    const [userStates, setUserStates] = useState(users);
    const [authStates, setAuthStates] = useState();

    return {
        userStates, setUserStates,
        authStates, setAuthStates
    }
}
