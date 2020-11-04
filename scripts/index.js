const popup = document.querySelector('.popup');
const popupProfileEditForm = popup.querySelector('.popup__container')
const popupCloseButton = popupProfileEditForm.querySelector('.popup__close-button');
const popupInputProfileName = popupProfileEditForm.querySelector('.popup__input_content_profile-name');
const popupInputProfileAbout = popupProfileEditForm.querySelector('.popup__input_content_profile-about');

const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

const cardsGrid = document.querySelector('.places__grid');
const cardTemplate = document.querySelector('#card-template').content;
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

function addCard(object) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = object.name;
  card.querySelector('.card__image').setAttribute('src', object.link);
  card.querySelector('.card__image').setAttribute('alt', object.name);

  cardsGrid.append(card);
}

initialCards.forEach(addCard);


profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popupProfileEditForm.addEventListener('submit', submitProfileEditForm);