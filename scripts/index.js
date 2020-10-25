let popup = document.querySelector('.popup');
let popupProfileEditForm = popup.querySelector('.popup__container')
let popupCloseButton = popupProfileEditForm.querySelector('.popup__close-button');
let popupInputProfileName = popupProfileEditForm.querySelector('.popup__input_content_profile-name');
let popupInputProfileAbout = popupProfileEditForm.querySelector('.popup__input_content_profile-about');

let profileInfo = document.querySelector('.profile__info');
let profileEditButton = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileAbout = profileInfo.querySelector('.profile__about');


function openPopup() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function submitProfileEditForm(evt) {
  evt.preventDefault();
  let nameInput = popupInputProfileName.value;
  let aboutInput = popupInputProfileAbout.value;

  profileName.textContent = nameInput;
  profileAbout.textContent = aboutInput;

  closePopup();
}


popupInputProfileName.setAttribute('value', profileName.textContent);
popupInputProfileAbout.setAttribute('value', profileAbout.textContent);

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupProfileEditForm.addEventListener('submit', submitProfileEditForm);