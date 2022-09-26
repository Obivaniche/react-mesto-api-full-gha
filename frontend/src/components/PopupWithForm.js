import React from 'react';

function PopupWithForm({name, title, children, buttonTitle, isOpen, onClose, onSubmit}) {
    
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className={`button popup__close-button close-${name}`} type="button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form 
                className={`form form-${name}`} 
                name={name} 
                noValidate 
                onSubmit={onSubmit} 
                >
                    <fieldset className="form__set">
                        {children}
                        <button className={`button form__submit-button submit-${name}`} type="submit">{buttonTitle}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;