import { addComment } from './addComment.js';
import { comments } from '../../data/comments.js';
import { name, token } from './api.js';
import { setupLikeHandlers } from './likeHandlers.js';
import { setupQuoteHandlers } from './quoteHandlers.js';
import { renderLogin } from './renderLogin.js';

export const renderComments = () => {
    const container = document.querySelector('.container');

    const commentsHtml = comments
        .map((comment, index) => {
            return `
    <li class="comment" data-index="${index}">
        <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date.toLocaleString()}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
                ${comment.text}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
            </div>
        </div>
    </li>
    `;
        })
        .join('');

    const addCommentsHtml = `

                <div class="add-form">
                <input
                    id="add-name"
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${name}"
                />
                <textarea
                    id="add-text"
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш комментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button id="form-button" class="add-form-button">
                        Написать
                    </button>
                </div>
            </div>
            <div class="loading" style="display: none; margin-top: 20px">
                Комментарий добавляется...
            </div>
            `;

    const linkToLog = `<p>Чтобы отправить комментарий, 
                 <button class="link-login">войдите</button></p>`;

    const baseHtml = `
    <ul class="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : linkToLog}
    `;

    container.innerHTML = baseHtml;

    if (token) {
        setupLikeHandlers();
        setupQuoteHandlers();
        addComment();
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin();
        });
    }
};
