// Импортируем классы
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Сard.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
// Импортируем переменные
import { config } from '../scripts/utils/config.js';
import {
  formEditElement,
  formAddElement,
  formAvatarElement,
  editButton,
  addButton,
  avatarButton,
  nameInput,
  aboutInput,
  avatar
} from '../scripts/utils/constants.js';
// Импортируем цсс для вебпака
import './index.css';

// Апишечка
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: '12a32b92-fdde-42f7-a35e-09018abde0f8',
    'Content-Type': 'application/json',
  },
});

// Запрашиваем данные пользователя и базовые карточки
let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, userCard]) => {
    profileInfo.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(userCard);
  })
  .catch((err) => {
    console.log((err));
  });

// Зполняем профиль 
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
});

const renderCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    handleCardClick: () => {
      popupImg.open(data);
    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api.dislike(data._id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      } else {
        api.like(data._id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    },
    handleDeleteClick: () => {
      popupDel.open();
      popupDel.setSubmit(() => {
        api.deleteCard(data._id)
          .then(() => {
            popupDel.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    }
  },
    '#card-template'
  );
  const cardElement = card.generateCard()
  return cardElement;
};

const section = new Section(
  {
    renderer: (item) => {
      section.addItem(renderCard(item));
    }
  },
  '.card-grid');

// Попап для добавления карточек
const popupAdd = new PopupWithForm('.popup-add', (cardData) => {
  popupAdd.loading(true);
  const data = {
    name: cardData.title,
    link: cardData.link
  };
  api.addCard(data)
    .then((data) => {
      section.addItem(renderCard(data));
      popupAdd.close();
    }).catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAdd.loading(false);
    })
});

// Попап для редактирования аватара
const popupAvatar = new PopupWithForm(
  '.popup-avatar',
  (data) => {
    popupAvatar.loading(true);
    api.editAvatar(data).
      then((data) => {
        avatar.src = data.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.loading(false)
      })
  });

// Попап для редактирования информации
const popupEdit = new PopupWithForm(
  '.popup-edit',
  (data) => {
    popupEdit.loading(true);
    api.editUserInfo(data)
      .then((res) => {
        profileInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEdit.loading(false)
      })
  });

// Попап от дурака
const popupDel = new PopupWithSubmit('.popup-confirm');
// Фулсайз картинка
const popupImg = new PopupWithImage('.popup-img');

// Слушатели попапов
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupEdit.setEventListeners();
popupImg.setEventListeners();
popupDel.setEventListeners();

// Валидация форм
const formEditValidator = new FormValidator(config, formEditElement);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

const formAvatarValidator = new FormValidator(config, formAvatarElement);
formAvatarValidator.enableValidation();

// Слушатель на кнопки
editButton.addEventListener('click', () => {
  const getProfileInfo = profileInfo.getUserInfo();
  nameInput.value = getProfileInfo.name;
  aboutInput.value = getProfileInfo.about;
  formEditValidator.resetValidation();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAdd.open();
});

avatarButton.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
});