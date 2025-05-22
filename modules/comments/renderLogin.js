import { fetchAndRenderComments } from '../../index.js';
import { login, setName, setToken } from './api.js';
import { renderRegistration } from './renderRegistration.js';

export const renderLogin = () => {
    const container = document.querySelector('.container');

    const loginHtml = `
    <section class="add-form">
        <h1>Форма входа</h1>
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
            <button class="add-form-button login-button">
                Войти
            </button>
            <button class="add-form-button-link registry register-button">
                Зарегистрироваться
            </button>
        </fieldset>
    </section>
    `;

    container.innerHTML = loginHtml;

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration();
    });

    const loginEl = document.querySelector('#login-input');
    const passwordEl = document.querySelector('#password-input');
    const submitButtonEl = document.querySelector('.login-button');

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
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
