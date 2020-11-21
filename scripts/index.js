const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container');
const popupInputProfileName = popupProfileEditForm.querySelector('.popup__input_type_profile-name');
const popupInputProfileAbout = popupProfileEditForm.querySelector('.popup__input_type_profile-about');
const popupProfileCloseButton = popupProfileEdit.querySelector('.popup__close-button');

const popupPlaceAdd = document.querySelector('.popup_type_add-place');
const popupPlaceAddForm = popupPlaceAdd.querySelector('.popup__container');
const popupInputPlaceName = popupPlaceAddForm.querySelector('.popup__input_type_place-name');
const popupInputPlaceLink = popupPlaceAddForm.querySelector('.popup__input_type_place-link');
const popupPlaceCloseButton = popupPlaceAdd.querySelector('.popup__close-button');

const popupPhotoView = document.querySelector('.popup_type_photo-view');
const popupPhotoViewCloseButton = popupPhotoView.querySelector('.popup__close-button');

const newCardButton = document.querySelector('.profile__add-button');

const placeNameDefaultValue = 'Название';
const placeLinkDefaultValue = 'Ссылка на картинку';

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

function emptyInputValue(inputField) {
  if (!inputField.changed) {
    inputField.changed = true;
    inputField.value = '';
    inputField.classList.remove('popup__input_empty');
  }
}

function submitProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;

  closePopup(popupProfileEdit);
}

function submitPlaceAddForm(evt) {
  evt.preventDefault();

  const cardObject = {
    name: popupInputPlaceName.value,
    link: popupInputPlaceLink.value,
  };

  placesGrid.prepend(newCard(cardObject));
  resetPlacePopup(popupPlaceAdd);
}

function newCard(cardObject) {
  const card = placeCardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = cardObject.name;
  card.querySelector('.card__image').setAttribute('src', cardObject.link);
  card.querySelector('.card__image').setAttribute('alt', cardObject.name);
  card.querySelector('.card__image').addEventListener('click', evt => {
    const eventTarget = evt.target;
    popupPhotoView.querySelector('.popup__image').setAttribute('src', eventTarget.getAttribute('src'));
    popupPhotoView.querySelector('.popup__image').setAttribute('alt', eventTarget.getAttribute('alt'));
    popupPhotoView.querySelector('.popup__image-caption').textContent = cardObject.name;
    openPopup(popupPhotoView);
  });
  card.querySelector('.card__like-button').addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });
  card.querySelector('.card__delete-button').addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  });

  return card;
}


initialCards.forEach(cardObject => placesGrid.append(newCard(cardObject)));

profileEditButton.addEventListener('click', () => initProfilePopup(popupProfileEdit));
popupProfileEditForm.addEventListener('submit', submitProfileEditForm);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));

newCardButton.addEventListener('click', () => openPopup(popupPlaceAdd));
popupPlaceAddForm.addEventListener('submit', submitPlaceAddForm);
popupPlaceCloseButton.addEventListener('click', () => resetPlacePopup(popupPlaceAdd));

popupPhotoViewCloseButton.addEventListener('click', () => closePopup(popupPhotoView));

popupInputPlaceName.addEventListener('focus', () => emptyInputValue(popupInputPlaceName));
popupInputPlaceLink.addEventListener('focus', () => emptyInputValue(popupInputPlaceLink));

[popupProfileEdit, popupPlaceAdd, popupPhotoView].forEach(popup => {
  addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
})
