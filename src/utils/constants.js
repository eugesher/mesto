export const popupSelectors = {
  profileEdit: ".popup_type_profile-edit",
  placeAdd: ".popup_type_add-place",
  confirm: ".popup_type_confirm"
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
