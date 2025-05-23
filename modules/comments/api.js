const host = `https://wedev-api.sky.pro/api/v2/nastya-mei`;
const authorHost = 'https://wedev-api.sky.pro/api/user';

export let token = '';

export const setToken = (newToken) => {
    token = newToken;
};

export let name = '';

export const setName = (newName) => {
    name = newName;
};

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
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export const login = (login, password) => {
    if (!login.trim() || !password.trim()) {
        alert('Пожалуйста, заполните все поля');
        return Promise.reject();
    }

    return fetch(authorHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (!response.ok) {
            return response
                .json()
                .then((errorData) => {
                    const errorMessage =
                        errorData.error || 'Неверный логин или пароль';
                    throw new Error(errorMessage);
                })
                .catch(() => {
                    throw new Error('Неверный логин или пароль');
                });
        }
        return response.json();
    });
};

export const registration = (name, login, password) => {
    if (!name.trim() || !login.trim() || !password.trim()) {
        alert('Пожалуйста, заполните все поля');
        return Promise.reject();
    }

    return fetch(authorHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    });
};
