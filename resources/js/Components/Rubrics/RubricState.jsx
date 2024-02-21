import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRubrics } from '@/actions/rubrics';

export default function RubricState() {
    const dispatch = useDispatch();
    const rubricStates = useSelector(state => state.rubricsReducer.rubrics);

    useEffect(() => {
        dispatch(fetchRubrics());
    }, [dispatch]);

    return { rubricStates };
}
