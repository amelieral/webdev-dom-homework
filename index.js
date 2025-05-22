import { updateComments } from './data/comments.js';
import { fetchComments } from './modules/comments/api.js';
import { renderComments } from './modules/comments/renderComments.js';

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            '<p>Пожалуйста, ожидайте, идёт загрузка комментариев...</p>';
    }
    fetchComments().then((data) => {
        updateComments(data);
        renderComments();
    });
};

fetchAndRenderComments(true);
