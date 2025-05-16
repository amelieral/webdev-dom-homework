const host = `https://wedev-api.sky.pro/api/v1/nastya-mei`;

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке комментариев');
            }
            return response.json();
        })
        .then((responseData) => {
            const listComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });

            return listComments;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера');
            }

            if (response.status === 400) {
                throw new Error('Неверный запрос');
            }

            if (response.status === 201) {
                return response.json();
            }
        })
        .then(() => {
            return fetchComments();
        });
};
