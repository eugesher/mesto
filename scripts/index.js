class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");

    this._setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");

    this._cardImage.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      const popupImage = popupPhotoView.querySelector(".popup__image");
      const popupImageCaption = popupPhotoView.querySelector(
        ".popup__image-caption"
      );
      popupImage.setAttribute("src", eventTarget.getAttribute("src"));
      popupImage.setAttribute("alt", eventTarget.getAttribute("alt"));
      popupImageCaption.textContent = this._name;
      openPopup(popupPhotoView);
    });
    this._cardLikeButton.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like-button_active");
    });
    this._cardDeleteButton.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      eventTarget.closest(".card").remove();
    });
  }
}

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

function handlePopupOverlayMousedown(evt) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("popup")) {
    closePopup(eventTarget);
  }
}

function handleEscapeKeydown(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (popupOpened && evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.addEventListener("mousedown", handlePopupOverlayMousedown);
  document.addEventListener("keydown", handleEscapeKeydown);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.removeEventListener("mousedown", handlePopupOverlayMousedown);
  document.removeEventListener("keydown", handleEscapeKeydown);
  popup.classList.remove("popup_opened");
}

function initProfilePopup() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;

  resetValidation(popupProfileEditForm);
  openPopup(popupProfileEdit);
}

function initPlacePopup() {
  resetValidation(popupPlaceAddForm);
  openPopup(popupPlaceAdd);
}

function resetPlacePopup() {
  [popupInputPlaceName, popupInputPlaceLink].forEach((inputField) => {
    inputField.changed = false;
    inputField.classList.add("popup__input_empty");
  });

  popupInputPlaceName.value = placeNamePlaceholder;
  popupInputPlaceLink.value = placeLinkPlaceholder;

  closePopup(popupPlaceAdd);
}

function removePlaceholder(inputField) {
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

  const cardData = {
    name: popupInputPlaceName.value,
    link: popupInputPlaceLink.value,
  };
  const card = new Card(cardData, "#card-template");

  placesGrid.prepend(card.generateCard());
  resetPlacePopup();
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  placesGrid.append(card.generateCard());
});

profileEditButton.addEventListener("click", initProfilePopup);
popupProfileEditForm.addEventListener("submit", submitProfileEditForm);
popupProfileCloseButton.addEventListener("click", () =>
  closePopup(popupProfileEdit)
);
newCardButton.addEventListener("click", initPlacePopup);
popupPlaceAddForm.addEventListener("submit", submitPlaceAddForm);
popupPlaceCloseButton.addEventListener("click", () =>
  resetPlacePopup(popupPlaceAdd)
);
popupPhotoViewCloseButton.addEventListener("click", () =>
  closePopup(popupPhotoView)
);
[popupInputPlaceName, popupInputPlaceLink].forEach((inputField) => {
  inputField.addEventListener("focus", () => {
    removePlaceholder(inputField);
  });
});
