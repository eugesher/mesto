import { initialCards, validationSettings } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {Popup} from "./Popup.js";

const popupProfileEdit = new Popup(".popup_type_profile-edit");
const popupPlaceAdd = new Popup(".popup_type_add-place");

const forms = document.forms;
const popupProfileEditForm = forms.profileEdit;
const popupInputProfileName = popupProfileEditForm.querySelector(".popup__input_type_profile-name");
const popupInputProfileAbout = popupProfileEditForm.querySelector(".popup__input_type_profile-about");
const popupPlaceAddForm = forms.placeAdd;
const popupInputPlaceName = popupPlaceAddForm.querySelector(".popup__input_type_place-name");
const popupInputPlaceLink = popupPlaceAddForm.querySelector(".popup__input_type_place-link");

const popupPhotoView = new Popup(".popup_type_photo-view");
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

function submitProfileEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;
  popupProfileEdit.close();
}

function submitPlaceAddForm(evt) {
  evt.preventDefault();
  const cardData = {
    name: popupInputPlaceName.value,
    link: popupInputPlaceLink.value,
  };
  const card = new Card(cardData, "#card-template", popupPhotoView);
  placesGrid.prepend(card.generateCard());
  resetPlacePopup();
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", popupPhotoView);
  placesGrid.append(card.generateCard());
});

profileEditButton.addEventListener("click", initProfilePopup);
popupProfileEditForm.addEventListener("submit", submitProfileEditForm);
newCardButton.addEventListener("click", initPlacePopup);
popupPlaceAddForm.addEventListener("submit", submitPlaceAddForm);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();