import { initialCards, placeLinkPlaceholder, placeNamePlaceholder, validationSettings } from "./data.js";
import { openPopup, closePopup } from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupProfileEdit = document.querySelector(".popup_type_profile-edit");
const popupPlaceAdd = document.querySelector(".popup_type_add-place");

const forms = document.forms;
const popupProfileEditForm = forms.profileEdit;
const popupInputProfileName = popupProfileEditForm.querySelector(".popup__input_type_profile-name");
const popupInputProfileAbout = popupProfileEditForm.querySelector(".popup__input_type_profile-about");
const popupProfileCloseButton = popupProfileEdit.querySelector(".popup__close-button");
const popupPlaceAddForm = forms.placeAdd;
const popupInputPlaceName = popupPlaceAddForm.querySelector(".popup__input_type_place-name");
const popupInputPlaceLink = popupPlaceAddForm.querySelector(".popup__input_type_place-link");
const popupPlaceCloseButton = popupPlaceAdd.querySelector(".popup__close-button");

const popupPhotoView = document.querySelector(".popup_type_photo-view");
const popupPhotoViewCloseButton = popupPhotoView.querySelector(".popup__close-button");
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
  openPopup(popupProfileEdit);
}

function initPlacePopup() {
  placeAddFormValidator.resetValidation();
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
popupProfileCloseButton.addEventListener("click", () => closePopup(popupProfileEdit));
newCardButton.addEventListener("click", initPlacePopup);
popupPlaceAddForm.addEventListener("submit", submitPlaceAddForm);
popupPlaceCloseButton.addEventListener("click", () => resetPlacePopup(popupPlaceAdd));
popupPhotoViewCloseButton.addEventListener("click", () => closePopup(popupPhotoView));
[popupInputPlaceName, popupInputPlaceLink].forEach((inputField) => {
  inputField.addEventListener("focus", () => {
    removePlaceholder(inputField);
  });
});
profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();
