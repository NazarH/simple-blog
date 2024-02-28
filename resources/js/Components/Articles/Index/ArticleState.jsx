import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from "@/actions/articles";

export default function RubricState({pageNumber}) {
    const dispatch = useDispatch();
    const articleStates = useSelector(state => state.articlesReducer.articles);

    useEffect(() => {
        dispatch(fetchArticles(pageNumber))
    }, [dispatch]);

    return { articleStates };
}
