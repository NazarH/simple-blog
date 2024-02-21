import axios from 'axios';

export const fetchUsers = () => {
    return dispatch => {
        axios.get('/api/users/index')
            .then(response => {
                dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_USERS_FAILURE', payload: error });
            });
    };
};

export const fetchAuth = () => {
    return dispatch => {
        axios.get('/api/auth')
            .then(response => {
                dispatch({ type: 'FETCH_AUTH_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_AUTH_FAILURE', payload: error });
            });
    };
};

export const updateUser = (id, action, active) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append('is_active', active ? 0 : 1);

        return axios.post(`/admin/users/${id}/${action}`, formData)
            .then(response => {
                return axios.get('/api/users/index');
            })
            .then(response => {
                dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_USER_FAILURE', payload: error });
            });
    };
};

export const changeRole = (id, newRole) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('role', newRole);
        formData.append('_token', window.csrfToken);

        return axios.post(`/admin/users/${id}/update`, formData)
            .then(response => {
                return axios.get('/api/users/index');
            })
            .then(response => {
                dispatch({ type: 'UPDATE_USER_ROLE_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_USER_ROLE_FAILURE', payload: error });
            });
    };
};

export const createUser = (formData) => {
    return dispatch => {
        return axios.post('/admin/users/store', formData)
            .then(response => {
                return axios.get('/api/users/index');
            })
            .then(response => {
                dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'CREATE_USER_FAILURE', payload: errorMessage });
            });
    };
};
