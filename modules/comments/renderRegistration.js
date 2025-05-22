import { fetchAndRenderComments } from '../../index.js';
import { registration, setName, setToken } from './api.js';
import { renderLogin } from './renderLogin.js';

export const renderRegistration = () => {
    const container = document.querySelector('.container');

    const loginHtml = `
    <section class="add-form">
        <h1>Форма регистрации</h1>
            <input
            type="text"
            class="add-form-name"
            placeholder="Введите имя"
            id="name"
            required
        />
        <input
            type="text"
            class="add-form-name"
            placeholder="Введите логин"
            id="login-input"
            required
        />
        <input
            type="password"
            class="add-form-name"
            placeholder="Введите пароль"
            id="password-input"
            required
        />
        <fieldset class="add-form-registry">
            <button class="add-form-button-link registry login-button">
                Зарегистрироваться
            </button>
            <button class="add-form-button register-button entry">
                Войти
            </button>
        </fieldset>
    </section>
    `;

    container.innerHTML = loginHtml;

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin();
    });

    const nameEl = document.querySelector('#name');
    const loginEl = document.querySelector('#login-input');
    const passwordEl = document.querySelector('#password-input');
    const submitButtonEl = document.querySelector('.login-button');

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setToken(data.user.token);
                setName(data.user.name);
                fetchAndRenderComments();
            });
    });
};
