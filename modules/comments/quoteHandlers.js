import { comments } from '../../data/comments.js';

export const setupQuoteHandlers = () => {
    const commentsElements = document.querySelectorAll('.comment');
    const textInput = document.getElementById('add-text');

    commentsElements.forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index];
            textInput.value = `> ${currentComment.text}\n${currentComment.name}, `;
            textInput.focus();
        });
    });
};
