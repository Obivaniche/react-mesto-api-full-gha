import React, { useState } from 'react';

function Login({ onLogin }) {

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
        onLogin(password, email)
    };

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
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
                        />
                        <span className="form__input-error password-input-error"></span>
                    </label>
                    <button className="button form__submit-button form__submit-button_login submit-auth" type="submit">Войти</button>
                </fieldset>
            </form>
        </div>
    );

};

export default Login;