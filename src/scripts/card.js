const template = document.querySelector('#card-template').content;
const container = document.querySelector('.places__list');

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


export {container, deleteCard, createCard, likeCardButton}