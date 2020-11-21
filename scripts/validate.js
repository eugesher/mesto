const profileNameError = document.querySelector(`.${popupInputProfileName.id}-error`);
const profileAboutError = document.querySelector(`.${popupInputProfileAbout.id}-error`);
const placeNameError = document.querySelector(`.${popupInputPlaceName.id}-error`);
const placeAboutError = document.querySelector(`.${popupInputPlaceLink.id}-error`);

function showInputError(inputField, errorMessage) {
  const inputError = inputField.closest('.popup__input-container').querySelector(`.${inputField.id}-error`);
  inputField.classList.add('popup__input_condition_error');
  inputError.classList.add('popup__input-error_active');
  inputError.textContent = errorMessage;
}

function hideInputError(inputField) {
  const inputError = inputField.closest('.popup__input-container').querySelector(`.${inputField.id}-error`);
  inputField.classList.remove('popup__input_condition_error');
  inputError.classList.remove('popup__input-error_active');
  inputError.textContent = emptyString;
}

function isValid(inputField) {
  if (!inputField.validity.valid) {
    showInputError(inputField, inputField.validationMessage);
  } else {
    hideInputError(inputField);
  }
}

popupInputProfileName.addEventListener('input', () => isValid(popupInputProfileName));
popupInputProfileAbout.addEventListener('input', () => isValid(popupInputProfileAbout));
popupInputPlaceName.addEventListener('input', () => isValid(popupInputPlaceName));
popupInputPlaceLink.addEventListener('input', () => isValid(popupInputPlaceLink));