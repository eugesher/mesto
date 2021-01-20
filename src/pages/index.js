import "./index.css";
import {
  inputProfileAbout,
  inputProfileName,
  newCardButton,
  placeAddForm,
  placesGrid,
  popupSelectors,
  profileEditForm,
  profileElements,
  validationSettings,
  avatarUpdateForm,
  submitButtonsText,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js";

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
  places.addItem(card.generate());
}, placesGrid);

// user info
const userInfo = new UserInfo({
  profileNameElement: profileElements.name,
  profileAboutElement: profileElements.about,
  profileAvatarLinkElement: profileElements.avatar,
});

// popups
const popupProfileEdit = new PopupWithForm({
  popupSelector: popupSelectors.profileEdit,
  handleFormSubmit: (inputData) => {
    popupProfileEdit.setButtonText(submitButtonsText.saving);
    api
      .patchUserInfo(inputData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        popupProfileEdit.setButtonText(submitButtonsText.profileEdit);
      });
  },
});

const popupPlaceAdd = new PopupWithForm({
  popupSelector: popupSelectors.placeAdd,
  handleFormSubmit: (inputData) => {
    popupPlaceAdd.setButtonText(submitButtonsText.saving);
    api
      .postCard(inputData)
      .then((data) => {
        const card = createCard(data);
        places.addItem(card.generate(), true);
      })
      .catch((e) => {
        console.log(e);
      }).finally(() => {
      popupProfileEdit.setButtonText(submitButtonsText.placeAdd);
    });
  },
});
const popupAvatarUpdate = new PopupWithForm({
  popupSelector: popupSelectors.avatarUpdate,
  handleFormSubmit: (inputData) => {
    popupAvatarUpdate.setButtonText(submitButtonsText.saving);
    api.patchUserAvatar(inputData)
      .then((data => {
      userInfo.setUserInfo(data);
    }))
      .catch((e) => {
      console.log(e);
    })
      .finally(() => {
        popupProfileEdit.setButtonText(submitButtonsText.avatarUpdate);
      });
  }
})

const popupPhotoView = new PopupWithImage(popupSelectors.photoView);
const popupCardDelete = new PopupConfirm(popupSelectors.confirm);

// validation
const profileEditFormValidator = new FormValidator(profileEditForm, validationSettings);
const placeAddFormValidator = new FormValidator(placeAddForm, validationSettings);
const avatarUpdateFormValidator = new FormValidator(avatarUpdateForm, validationSettings);


// functions
function createCard(data) {
  const card = new Card(data, "#card-template", userId, {
    handleCardClick: (evt) => {
      const imageName = evt.target.getAttribute("alt");
      const imageLink = evt.target.getAttribute("src");
      popupPhotoView.open(imageName, imageLink);
    },
    handleDeleteButton: (cardId) => {
      popupCardDelete.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            popupCardDelete._close();
          });
      });
      popupCardDelete.open();
    },
    handleLikeButton: (cardId, isLiked) => {
      if (isLiked) {
        api.deleteCardLike(cardId).then((data) => {
          card.removeLike(data.likes.length);
        })
      } else {
        api.putCardLike(cardId).then((data) => {
          card.like(data.likes.length);
        })
      }
    }
  });
  return card;
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

function initAvatarPopup() {
  avatarUpdateFormValidator.resetValidation();
  popupAvatarUpdate.open();
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
popupAvatarUpdate.setEventListeners();

profileElements.editButton.addEventListener("click", initProfilePopup);
profileElements.avatar.addEventListener("click", initAvatarPopup);
newCardButton.addEventListener("click", initPlacePopup);

profileEditFormValidator.enableValidation();
placeAddFormValidator.enableValidation();
avatarUpdateFormValidator.enableValidation();
