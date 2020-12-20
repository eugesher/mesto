import { initialCards, validationSettings } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";

const popupProfileEdit = new PopupWithForm({
  popupSelector: ".popup_type_profile-edit",
  handleFormSubmit: () => {
    profileName.textContent = popupInputProfileName.value;
    profileAbout.textContent = popupInputProfileAbout.value;
    popupProfileEdit.close();
  }
});
const popupPlaceAdd = new PopupWithForm({
  popupSelector: ".popup_type_add-place",
  handleFormSubmit: () => {
    const cardData = {
      name: popupInputPlaceName.value,
      link: popupInputPlaceLink.value,
    };
    const card = new Card(cardData, "#card-template", popupPhotoView);
    placesGrid.prepend(card.generateCard());
    resetPlacePopup();
  }
});

const forms = document.forms;
const popupProfileEditForm = forms.profileEdit;
const popupInputProfileName = popupProfileEditForm.querySelector(".popup__input_type_profile-name");
const popupInputProfileAbout = popupProfileEditForm.querySelector(".popup__input_type_profile-about");
const popupPlaceAddForm = forms.placeAdd;
const popupInputPlaceName = popupPlaceAddForm.querySelector(".popup__input_type_place-name");
const popupInputPlaceLink = popupPlaceAddForm.querySelector(".popup__input_type_place-link");

const popupPhotoView = new PopupWithImage(".popup_type_photo-view");
const newCardButton = document.querySelector(".profile__add-button");
const profileInfo = document.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");
const placesGrid = document.querySelector(".places__grid");

const profileEditFormValidator = new FormValidator(popupProfileEditForm, validationSettings);
const placeAddFormValidator = new FormValidator(popupPlaceAddForm, validationSettings);

function initProfilePopup() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
  profileEditFormValidator.resetValidation();
  popupProfileEdit.open();
}

function initPlacePopup() {
  placeAddFormValidator.resetValidation();
  popupPlaceAdd.open();
}

function resetPlacePopup() {
  popupInputPlaceName.value = "";
  popupInputPlaceLink.value = "";
  popupPlaceAdd.close();
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", popupPhotoView);
  placesGrid.append(card.generateCard());
});

profileEditButton.addEventListener("click", initProfilePopup);
newCardButton.addEventListener("click", initPlacePopup);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();