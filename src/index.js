
import './pages/index.css';
import {initialCards} from './scripts/cards.js';

const template = document.querySelector('#card-template').content;
const container = document.querySelector('.places__list');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupImageClose = popupImage.querySelector('.popup__close');
const openImage = document.querySelector('.popup__image')
// Формы

const formElement  = popupEdit.querySelector('.popup__form');
const nameInput = formElement .querySelector('.popup__input_type_name');
const jobInput = formElement .querySelector('.popup__input_type_description');

const formPopup = document.forms['new-place'];
const placeNameInput = formPopup.elements['place-name'];
const placelinkInput = formPopup.elements['link'];
// Профиль

const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

//откртие закрытие попапа картинок
function openImageElement(imageSrc, imageName){
  openImage.src = imageSrc
  openImage.name = imageName

  openPopup(popupImage)
};

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage)
});


//Открытие закрытие попапа
 const openPopup = popup => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
  popup.addEventListener('click', overlayClose);
}

const closePopup = popup => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', escClose)
  popup.removeEventListener('click', overlayClose);
}

const escClose = event => {
  if (event.key === 'Escape') {
    const openModal = document.querySelector('.popup_is-opened');
    closePopup(openModal)
  }
}

const overlayClose = event => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

  //Редактирование профиля модальное окно
  profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
  });

 // Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  // Выберите элементы, куда должны быть вставлены значения полей
  closePopup(popupEdit)
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit); 

  popupEditClose.addEventListener('click', () => {
    closePopup(popupEdit);
  })

  //Открытие попапа добавления карточки

  profileAddButton.addEventListener('click', () => {
    openPopup(popupAdd);
  })

  popupAddClose.addEventListener('click', () => {
    closePopup(popupAdd);
  })

  //плавность открытия модальных окон
  document.addEventListener('DOMContentLoaded', () => {
    const animatedPopup = document.querySelectorAll('.popup');
    animatedPopup.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
  });

  // добавление карточк вручную 
  function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const nameCardValue = placeNameInput.value;
    const linkCardValue = placelinkInput.value;

    const newCard = createCard({
        name: nameCardValue,
        link: linkCardValue,
        alt: nameCardValue
    },  deleteCard, openImageElement, likeCardButton );

    container.prepend(newCard);

    closePopup(popupAdd);
    formPopup.reset();
}
formPopup.addEventListener('submit', handleCardFormSubmit);
  
 
// создание карточек
function createCard(item, deleteCard, openImageElement, likeCardButton ) {
    const card = template.cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button') ;
    const deleteButton = card.querySelector('.card__delete-button');
    
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    cardImage.addEventListener('click', () => openImageElement(cardImage.src, cardTitle.textContent));
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCardButton);
   
    return card;
}

function likeCardButton(event) {
  event.target.classList.contains('.card__like-button')
  event.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(event) {
    event.target.closest('.card').remove();
}

initialCards.forEach((item) => {
    container.append(createCard(item, deleteCard, openImageElement, likeCardButton));
});

