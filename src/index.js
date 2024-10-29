
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { openPopup,closePopup } from './scripts/modal.js';
import {deleteCardClick, createCard, likeChangeClick  } from './scripts/card.js';
import {
  clearValidation,
  enableValidation,
  validationConfig
 } from './scripts/validation.js';
 import { getUser,
  getCard,
  profileEdit,
  addNewCard,
  deletedCardServer,
  avatarEdit } from './scripts/api.js';

 let userId = null;

 const container = document.querySelector('.places__list');
//Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
//Добавление карточек
const profileAddButton = document.querySelector('.profile__add-button');

//Открытие Закрытие попапов
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupImageClose = popupImage.querySelector('.popup__close');
const openImage = document.querySelector('.popup__image')

// Формы
const formProfile  = popupEdit.querySelector('.popup__form');
const nameInput = formProfile .querySelector('.popup__input_type_name');
const jobInput = formProfile .querySelector('.popup__input_type_description');
/* const formNewCard = document.forms['new-place']; */
const popupInputNewCardForm = document.querySelector(
  '.popup_type_new-card .popup__form[name="new-place"]'
);
const newCardNameInput = popupInputNewCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrlInput = popupInputNewCardForm.querySelector(
  ".popup__input_type_url")
// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//Avatar
const popupTypeAvatarButton = document.querySelector(".profile__image");
const popupTypeAvatarEdit = document.querySelector(".popup_type_avatar_edit");
const popupAvatarForm = document.querySelector(
  '.popup_type_avatar_edit .popup__form[name="edit-avatar"]'
);
const popupAvatarUrl = document.querySelector(".popup__input_type_avatar_url");

Promise.all([getCard(), getUser()]) //+
.then(([cards, userData]) => {
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  popupTypeAvatarButton.style.backgroundImage = `url('${userData.avatar}')`;

  cards.forEach((data) => {
    const newCard = createCard(data, deletedCardHandle, likeChangeClick, openImageElement, userId);
    container.append(newCard);
  });
})
.catch((err) => {
  console.log(err);
})

popupTypeAvatarButton.addEventListener('click', () => { //+
  clearValidation(popupAvatarForm, validationConfig);
  openPopup(popupTypeAvatarEdit)
});

function renderLoading(loading, submitBtn) {
  if(loading) {
    submitBtn.textContent = 'Сохранение...';
  } else {
    submitBtn.textContent = 'Сохранить';
  }
}

//откртие закрытие попапа картинок
function openImageElement(item){ //+
  openImage.src = item.link
  openImage.name = item.name
  openImage.alt = item.name
  openPopup(popupImage)
};

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage)
});

  //Редактирование профиля модальное окно
  profileEditButton.addEventListener('click', () => {
    clearValidation(formProfile, validationConfig)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
  });

  const deletedCardHandle = (cardId, createCardNew) => { //+
    deletedCardServer(cardId)
      .then(() => {
        deleteCardClick(createCardNew); 
      })
      .catch((err) => {
        console.log(err);
      });
};

 // Обработчик «отправки» формы
function handleEditProfile(evt) {
  evt.preventDefault(); 

  const submitBtn = evt.target.querySelector('.popup__button')
  renderLoading(true, submitBtn)
  profileEdit(
    nameInput.value, jobInput.value
  )
  .then((userData) => {
    profileTitle.textContent = userData.name
    profileDescription.textContent = userData.about
    closePopup(popupEdit)
    formProfile.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, submitBtn)
  })
}

// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', handleEditProfile); 

  popupEditClose.addEventListener('click', () => {
    closePopup(popupEdit);
  })

  //Открытие попапа добавления карточки

  profileAddButton.addEventListener('click', () => {
    clearValidation(popupInputNewCardForm, validationConfig)
    openPopup(popupAdd);
  })

  popupAddClose.addEventListener('click', () => {
    closePopup(popupAdd);
  })

  //плавность открытия модальных окон
  
  const animatedPopup = document.querySelectorAll('.popup');
  animatedPopup.forEach(popup => {
      popup.classList.add('popup_is-animated');
  });


  // добавление карточк вручную 
function handleAddCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
    likes: [],
  };

  const submitBtn = evt.target.querySelector('.popup__button')
  addNewCard(cardData.name, cardData.link)
  .then((res) => {
    const createCardNew = createCard(res, deletedCardHandle, likeChangeClick, openImageElement, userId);
    container.prepend(createCardNew);
    closePopup(popupAdd);
    popupInputNewCardForm.reset();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, submitBtn)
  })
}
popupInputNewCardForm.addEventListener('submit', handleAddCard);
  
const handelAvatarForm = (evt) => {
  evt.preventDefault();

  const submitBtn = evt.target.querySelector('.popup__button')
  renderLoading(true, submitBtn)
  avatarEdit(popupAvatarUrl.value)
  .then((res) => {
    popupTypeAvatarButton.style.backgroundImage = `url('${res.avatar}')`;
    closePopup(popupTypeAvatarEdit);
    popupAvatarForm.reset()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, submitBtn)
  })
}

popupAvatarForm.addEventListener('submit', handelAvatarForm);