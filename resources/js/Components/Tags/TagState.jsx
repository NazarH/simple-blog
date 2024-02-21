import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '@/actions/tags';

export default function TagState() {
    const dispatch = useDispatch();
    const tagStates = useSelector(state => state.tagsReducer.tags);

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    return { tagStates };
}
