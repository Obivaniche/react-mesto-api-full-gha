import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <div className="content">
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар" />
                    <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
                </div>
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__about">{currentUser.about}</p>
                <button className="button profile__edit-button" type="button" onClick={onEditProfile} ></button>
                <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="card-grid">
                {cards.map((card) => (
                    <Card 
                        card={card} 
                        key={card._id} 
                        onCardClick={onCardClick} 
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete} />
                ))}
            </section>
        </div>
    );
    
};

export default Main;