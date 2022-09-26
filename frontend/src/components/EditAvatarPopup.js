import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
   
    const avatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({ avatar: avatarRef.current.value });
    };

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonTitle='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    id="avatar-input"
                    className="form__input form__input_type_avatar"
                    name="avatar"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required 
                    ref={avatarRef} />
                <span className="form__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;