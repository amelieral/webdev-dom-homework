import { addComment } from './addComment.js';
import { comments } from '../../data/comments.js';
import { setupLikeHandlers } from './likeHandlers.js';
import { setupQuoteHandlers } from './quoteHandlers.js';
const callback = (comment, index) => {
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
};

export const renderComments = () => {
    const list = document.querySelector('.comments');
    list.innerHTML = comments.map(callback).join('');

    setupLikeHandlers();
    setupQuoteHandlers();
    addComment();
};
