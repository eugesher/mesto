const popupProfileEdit = document.querySelector(".popup_type_profile-edit");
const popupPlaceAdd = document.querySelector(".popup_type_add-place");

const forms = document.forms;

const popupProfileEditForm = forms.profileEdit;
const popupInputProfileName = popupProfileEditForm.querySelector(
  ".popup__input_type_profile-name"
);
const popupInputProfileAbout = popupProfileEditForm.querySelector(
  ".popup__input_type_profile-about"
);
const popupProfileCloseButton = popupProfileEdit.querySelector(
  ".popup__close-button"
);

const popupPlaceAddForm = forms.placeAdd;
const popupInputPlaceName = popupPlaceAddForm.querySelector(
  ".popup__input_type_place-name"
);
const popupInputPlaceLink = popupPlaceAddForm.querySelector(
  ".popup__input_type_place-link"
);
const popupPlaceCloseButton = popupPlaceAdd.querySelector(
  ".popup__close-button"
);

const popupPhotoView = document.querySelector(".popup_type_photo-view");
const popupPhotoViewCloseButton = popupPhotoView.querySelector(
  ".popup__close-button"
);

const newCardButton = document.querySelector(".profile__add-button");

const profileInfo = document.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

const placesGrid = document.querySelector(".places__grid");
const placeCardTemplate = document.querySelector("#card-template").content;

function openPopup(popup) {
  const form = popup.querySelector(".popup__container");
  resetValidation(form);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function initProfilePopup(popup) {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;

  openPopup(popup);
}

function resetPlacePopup(popup) {
  [popupInputPlaceName, popupInputPlaceLink].forEach((inputField) => {
    inputField.changed = false;
    inputField.classList.add("popup__input_empty");
  });

  popupInputPlaceName.value = placeNameDefaultValue;
  popupInputPlaceLink.value = placeLinkDefaultValue;

  closePopup(popup);
}

function emptyInputValue(inputField) {
  if (!inputField.changed) {
    inputField.changed = true;
    inputField.value = "";
    inputField.classList.remove("popup__input_empty");
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

  placesGrid.prepend(createCard(cardObject));
  resetPlacePopup(popupPlaceAdd);
}

function createCard(cardObject) {
  const card = placeCardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardTitle.textContent = cardObject.name;
  cardImage.setAttribute('src', cardObject.link);
  cardImage.setAttribute('alt', cardObject.name);
  cardImage.addEventListener('click', evt => {
    const eventTarget = evt.target;
    popupPhotoView.querySelector('.popup__image').setAttribute('src', eventTarget.getAttribute('src'));
    popupPhotoView.querySelector('.popup__image').setAttribute('alt', eventTarget.getAttribute('alt'));
    popupPhotoView.querySelector('.popup__image-caption').textContent = cardObject.name;
    openPopup(popupPhotoView);
  });
  cardLikeButton.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });
  cardDeleteButton.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  });

  return card;
}

initialCards.forEach((cardObject) => placesGrid.append(createCard(cardObject)));

profileEditButton.addEventListener("click", () =>
  initProfilePopup(popupProfileEdit)
);
popupProfileEditForm.addEventListener("submit", submitProfileEditForm);
popupProfileCloseButton.addEventListener("click", () =>
  closePopup(popupProfileEdit)
);

newCardButton.addEventListener("click", () => openPopup(popupPlaceAdd));
popupPlaceAddForm.addEventListener("submit", submitPlaceAddForm);
popupPlaceCloseButton.addEventListener("click", () =>
  resetPlacePopup(popupPlaceAdd)
);

popupPhotoViewCloseButton.addEventListener("click", () =>
  closePopup(popupPhotoView)
);

popupInputPlaceName.addEventListener("focus", () =>
  emptyInputValue(popupInputPlaceName)
);
popupInputPlaceLink.addEventListener("focus", () =>
  emptyInputValue(popupInputPlaceLink)
);

[popupProfileEdit, popupPlaceAdd, popupPhotoView].forEach((popup) => {
  addEventListener("mousedown", (evt) => {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains("popup")) {
      closePopup(popup);
    }
  });

  addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
});
