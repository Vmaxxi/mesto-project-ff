// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const container = document.querySelector('.places__list');

function createCard(item, deleteCard) {
    const card = template.cloneNode(true);
    const cardTitle = card.querySelector('.card__title') 
    const cardImage = card.querySelector('.card__image') 

    cardTitle.textContent = item.name;
    cardImage.src = item.link;

    const deleteButton = card.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', deleteCard);
        function deleteCard(event) {
            event.target.closest('.card').remove();
        }

    return card;
}

initialCards.forEach((item) => {
    container.append(createCard(item));
});

// @todo: DOM узлы  

 
// @todo: Функция создания карточки


  
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
