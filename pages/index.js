import { initialCards, validationSettings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import {
  newCardButton,
  popupInputPlaceLink,
  popupInputPlaceName,
  popupInputProfileAbout,
  popupInputProfileName, popupPlaceAddForm, popupProfileEditForm,
  profileAbout,
  profileEditButton,
  profileName
} from "../utils/constants.js";

const placesGrid = document.querySelector(".places__grid");

const places = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card({ data: cardData, handleCardClick }, "#card-template");
      const cardElement = card.generateCard();
      places.addItem(cardElement);
    },
  },
  placesGrid
);

const userInfo = new UserInfo({ profileNameElement: profileName, profileAboutElement: profileAbout });

const popupProfileEdit = new PopupWithForm({
  popupSelector: ".popup_type_profile-edit",
  handleFormSubmit: () => {
    userInfo.setUserInfo({
      name: popupInputProfileName.value,
      about: popupInputProfileAbout.value,
    });
    popupProfileEdit.close();
  },
});
const popupPlaceAdd = new PopupWithForm({
  popupSelector: ".popup_type_add-place",
  handleFormSubmit: () => {
    const cardData = {
      name: popupInputPlaceName.value,
      link: popupInputPlaceLink.value,
    };
    const card = new Card({ data: cardData, handleCardClick }, "#card-template");
    places.addItem(card.generateCard());
    resetPlacePopup();
  },
});
const popupPhotoView = new PopupWithImage(".popup_type_photo-view");

const profileEditFormValidator = new FormValidator(popupProfileEditForm, validationSettings);
const placeAddFormValidator = new FormValidator(popupPlaceAddForm, validationSettings);

function initProfilePopup() {
  const userData = userInfo.getUserInfo();
  popupInputProfileName.value = userData.name;
  popupInputProfileAbout.value = userData.about;
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

function handleCardClick(evt) {
  const imageName = evt.target.getAttribute("alt");
  const imageLink = evt.target.getAttribute("src");
  popupPhotoView.open(imageName, imageLink);
}

places.renderDefaultItems();
popupProfileEdit.setEventListeners();
popupPlaceAdd.setEventListeners();
popupPhotoView.setEventListeners();

profileEditButton.addEventListener("click", initProfilePopup);
newCardButton.addEventListener("click", initPlacePopup);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();
