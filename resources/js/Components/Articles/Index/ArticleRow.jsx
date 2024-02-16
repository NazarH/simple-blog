import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleRow ({ article, articleStates, setArticleStates }) {
    const deleteArt = async (id) => {
        try {
            await axios.delete('/admin/articles/delete/' + id);
            console.log('Видалення успішне');
        } catch (error) {
            console.error('Видалення не вдалося', error);
        }
    };

    const updateTag = async (artId, active) => {
        const formData = new FormData();
        formData.append('_token', window.csrfToken);
        formData.append(
            'is_active',
            articleStates.find((article) => article.id === artId).is_active ? 0 : 1
        );

        try {
            await axios.post(`/admin/articles/update/${artId}`, formData);

            setArticleStates((prevStates) =>
                prevStates.map((articleStates) => {
                    if (articleStates.id === artId) {
                        return { ...articleStates, is_active: active ? 0 : 1 };
                    }
                    return articleStates;
                })
            );
        } catch (error) {
            console.error('Помилка оновлення тегу:', error);
        }
    };

    return (
        <tr key={article.id}>
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>
                <form form id={`updateForm-${article.id}`} onSubmit={(e) => e.preventDefault()}>
                    <input type="hidden" name="_token" defaultValue={window.csrfToken} />
                    <input className="hidden"
                           name="is_active"
                           type="text"
                           defaultValue={article.is_active ? 0 : 1}
                    />
                    <button type="submit"
                            className={`btn ${article.is_active ? 'btn-danger' : 'btn-success'}`}
                            onClick={() => updateTag(article.id, article.is_active)}
                            id={`articleAct-${article.id}`}
                    >
                        {article.is_active ? 'Деактивувати' : 'Активувати'}
                    </button>
                </form>
            </td>
            <td className="buttons">
                <Link to={`/admin/articles/edit/${article.id}`} state={{ id: article.id }}>
                    <button className="btn btn-primary">
                        Редагувати
                    </button>
                </Link>
                <button className="btn btn-danger"
                        onClick={() => deleteArt(article.id)}
                >
                    Видалити
                </button>
            </td>
        </tr>
    );
};
