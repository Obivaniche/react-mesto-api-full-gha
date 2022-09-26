import React from 'react';

function ImagePopup({card, onClose}) {

    return (
        <div className={`popup popup-img ${card ? 'popup_opened' : ''}`}>
        <div className="popup__img-container">
          <button className="button popup__close-button" type="button" onClick={onClose}></button>
          <img className="popup__img" src={card?.link} alt={card?.name} />
          <p className="popup__discripton">{card?.name}</p>
        </div>
      </div>
    );
};

export default ImagePopup;