const initialState = {
    array: [],
    articles: [],
    article: [],
    tags: [],
    rubrics: [],
    loading: false,
    error: null
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ARRAY_SUCCESS':
            return {
                ...state,
                array: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_ARRAY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_ARTICLES_SUCCESS':
            return {
                ...state,
                articles: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_ARTICLES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_ARTICLE_SUCCESS':
            return {
                ...state,
                articles: action.payload,
                loading: false,
                error: null
            };
        case 'UPDATE_ARTICLE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'DELETE_ARTICLE_SUCCESS':
            return {
                ...state,
                articles: action.payload,
                loading: false,
                error: null
            };
        case 'DELETE_ARTICLE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_ARTICLE_DATA_SUCCESS':
            return {
                ...state,
                article: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_ARTICLE_DATA_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_ARTICLE_EDIT_SUCCESS':
            return {
                ...state,
                article: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_ARTICLE_EDIT_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_ARTICLE_CREATE_SUCCESS':
            return {
                ...state,
                article: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_ARTICLE_CREATE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_TAGS_SUCCESS':
            return {
                ...state,
                tags: action.payload, // оновлюємо стан для ключа tags
                loading: false,
                error: null
            };
        case 'FETCH_TAGS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_RUBRICS_SUCCESS':
            return {
                ...state,
                rubrics: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_RUBRICS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default articlesReducer;
