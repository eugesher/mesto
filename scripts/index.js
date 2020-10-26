let popup = document.querySelector('.popup');
let popupProfileEditForm = popup.querySelector('.popup__container')
let popupCloseButton = popupProfileEditForm.querySelector('.popup__close-button');
let popupInputProfileName = popupProfileEditForm.querySelector('.popup__input_content_profile-name');
let popupInputProfileAbout = popupProfileEditForm.querySelector('.popup__input_content_profile-about');

let profileInfo = document.querySelector('.profile__info');
let profileEditButton = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileAbout = profileInfo.querySelector('.profile__about');


function togglePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    popupInputProfileName.value = profileName.textContent;
    popupInputProfileAbout.value = profileAbout.textContent;
    popup.classList.add('popup_opened');
  }
}

function submitProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;

  togglePopup();
}


profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popupProfileEditForm.addEventListener('submit', submitProfileEditForm);