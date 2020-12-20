export const initialCards = [
  {
    name: "Алтайский край",
    link: new URL('../images/alex-kotomanov-pCgQBi-wvTU-unsplash.jpg', import.meta.url),  },
  {
    name: "Байкал",
    link: new URL('../images/sergey-pesterev-GYIxdUFEkX8-unsplash.jpg', import.meta.url),
  },
  {
    name: "Москва",
    link: new URL('../images/sasha-yudaev-0I_6c7fmQ-8-unsplash.jpg', import.meta.url),
  },
  {
    name: "Карелия",
    link: new URL('../images/tetiana-shyshkina-m9EnS-BqnKM-unsplash.jpg', import.meta.url),
  },
  {
    name: "Камчатка",
    link: new URL('../images/daniil-silantev-WaRAHxoBVIo-unsplash.jpg', import.meta.url),
  },
  {
    name: "Санкт-Петербург",
    link: new URL('../images/jean-estrella-sBIAMCBx2jQ-unsplash.jpg', import.meta.url),
  },
];

export const popupSelectors = {
  profileEdit: ".popup_type_profile-edit",
  placeAdd: ".popup_type_add-place",
};

export const validationSettings = {
  formListSelector: ".popup__container:not(.popup__container_type_image)",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  errorActiveClass: ".popup__input-error_active",
  inputValueInvalidClass: "popup__input_invalid",
  errorPostfix: "-error",
};

export const placesGrid = document.querySelector(".places__grid");

const profileInfo = document.querySelector(".profile__info");
export const profileInfoElements = {
  editButton: profileInfo.querySelector(".profile__edit-button"),
  name: profileInfo.querySelector(".profile__name"),
  about: profileInfo.querySelector(".profile__about"),
};

const forms = document.forms;
export const profileEditForm = forms.profileEdit;
export const inputProfileName = profileEditForm.querySelector(".popup__input_type_profile-name");
export const inputProfileAbout = profileEditForm.querySelector(".popup__input_type_profile-about");

export const placeAddForm = forms.placeAdd;
export const inputPlaceName = placeAddForm.querySelector(".popup__input_type_place-name");
export const inputPlaceLink = placeAddForm.querySelector(".popup__input_type_place-link");

export const newCardButton = document.querySelector(".profile__add-button");
