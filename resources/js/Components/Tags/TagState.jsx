import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '@/actions/tags';

export default function TagState({pageNumber}) {
    const dispatch = useDispatch();
    const tagStates = useSelector(state => state.tagsReducer.tags);

    useEffect(() => {
        dispatch(fetchTags(pageNumber));
    }, [dispatch]);

    return { tagStates };
}
