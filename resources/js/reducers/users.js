const initialState = {
    users: [],
    loading: false,
    error: null,
    auth: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_USERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'FETCH_AUTH_SUCCESS':
            return {
                ...state,
                auth: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_AUTH_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id
                        ? { ...user, is_active: action.payload.active ? 1 : 0 }
                        : user),
                loading: false,
                error: null
            };
        case 'UPDATE_USER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_USER_ROLE_SUCCESS':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id
                        ? { ...user, role: action.payload.newRole }
                        : user),
                loading: false,
                error: null
            };
        case 'UPDATE_USER_ROLE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case 'CREATE_USER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default usersReducer;
