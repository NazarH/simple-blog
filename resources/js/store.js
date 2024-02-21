import { configureStore } from '@reduxjs/toolkit';

import tagsReducer from '@/reducers/tags';
import rubricsReducer from '@/reducers/rubrics';
import usersReducer from '@/reducers/users';
import articlesReducer from '@/reducers/articles'

const store = configureStore({
    reducer: {
        tagsReducer: tagsReducer,
        rubricsReducer: rubricsReducer,
        usersReducer: usersReducer,
        articlesReducer: articlesReducer
    }
});

export default store;
