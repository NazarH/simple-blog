import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ArticleRow from '@/Components/Articles/Index/ArticleRow';

import { fetchArticles } from "@/actions/articles";
import SuccessForm from "@/Components/SuccesForm";

export default function IndexComponent() {
    const dispatch = useDispatch();
    const articleStates = useSelector(state => state.articlesReducer.articles);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch]);

    return (
        <div className="container">
            <Link to="/admin/articles/create">
                <button className="btn btn-primary top-btn">Create</button>
            </Link>
            <table id="example2" className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Active</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {articleStates.map((article) => (
                        <ArticleRow
                            key={article.id}
                            article={article}
                            articleStates={articleStates}
                            setIsSuccess={setIsSuccess}
                        />
                    ))}
                </tbody>
            </table>
            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
};
