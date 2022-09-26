import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `button card__delete-button ${isOwn ? 'card__delete-button' : 'card__delete-button_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `button card__like-button ${isLiked ? 'card__like-button_active' : ''}`
    );

    function handleCardClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleCardDelete() {
        onCardDelete(card);
    };

    return (
        <article className="card">
            <img className="card__img" src={card.link} alt={card.name} onClick={handleCardClick} />
            <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
            <h2 className="card__title">{card.name}</h2>
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="card__like-counter">{card.likes.length}</span>
        </article>
    );
}

export default Card;