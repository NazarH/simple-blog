import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRubrics } from '@/actions/rubrics';

export default function RubricState({pageNumber}) {
    const dispatch = useDispatch();
    const rubricStates = useSelector(state => state.rubricsReducer.rubrics);

    useEffect(() => {
        dispatch(fetchRubrics(pageNumber));
    }, [dispatch]);

    return { rubricStates };
}
