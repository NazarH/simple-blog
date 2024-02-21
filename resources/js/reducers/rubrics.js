const initialState = {
    rubrics: [],
    loading: false,
    error: null
};

const rubricsReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case 'UPDATE_RUBRIC_SUCCESS':
            return {
                ...state,
                rubrics: state.rubrics.map(rubric =>
                    rubric.id === action.payload.rubricId
                        ? { ...rubric, is_active: action.payload.active ? 0 : 1 }
                        : rubric),
                loading: false,
                error: null
            };
        case 'UPDATE_RUBRIC_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'DELETE_RUBRIC_SUCCESS':
            return {
                ...state,
                rubrics: state.rubrics.filter(rubric => rubric.id !== action.payload)
            };
        case 'DELETE_RUBRIC_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        case 'TOGGLE_RUBRIC_EDIT':
            return {
                ...state,
                rubrics: state.rubrics.map(rubric => {
                    if (rubric.id === action.payload) {
                        return { ...rubric, isEditing: true };
                    } else {
                        return rubric;
                    }
                })
            };
        case 'UPDATE_RUBRIC_NAME':
            return {
                ...state,
                rubrics: state.rubrics.map(rubric => {
                    if (rubric.id === action.payload.id) {
                        return { ...rubric, name: action.payload.newName };
                    } else {
                        return rubric;
                    }
                })
            };
        case 'UPDATE_RUBRIC_DATA_SUCCESS':
            return {
                ...state,
                rubrics: state.rubrics.map(rubric =>
                    rubric.id === action.payload.id ? action.payload : rubric
                )
            };
        case 'UPDATE_RUBRIC_DATA_FAILURE':
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default rubricsReducer;
