import { updateComments } from './data/comments.js';
import { fetchComments } from './modules/comments/api.js';
import { renderComments } from './modules/comments/renderComments.js';

fetchComments().then((data) => {
    updateComments(data);
    renderComments();
});
