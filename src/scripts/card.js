
import { changeLike } from "./api";

const template = document.querySelector('#card-template').content;


// создание карточек
function createCard(item, deleteCard, likeCardButton, openImageElement, userId ) {
    const card = template.querySelector(".card").cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button') ;
    const deleteButton = card.querySelector('.card__delete-button');
    const cardLikeCounter = card.querySelector('.like-counter');
    
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    const isLiked = item.likes.some((like) => like._id === userId);
    if (isLiked) likeButton.classList.add('card__like-button_is-active');
    cardLikeCounter.textContent = item.likes.length;

    if (item.owner._id === userId && deleteCard) {

      deleteButton.addEventListener('click', () => {
        deleteCard(item._id, card);
      });
    } else {
      deleteButton.remove();
    }

    if (likeCardButton) {
      likeButton.addEventListener('click', () =>
      likeCardButton(item._id, likeButton, cardLikeCounter)
    );
    }

    if (openImageElement) {
      cardImage.addEventListener('click', () => openImageElement(item));
    }

    return card;
}

const likeChangeClick = (cardId, likeIcon, likeCount) => {
  const isLiked = likeIcon.classList.contains('card__like-button_is-active')
  changeLike(cardId, !isLiked)
  .then((cardData) => {
    likeIcon.classList.toggle('card__like-button_is-active')
    likeCount.textContent = cardData.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
}

function deleteCardClick(card) {
    card.remove();
}


export {deleteCardClick, createCard, likeChangeClick}

