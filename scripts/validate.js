const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupInputProfileName = popupProfileEdit.querySelector('.popup__input_type_profile-name');
const popupInputProfileAbout = popupProfileEdit.querySelector('.popup__input_type_profile-about');

const popupPlaceAdd = document.querySelector('.popup_type_add-place');
const popupInputPlaceName = popupPlaceAdd.querySelector('.popup__input_type_place-name');
const popupInputPlaceLink = popupPlaceAdd.querySelector('.popup__input_type_place-link');

popupInputProfileName.addEventListener('input', evt => {
  console.log(evt.target.validity.valid);
})

popupInputProfileAbout.addEventListener('input', evt => {
  console.log(evt.target.validity.valid);
})

popupInputPlaceName.addEventListener('input', evt => {
  console.log(evt.target.validity.valid);
})

popupInputPlaceLink.addEventListener('input', evt => {
  console.log(evt.target.validity.valid);
})