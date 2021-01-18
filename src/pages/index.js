import "./index.css";
import {
  initialCards,
  validationSettings,
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
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";

// api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "923e2964-e93c-462a-8318-e3004cff48bd",
    "Content-Type": "application/json",
  },
});

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
    const userData = {
      name: inputProfileName.value,
      about: inputProfileAbout.value,
    };
    api
      .patchUserInfo(userData).then(data => {
      userInfo.setUserInfo(data)
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => popupProfileEdit.close());
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
    places.addItem(card.generateCard(), true);
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

function load() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((data) => {
      places.renderItems(data[1]);
      userInfo.setUserInfo(data[0]);
    })
    .catch((e) => {
      console.log(e);
    });
}

// main
load();
popupProfileEdit.setEventListeners();
popupPlaceAdd.setEventListeners();
popupPhotoView.setEventListeners();

profileInfoElements.editButton.addEventListener("click", initProfilePopup);
newCardButton.addEventListener("click", initPlacePopup);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();
