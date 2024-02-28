import axios from 'axios';

export const fetchUsers = (pageNumber) => {
    return dispatch => {
        axios.get(`/api/users/index?page=${pageNumber}`)
            .then(response => {
                dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_USERS_FAILURE', payload: errorMessage });
                throw error;
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
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_AUTH_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const updateUser = (id, action, active, formData) => {
    return dispatch => {
        return axios.post(`/admin/users/${id}/${action}`, formData)
            .then(response => {
                dispatch({ type: 'UPDATE_USER_SUCCESS', payload: {id, active} });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'UPDATE_USER_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const changeRole = (id, newRole, formData) => {
    return dispatch => {
        return axios.post(`/admin/users/${id}/update`, formData)
            .then(response => {
                dispatch({ type: 'UPDATE_USER_ROLE_SUCCESS', payload: {id, newRole}});
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'UPDATE_USER_ROLE_FAILURE', payload: errorMessage });
                throw error;
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
                return response.data; // Передача даних для подальшого використання в then
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'CREATE_USER_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};
