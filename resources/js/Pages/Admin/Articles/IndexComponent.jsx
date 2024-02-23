import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArticleList from '@/Components/Articles/Index/ArticleList';
import CreateButton from '@/Components/Articles/Index/CreateButton';

import { fetchArticles } from "@/actions/articles";

export default function IndexComponent() {
    const dispatch = useDispatch();
    const articleStates = useSelector(state => state.articlesReducer.articles);

    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch]);

    return (
        <div className="container">
            <CreateButton />
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Active</th>
                    <th></th>
                </tr>
                </thead>
                <ArticleList articleStates={articleStates} />
            </table>
        </div>
    );
};
