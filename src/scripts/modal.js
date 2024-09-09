
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

  //Закрытие ESCAPE
  const escClose = event => {
    if (event.key === 'Escape') {
      const openModal = document.querySelector('.popup_is-opened');
      closePopup(openModal)
    }
  }

  //Закрытие OVERLAY
  const overlayClose = event => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  }

  export {openPopup, closePopup}