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

        document.querySelector('.loading').style.display = 'block';
        document.querySelector('.add-form').style.display = 'none';

        postComment(sanitizeHtml(textValue), sanitizeHtml(nameValue))
            .then((data) => {
                document.querySelector('.loading').style.display = 'none';
                document.querySelector('.add-form').style.display = 'flex';

                updateComments(data);
                renderComments();
                nameInput.value = '';
                textInput.value = '';
            })
            .catch((error) => {
                document.querySelector('.loading').style.display = 'none';
                document.querySelector('.add-form').style.display = 'flex';

                if (error.message === 'Failed to fetch') {
                    alert('Кажется, у вас сломался интернет, попробуйте позже');
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Сервер сломался, попробуй позже');
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3 символов');
                }
            });
    });
};
