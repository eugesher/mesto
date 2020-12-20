import { initialCards, validationSettings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import {
  placesGrid,
  newCardButton,
  inputPlaceLink,
  inputPlaceName,
  inputProfileAbout,
  inputProfileName,
  placeAddForm,
  profileEditForm,
  profileInfoElements,
  popupSelectors,
} from "../utils/constants.js";

// section
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

// user info
const userInfo = new UserInfo({
  profileNameElement: profileInfoElements.name,
  profileAboutElement: profileInfoElements.about,
});

// popups
const popupProfileEdit = new PopupWithForm({
  popupSelector: popupSelectors.profileEdit,
  handleFormSubmit: () => {
    userInfo.setUserInfo({
      name: inputProfileName.value,
      about: inputProfileAbout.value,
    });
    popupProfileEdit.close();
  },
});
const popupPlaceAdd = new PopupWithForm({
  popupSelector: popupSelectors.placeAdd,
  handleFormSubmit: () => {
    const cardData = {
      name: inputPlaceName.value,
      link: inputPlaceLink.value,
    };
    const card = new Card({ data: cardData, handleCardClick }, "#card-template");
    places.addItem(card.generateCard());
    popupPlaceAdd.close();
  },
});
const popupPhotoView = new PopupWithImage(".popup_type_photo-view");

// validation
const profileEditFormValidator = new FormValidator(profileEditForm, validationSettings);
const placeAddFormValidator = new FormValidator(placeAddForm, validationSettings);

// functions
function handleCardClick(evt) {
  const imageName = evt.target.getAttribute("alt");
  const imageLink = evt.target.getAttribute("src");
  popupPhotoView.open(imageName, imageLink);
}

function initProfilePopup() {
  const userData = userInfo.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileAbout.value = userData.about;
  profileEditFormValidator.resetValidation();
  popupProfileEdit.open();
}

function initPlacePopup() {
  placeAddFormValidator.resetValidation();
  popupPlaceAdd.open();
}

// main
places.renderDefaultItems();
popupProfileEdit.setEventListeners();
popupPlaceAdd.setEventListeners();
popupPhotoView.setEventListeners();

profileInfoElements.editButton.addEventListener("click", initProfilePopup);
newCardButton.addEventListener("click", initPlacePopup);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();
