import { comments, updateComments } from '../../data/comments.js';
import { renderComments } from './renderComments.js';
import { sanitizeHtml } from '../../helpers/sanitizeHtml.js';
import { postComment } from './api.js';

export const addComment = () => {
    const nameInput = document.getElementById('add-name');
    const textInput = document.getElementById('add-text');
    const buttonForm = document.getElementById('form-button');

    buttonForm.replaceWith(buttonForm.cloneNode(true));
    const freshButton = document.getElementById('form-button');

    freshButton.addEventListener('click', () => {
        const nameValue = nameInput.value.trim();
        const textValue = textInput.value.trim();

        if (!nameValue || !textValue) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        postComment(sanitizeHtml(textValue), sanitizeHtml(nameValue)).then(
            (data) => {
                updateComments(data);
                renderComments();
                nameInput.value = '';
                textInput.value = '';
            },
        );
    });
};
