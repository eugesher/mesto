const placeNamePlaceholder = "Название";
const placeLinkPlaceholder = "Ссылка на картинку";

const initialCards = [
  {
    name: "Алтайский край",
    link: "./images/alex-kotomanov-pCgQBi-wvTU-unsplash.jpg",
  },
  {
    name: "Байкал",
    link: "./images/sergey-pesterev-GYIxdUFEkX8-unsplash.jpg",
  },
  {
    name: "Москва",
    link: "./images/sasha-yudaev-0I_6c7fmQ-8-unsplash.jpg",
  },
  {
    name: "Карелия",
    link: "./images/tetiana-shyshkina-m9EnS-BqnKM-unsplash.jpg",
  },
  {
    name: "Камчатка",
    link: "./images/daniil-silantev-WaRAHxoBVIo-unsplash.jpg",
  },
  {
    name: "Санкт-Петербург",
    link: "./images/jean-estrella-sBIAMCBx2jQ-unsplash.jpg",
  },
];

const validationSettings = {
  formListSelector: ".popup__container:not(.popup__container_type_image)",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  errorActiveClass: ".popup__input-error_active",
  inputValueInvalidClass: "popup__input_invalid",
  errorSuffix: "-error",
};
