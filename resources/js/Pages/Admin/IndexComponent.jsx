import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArray } from "@/actions/articles";

export default function IndexComponent() {
    const dispatch = useDispatch();
    const arrStates = useSelector(state => state.articlesReducer.array);

    useEffect(() => {
        dispatch(fetchArray());
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
