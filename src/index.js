
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { openPopup,closePopup } from './scripts/modal.js';
import { container, deleteCard, createCard, likeCardButton  } from './scripts/card.js';

const profile = document.querySelector('.profile');
//Редактирование профиля
const profileEditButton = profile.querySelector('.profile__edit-button');
//Добавление карточек
const profileAddButton = profile.querySelector('.profile__add-button');

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
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const placelinkInput = formNewCard.elements['link'];
// Профиль
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

//откртие закрытие попапа картинок
function openImageElement(imageSrc, imageName){
  openImage.src = imageSrc
  openImage.name = imageName
  openImage.alt = imageName
  openPopup(popupImage)
};

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage)
});

  //Редактирование профиля модальное окно
  profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
  });

 // Обработчик «отправки» формы
function handleEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  // Выберите элементы, куда должны быть вставлены значения полей
  closePopup(popupEdit)
}

// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', handleEditProfile); 

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
  
  const animatedPopup = document.querySelectorAll('.popup');
  animatedPopup.forEach(popup => {
      popup.classList.add('popup_is-animated');
  });


  // добавление карточк вручную 
  function handleAddCard(evt) {
    evt.preventDefault();

    const nameCardValue = placeNameInput.value;
    const linkCardValue = placelinkInput.value;

    const newCard = createCard({
        name: nameCardValue,
        link: linkCardValue,
    },  deleteCard, openImageElement, likeCardButton );

    container.prepend(newCard);

    closePopup(popupAdd);
    formNewCard.reset();
}
formNewCard.addEventListener('submit', handleAddCard);
  
initialCards.forEach((item) => {
  container.append(createCard(item, deleteCard, openImageElement, likeCardButton));
});

