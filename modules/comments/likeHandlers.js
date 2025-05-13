import { comments } from '../../data/comments.js';
import { renderComments } from './renderComments.js';

export const setupLikeHandlers = () => {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            const comment = comments[index];

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1;
            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    });
};
