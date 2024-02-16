import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ArticleList from '../../../Components/Articles/Index/ArticleList';
import CreateButton from '../../../Components/Articles/Index/CreateButton';

export default function IndexComponent() {
    const [articleStates, setArticleStates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/articles/index');
                setArticleStates(response.data);
            } catch (error) {
                console.error('Помилка отримання даних:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <CreateButton />
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th>Активний</th>
                    <th></th>
                </tr>
                </thead>
                <ArticleList articleStates={articleStates} setArticleStates={setArticleStates} />
            </table>
        </div>
    );
};
