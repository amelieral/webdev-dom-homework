import { addComment } from "./addComment.js";
import { comments } from "./comments.js";

export const renderComments = () => {
    const list = document.querySelector(".comments");
    list.innerHTML = comments
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
            <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
          </div>
        </div>
      </li>
      `;
    })
    .join("");

    const likeButtons = document.querySelectorAll(".like-button")

    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = likeButton.dataset.index;
        const comment = comments[index];

        comment.likes = comment.isLiked
        ? comment.likes - 1 : comment.isLiked + 1;

        comment.isLiked = !comment.isLiked;

        renderComments();
      });
    }

    addComment();

    const commentsElements = document.querySelectorAll(".comment");
    const text = document.getElementById("add-text");

    for (const  commentElement of commentsElements) {

      commentElement.addEventListener("click", () => {
        const currentComment = comments[commentElement.dataset.index];
        text.value = `${currentComment.name}: ${currentComment.text}`;
      });
    }

  };