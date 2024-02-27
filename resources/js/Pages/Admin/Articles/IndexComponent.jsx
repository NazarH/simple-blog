import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

import ArticleRow from '@/Components/Articles/Index/ArticleRow';
import SuccessForm from "@/Components/SuccesForm";

import { fetchArticles } from "@/actions/articles";

export default function IndexComponent() {
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const articleStates = useSelector(state => state.articlesReducer.articles);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchArticles(pageNumber))
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
                            setPageNumber={setPageNumber}
                        />
                    ))}
                </tbody>
            </table>

            <Pagination
                activePage={pageNumber}
                totalItemsCount={
                    articleStates &&
                    articleStates.length > 0
                        ? articleStates[0].total
                        : 0
                }
                itemsCountPerPage={5}
                onChange={(pageNumber) => {
                    dispatch(fetchArticles(pageNumber));
                    setPageNumber(pageNumber++);
                }}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />

            <SuccessForm
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
            />
        </div>
    );
};
