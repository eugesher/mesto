export const popupSelectors = {
  profileEdit: ".popup_type_profile-edit",
  placeAdd: ".popup_type_add-place",
  avatarUpdate: ".popup_type_avatar-update",
  photoView: ".popup_type_photo-view",
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

const profileElement = document.querySelector(".profile");
export const profileElements = {
  editButton: profileElement.querySelector(".profile__edit-button"),
  name: profileElement.querySelector(".profile__name"),
  about: profileElement.querySelector(".profile__about"),
  avatar: profileElement.querySelector(".profile__avatar")
};

export const savingMessage = "Сохранение...";

const forms = document.forms;
export const profileEditForm = forms.profileEdit;
export const inputProfileName = profileEditForm.querySelector(".popup__input_type_profile-name");
export const inputProfileAbout = profileEditForm.querySelector(".popup__input_type_profile-about");

export const placeAddForm = forms.placeAdd;

export const avatarUpdateForm = forms.avatarUpdate;

export const newCardButton = document.querySelector(".profile__add-button");
