const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container')
const popupInputProfileName = popupProfileEditForm.querySelector('.popup__input_type_profile-name');
const popupInputProfileAbout = popupProfileEditForm.querySelector('.popup__input_type_profile-about');
const popupProfileCloseButton = popupProfileEdit.querySelector('.popup__close-button');

const popupPlaceAdd = document.querySelector('.popup_type_add-place');
const popupPlaceAddForm = popupPlaceAdd.querySelector('.popup__container');
const popupInputPlaceName = popupPlaceAdd.querySelector('.popup__input_type_place-name');
const popupInputPlaceLink = popupPlaceAdd.querySelector('.popup__input_type_place-link');
const popupPlaceCloseButton = popupPlaceAdd.querySelector('.popup__close-button');
const addCardButton = document.querySelector('.profile__add-button');

const placeNameDefaultValue = 'Название'
const placeLinkDefaultValue = 'Ссылка на картинку'

const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

const placesGrid = document.querySelector('.places__grid');
const placeCardTemplate = document.querySelector('#card-template').content;
const initialCards = [
  {
    name: 'Алтайский край',
    link: './images/alex-kotomanov-pCgQBi-wvTU-unsplash.jpg'
  },
  {
    name: 'Байкал',
    link: './images/sergey-pesterev-GYIxdUFEkX8-unsplash.jpg'
  },
  {
    name: 'Москва',
    link: './images/sasha-yudaev-0I_6c7fmQ-8-unsplash.jpg'
  },
  {
    name: 'Карелия',
    link: './images/tetiana-shyshkina-m9EnS-BqnKM-unsplash.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/daniil-silantev-WaRAHxoBVIo-unsplash.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/jean-estrella-sBIAMCBx2jQ-unsplash.jpg'
  }
];


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function initProfilePopup(popup) {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;

  openPopup(popup)
}

function resetPlacePopup(popup) {
  [popupInputPlaceName, popupInputPlaceLink].forEach(inputField => {
    inputField.changed = false;
    inputField.classList.add('popup__input_empty');
  })

  popupInputPlaceName.value = placeNameDefaultValue;
  popupInputPlaceLink.value = placeLinkDefaultValue;

  closePopup(popup);
}

function changeInputValue(inputField) {
  if (!inputField.changed) inputField.value = '';
  inputField.changed = true;
  inputField.classList.remove('popup__input_empty');
}

function submitProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;

  closePopup(popupProfileEdit);
}

function addCard(cardObject) {
  const card = placeCardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = cardObject.name;
  card.querySelector('.card__image').setAttribute('src', cardObject.link);
  card.querySelector('.card__image').setAttribute('alt', cardObject.name);

  placesGrid.append(card);
}


initialCards.forEach(addCard);

profileEditButton.addEventListener('click', () => initProfilePopup(popupProfileEdit));
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));
popupProfileEditForm.addEventListener('submit', submitProfileEditForm);

addCardButton.addEventListener('click', () => openPopup(popupPlaceAdd));
popupPlaceCloseButton.addEventListener('click', () => resetPlacePopup(popupPlaceAdd));

popupInputPlaceName.addEventListener('focus', () => changeInputValue(popupInputPlaceName));
popupInputPlaceLink.addEventListener('focus', () => changeInputValue(popupInputPlaceLink));