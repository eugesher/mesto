let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let profileInfo = document.querySelector('.profile__info');
let profileEditButton = profileInfo.querySelector('.profile__edit-button');


function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
