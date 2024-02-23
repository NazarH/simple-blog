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
            <h1>Welcome</h1>
            <ul>
                <li>
                    <div>
                        Number of users:
                    </div>
                    {arrStates.users && arrStates.users.length}
                </li>
                <li>
                    <div>
                        Number of articles:
                    </div>
                    {arrStates.articles && arrStates.articles.length}
                </li>
                <li>
                    <div>
                        Number of categories:
                    </div>
                    {arrStates.rubrics && arrStates.rubrics.length}
                </li>
                <li>
                    <div>
                        Number of tags:
                    </div>
                    {arrStates.tags && arrStates.tags.length}
                </li>
            </ul>
        </div>
    );
}
