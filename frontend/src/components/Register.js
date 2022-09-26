import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    };

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault()
        onRegister(email, password)
        console.log(email, password + ' Register');
    };

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="form form_auth form-auth" name="auth" noValidate onSubmit={handleSubmit}>
                <fieldset className="form__set">
                    <label className="form__field form__field_auth">
                        <input
                            id="email-input"
                            className="form__input form__input_auth form__input_type_email"
                            name="email"
                            type="email"
                            value={email}
                            minLength="2"
                            maxLength="40"
                            placeholder="Email"
                            required
                            onChange={handleChangeEmail}
                        />
                        <span className="form__input-error email-input-error"></span>
                    </label>
                    <label className="form__field form__field_auth">
                        <input
                            id="password-input"
                            className="form__input form__input_auth form__input_type_password"
                            name="password"
                            type="password"
                            value={password}
                            minLength="2"
                            maxLength="40"
                            placeholder="Пароль"
                            required
                            onChange={handleChangePassword}
                            autoComplete="off"
                        />
                        <span className="form__input-error password-input-error"></span>
                    </label>
                    <button className="button form__submit-button form__submit-button_auth submit-auth" type="submit">Зарегистрироваться</button>
                </fieldset>
            </form>
            <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
        </div>
    );

};

export default Register;