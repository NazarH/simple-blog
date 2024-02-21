import axios from 'axios';

export const fetchTags = () => {
    return dispatch => {
        axios.get('/api/tags/index')
            .then(response => {
                dispatch({ type: 'FETCH_TAGS_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_TAGS_FAILURE', payload: error });
            });
    };
};

export const updateTag = (tagId, active) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append('is_active', active ? 0 : 1);

        axios.post(`/admin/tags/update/${tagId}`, formData)
            .then(response => {
                dispatch({ type: 'UPDATE_TAG_SUCCESS', payload: { tagId, active } });
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_TAG_FAILURE', payload: error });
            });
    };
};

export const createTag = (tagName) => {
    return dispatch => {
        return axios.post('/admin/tags/store', { name: tagName, _token: window.csrfToken })
            .then(response => {
                dispatch(fetchTags());
            })
            .catch(error => {
                console.error('Error creating tag:', error);
            });
    };
};

export const updateTagData = (id, updatedTag) => {
    return dispatch => {
        return axios.post(`/admin/tags/edit/${id}`, updatedTag)
            .then(response => {
                dispatch({ type: 'UPDATE_TAG_DATA_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_TAG_DATA_FAILURE', payload: error });
            });
    };
};

export const deleteTag = (id) => {
    return (dispatch) => {
        axios.delete(`/admin/tags/delete/${id}`)
            .then(() => {
                dispatch({ type: 'DELETE_TAG_SUCCESS', payload: id });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'DELETE_TAG_FAILURE', payload: errorMessage });
            });
    };
};

export const toggleTagEdit = (id) => {
    return {
        type: 'TOGGLE_TAG_EDIT',
        payload: id
    };
};

export const updateTagName = (id, newName) => {
    return {
        type: 'UPDATE_TAG_NAME',
        payload: { id, newName }
    };
};



