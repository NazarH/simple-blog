import React from 'react';
import ArticleRow from './ArticleRow';

export default function ArticleList({ articleStates, setArticleStates }) {
    return (
        <tbody>
        {articleStates.map((article) => (
            <ArticleRow
                key={article.id}
                article={article}
                articleStates={articleStates}
                setArticleStates={setArticleStates}
            />
        ))}
        </tbody>
    );
};

