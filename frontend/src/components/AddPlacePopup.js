import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    };

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
          link,
          name
        });
    };

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonTitle='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    id="title-input"
                    className="form__input form__input_type_title"
                    name="title"
                    type="text"
                    minLength={2}
                    maxLength={30}
                    placeholder="Название"
                    required
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="form__input-error title-input-error"></span>
            </label>
            <label className="form__field">
                <input
                    id="link-input"
                    className="form__input form__input_type_link"
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required
                    value={link}
                    onChange={handleChangeLink}
                />
                <span className="form__input-error link-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;