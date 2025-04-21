import { comments } from '../../data/comments.js';
import { renderComments } from './renderComments.js';
import { sanitizeHtml } from '../../helpers/sanitizeHtml.js';

export const addComment = () => {
    const name = document.getElementById('add-name');
    const text = document.getElementById('add-text');
    const buttonForm = document.getElementById('form-button');

    buttonForm.addEventListener('click', () => {
        const nameValue = name.value.trim();
        const textValue = text.value.trim();

        const newComment = {
            name: sanitizeHtml(name.value),
            date: new Date(),
            text: sanitizeHtml(text.value),
            likes: 0,
            isLiked: false,
        };

        if (!nameValue || !textValue) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        comments.push(newComment);

        renderComments();

        name.value = '';
        text.value = '';
    });
};
