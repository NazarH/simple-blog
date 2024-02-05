import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function IndexComponent() {
    const [commentStates, setCommentStates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/comments/index');
                setCommentStates(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    /* ban/unban user */

    const updateUser = async (userId, action) => {
        const userToUpdate = commentStates.find(comment => comment.user_id === userId).user;
        const updatedIsActive = userToUpdate.is_active === 1 ? 0 : 1;

        const formData = new FormData();
        formData.append('is_active', updatedIsActive);
        formData.append('_token', window.csrfToken);

        try {
            await axios.post(`/admin/users/${userId}/${action}`, formData);

            setCommentStates(prevCommentStates =>
                prevCommentStates.map(commentState =>
                    commentState.user_id === userId
                        ? { ...commentState, user: { ...userToUpdate, is_active: updatedIsActive } }
                        : commentState
                )
            );
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container">
            <table
                id="example2"
                className="table table-bordered table-hover"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Text</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {commentStates.map((comment) => (
                        <tr key={comment.id}>
                            <td>{comment.id}</td>
                            <td>{comment.user_id} - {comment.user.login}</td>
                            <td class="comment-field">
                                <pre>
                                    {
                                        <div dangerouslySetInnerHTML={{ __html: comment.text }}>
                                        </div>
                                    }
                                </pre>
                            </td>
                            <td>
                                {comment.user.role !== 'admin' && (
                                    <>
                                        {comment.user.is_active === 1 ? (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => updateUser(comment.user.id, 'ban')}
                                            >
                                                Ban
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => updateUser(comment.user.id, 'unban')}
                                            >
                                                Unban
                                            </button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


