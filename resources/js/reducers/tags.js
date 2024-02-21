const initialState = {
    tags: [],
    loading: false,
    error: null
};

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TAG_SUCCESS':
            return {
                ...state,
                tags: state.tags.map(tag =>
                    tag.id === action.payload.tagId
                        ? { ...tag, is_active: action.payload.active ? 0 : 1 }
                        : tag),
                loading: false,
                error: null
            };
        case 'UPDATE_TAG_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_TAG_DATA_SUCCESS':
            return {
                ...state,
                tags: state.tags.map(tag =>
                    tag.id === action.payload.id ? action.payload : tag
                )
            };
        case 'UPDATE_TAG_DATA_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        case 'FETCH_TAGS_SUCCESS':
            return {
                ...state,
                tags: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_TAGS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'DELETE_TAG_SUCCESS':
            return {
                ...state,
                tags: state.tags.filter(tag => tag.id !== action.payload)
            };
        case 'DELETE_TAG_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        case 'TOGGLE_TAG_EDIT':
            return {
                ...state,
                tags: state.tags.map(tag => {
                    if (tag.id === action.payload) {
                        return { ...tag, isEditing: true };
                    } else {
                        return tag;
                    }
                })
            };
        case 'UPDATE_TAG_NAME':
            return {
                ...state,
                tags: state.tags.map(tag => {
                    if (tag.id === action.payload.id) {
                        return { ...tag, name: action.payload.newName };
                    } else {
                        return tag;
                    }
                })
            };

        default:
            return state;
    }
};

export default tagsReducer;
