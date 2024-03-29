import axios from 'axios';

export const fetchArray = () => {
    return dispatch => {
        axios.get('/api/admin/info')
            .then(response => {
                dispatch({ type: 'FETCH_ARRAY_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_ARRAY_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const fetchArticles = (pageNumber) => {
    return dispatch => {
        axios.get(`/api/articles/index?page=${pageNumber}`)
            .then(response => {
                dispatch({ type: 'FETCH_ARTICLES_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_ARTICLES_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const updateArt = (artId, active, formData) => {
    return dispatch => {
        axios.post(`/admin/articles/update/${artId}`, formData)
            .then(response => {
                dispatch({ type: 'UPDATE_ARTICLE_SUCCESS', payload: { artId, active } });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'UPDATE_ARTICLE_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const deleteArt = (id) => {
    return dispatch => {
        axios.delete('/admin/articles/delete/' + id)
            .then(response => {
                dispatch(fetchArticles(1));
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'DELETE_ARTICLE_FAILURE', payload: errorMessage });
                throw error;
            });
    }
}

export const fetchEditData = (id) => {
    return dispatch => {
        axios.get('/api/articles/edit/' + id)
            .then(response => {
                dispatch({ type: 'FETCH_ARTICLE_DATA_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_ARTICLE_DATA_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const formSubmit = (formData, arrStates) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`/admin/articles/edit/${arrStates.article && arrStates.article.id}/update`, formData)
                .then(response => {
                    return axios.get('/api/articles/index');
                })
                .then(response => {
                    dispatch({ type: 'FETCH_ARTICLE_EDIT_SUCCESS', payload: response.data });
                    resolve(response.data);
                })
                .catch(error => {
                    const errorMessage = error.message || 'Unknown error occurred';
                    dispatch({ type: 'FETCH_ARTICLE_EDIT_FAILURE', payload: errorMessage });
                    reject(error);
                });
        });
    };
};


export const createArticle = (formData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post('/admin/articles/create/store', formData)
                .then(response => {
                    dispatch({ type: 'FETCH_ARTICLE_CREATE_SUCCESS', payload: response.data });
                    resolve(response.data);
                })
                .catch(error => {
                    const errorMessage = error.message || 'Unknown error occurred';
                    dispatch({ type: 'FETCH_ARTICLE_CREATE_FAILURE', payload: errorMessage });
                    reject(error);
                });
        });
    };
};


export const fetchTags = (searchTerm) => {
    return (dispatch) => {
        axios.get(`/api/select/tags?search=${searchTerm}`)
            .then(response => {
                dispatch({ type: 'FETCH_TAGS_SUCCESS', payload: response.data });
            })
            .catch(error => {
                const errorMessage = error.message || 'Unknown error occurred';
                dispatch({ type: 'FETCH_TAGS_FAILURE', payload: errorMessage });
                throw error;
            });
    };
};

export const fetchRubrics = (searchTerm) => {
    return (dispatch) => {
        axios.get(`/api/select/rubrics?search=${searchTerm}`)
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
