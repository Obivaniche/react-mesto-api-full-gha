import React, { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";
import auth from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = React.useState([]);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка',
    about: '...',
  });

  function onLogin(email, password) {
    auth.login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
        setIsInfoTooltipOpen(true)
      });
  };

  function onRegister(email, password) {
    auth.register({ email, password })
      .then((data) => {
        if (data.email) {
          localStorage.setItem("jwt", data.token);
          setUserEmail(email);
        }
        setIsSuccess(true)
        setIsInfoTooltipOpen(true)
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
        setIsInfoTooltipOpen(true)
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && isLoggedIn) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getContent(token)
      .then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push('/');
        } else {
          localStorage.removeItem('jwt');
        }
      })
        .catch(err => console.log(err));
    }
  }, [history]);

  function handleLogOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
  };

  function handleConfirmCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.toggleLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  function handleAddCards(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isInfoTooltipOpen ||
      selectedCard
    ) {
      function handleEsc(e) {
        if (e.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isInfoTooltipOpen,
    selectedCard,
  ]);

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          handleLogOut={handleLogOut}
        />
        <Switch>

          <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmCardDelete}
          />

          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        {isLoggedIn ? <Footer /> : null}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCards} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          card={cardToDelete} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
