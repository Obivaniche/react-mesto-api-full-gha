import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState({name: ''});
    const [about, setAbout] = useState({about: ''});

    function handleChangeName(evt) {
        setName(evt.target.value);
    };  

    function handleChangeAbout(evt) {
        setAbout(evt.target.value);
    };

    useEffect(() => {
        if (currentUser) {
        setName(currentUser.name);
        setAbout(currentUser.about);
        };
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
          name,
          about
        });
    };

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            buttonTitle='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    id="name-input"
                    className="form__input form__input_type_name"
                    name="name"
                    type="text"
                    minLength={2}
                    maxLength={40}
                    placeholder="Имя"
                    required
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="form__input-error name-input-error"></span>
            </label>
            <label className="form__field">
                <input
                    id="about-input"
                    className="form__input form__input_type_about"
                    name="about"
                    type="text"
                    minLength={2}
                    maxLength={200}
                    placeholder="Вид деятельности"
                    required
                    value={about}
                    onChange={handleChangeAbout}
                />
                <span className="form__input-error about-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;