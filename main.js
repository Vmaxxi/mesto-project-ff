(()=>{"use strict";var e=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",r)},t=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",r)},n=function(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");t(n)}},r=function(e){e.target===e.currentTarget&&t(e.currentTarget)},o=document.querySelector("#card-template").content,c=document.querySelector(".places__list");function p(e,t,n,r){var c=o.cloneNode(!0),p=c.querySelector(".card__title"),i=c.querySelector(".card__image"),a=c.querySelector(".card__like-button"),u=c.querySelector(".card__delete-button");return p.textContent=e.name,i.src=e.link,i.alt=e.name,i.addEventListener("click",(function(){return n(e.link,e.name)})),u.addEventListener("click",t),a.addEventListener("click",r),c}function i(e){e.target.classList.toggle("card__like-button_is-active")}function a(e){e.target.closest(".card").remove()}var u=document.querySelector(".profile"),d=u.querySelector(".profile__edit-button"),l=u.querySelector(".profile__add-button"),s=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),y=s.querySelector(".popup__close"),v=_.querySelector(".popup__close"),f=m.querySelector(".popup__close"),k=document.querySelector(".popup__image"),q=s.querySelector(".popup__form"),S=q.querySelector(".popup__input_type_name"),L=q.querySelector(".popup__input_type_description"),g=document.forms["new-place"],E=g.elements["place-name"],h=g.elements.link,x=u.querySelector(".profile__title"),b=u.querySelector(".profile__description");function j(t,n){k.src=t,k.name=n,k.alt=n,e(m)}f.addEventListener("click",(function(){t(m)})),d.addEventListener("click",(function(){S.value=x.textContent,L.value=b.textContent,e(s)})),q.addEventListener("submit",(function(e){e.preventDefault(),x.textContent=S.value,b.textContent=L.value,t(s)})),y.addEventListener("click",(function(){t(s)})),l.addEventListener("click",(function(){e(_)})),v.addEventListener("click",(function(){t(_)})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),g.addEventListener("submit",(function(e){e.preventDefault();var n=p({name:E.value,link:h.value},a,j,i);c.prepend(n),t(_),g.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){c.append(p(e,a,j,i))}))})();