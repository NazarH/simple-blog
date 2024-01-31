import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function IndexComponent() {
    const [arrStates, setArrStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/admin/info');
                setArrStates(response.data);
            } catch (error) {
                console.error('Помилка отримання даних:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-page">
            <h1>Ласкаво просимо!</h1>
            <h5>Статистика:</h5>
            <ul>
                <li>
                    <div>
                        Кількість користувачів:
                    </div>
                    {arrStates.users && arrStates.users.length}
                </li>
                <li>
                    <div>
                        Кількість статтей:
                    </div>
                    {arrStates.articles && arrStates.articles.length}
                </li>
                <li>
                    <div>
                        Кількість категорій:
                    </div>
                    {arrStates.rubrics && arrStates.rubrics.length}
                </li>
                <li>
                    <div>
                        Кількість тегів:
                    </div>
                    {arrStates.tags && arrStates.tags.length}
                </li>
            </ul>
        </div>
    );
}
