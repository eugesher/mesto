import "./index.css";
import {
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
import { PopupConfirm } from "../components/PopupConfirm.js";

let userId;

// api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "923e2964-e93c-462a-8318-e3004cff48bd",
    "Content-Type": "application/json",
  },
});

// section
const places = new Section((data) => {
  const card = createCard(data);
  places.addItem(card.generateCard());
}, placesGrid);

// user info
const userInfo = new UserInfo({
  profileNameElement: profileInfoElements.name,
  profileAboutElement: profileInfoElements.about,
});

// popups
const popupProfileEdit = new PopupWithForm({
  popupSelector: popupSelectors.profileEdit,
  handleFormSubmit: () => {
    api
      .patchUserInfo({
        name: inputProfileName.value,
        about: inputProfileAbout.value,
      }).then(data => {
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
    api
      .postCard({
        name: inputPlaceName.value,
        link: inputPlaceLink.value,
      })
      .then((data) => {
        const card = createCard(data);
        places.addItem(card.generateCard(), true);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
const popupPhotoView = new PopupWithImage(".popup_type_photo-view");
const popupCardDelete = new PopupConfirm(popupSelectors.confirm);

// validation
const profileEditFormValidator = new FormValidator(profileEditForm, validationSettings);
const placeAddFormValidator = new FormValidator(placeAddForm, validationSettings);

// functions
function createCard(data) {
  return new Card(data, "#card-template", userId, { handleCardClick: () => {
      const imageName = evt.target.getAttribute("alt");
      const imageLink = evt.target.getAttribute("src");
      popupPhotoView.open(imageName, imageLink);
    }, handleDeleteButton: (cardId) =>  {
      popupCardDelete.setSubmitAction(() => {
        api
          .deleteCard(cardId).then(() => {
          card.remove();
        })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            popupCardDelete.close();
          });
      });
      popupCardDelete.open();
    }});
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
      userId = data[0]._id;
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
popupCardDelete.setEventListeners();

profileInfoElements.editButton.addEventListener("click", initProfilePopup);
newCardButton.addEventListener("click", initPlacePopup);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();
