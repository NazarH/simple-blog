import axios from 'axios';

export const fetchRubrics = (pageNumber) => {
    return dispatch => {
        axios.get(`/api/rubrics/index?page=${pageNumber}`)
            .then(response => {
                dispatch({ type: 'FETCH_RUBRICS_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_RUBRICS_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const updateRubric = (rubricId, active, formData) => {
    return dispatch => {
        axios.post(`/admin/rubrics/update/${rubricId}`, formData)
            .then(response => {
                dispatch({ type: 'UPDATE_RUBRIC_SUCCESS', payload: { rubricId, active } });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'UPDATE_RUBRIC_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const createRubric = (rubricName) => {
    return dispatch => {
        return axios.post('/admin/rubrics/store', { name: rubricName, _token: window.csrfToken })
            .then(response => {
                dispatch(fetchRubrics());
            })
            .catch(error => {
                throw error;
            });
    };
};

export const deleteRubric = (id) => {
    return (dispatch) => {
        axios.delete(`/admin/rubrics/delete/${id}`)
            .then(response => {
                dispatch(fetchRubrics());
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'DELETE_RUBRIC_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const toggleRubricEdit = (id) => {
    return {
        type: 'TOGGLE_RUBRIC_EDIT',
        payload: id
    };
};

export const updateRubricName = (id, newName) => {
    return {
        type: 'UPDATE_RUBRIC_NAME',
        payload: { id, newName }
    };
};

export const updateRubricData = (id, updatedRubric) => {
    return dispatch => {
        return axios.post(`/admin/rubrics/edit/${id}`, updatedRubric)
            .then(response => {
                dispatch({ type: 'UPDATE_RUBRIC_DATA_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'UPDATE_RUBRIC_DATA_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};
