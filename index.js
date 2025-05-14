import { updateComments } from './data/comments.js';
import { fetchComments } from './modules/comments/api.js';
import { renderComments } from './modules/comments/renderComments.js';

document.querySelector('.comments').innerHTML =
    'Пожалуйста, ожидайте, идёт загрузка комментариев';

fetchComments().then((data) => {
    updateComments(data);
    renderComments();
});
