function showInputError(form, inputField, errorMessage, settings) {
  const inputError = form.querySelector(`.${inputField.id}${settings.errorSuffix}`);
  inputField.classList.add(settings.inputValueInvalidClass);
  inputError.classList.add(settings.errorActiveClass);
  inputError.textContent = errorMessage;
}

function hideInputError(form, inputField, settings) {
  const inputError = form.querySelector(`.${inputField.id}${settings.errorSuffix}`);
  inputField.classList.remove(settings.inputValueInvalidClass);
  inputError.classList.remove(settings.errorActiveClass);
  inputError.textContent = '';
}

function isValid(form, inputField, settings) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage, settings);
  } else {
    hideInputError(form, inputField, settings);
  }
}

function setEventListeners(form, settings){
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, submitButton);

  inputList.forEach(inputField => {
    inputField.addEventListener('input', () => {
      isValid(form, inputField, settings);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formListSelector));
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputField) => {
    return !inputField.validity.valid;
  });
}

function toggleButtonState (inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.removeAttribute('disabled');
  }
}

enableValidation({
  formListSelector: '.popup__container:not(.popup__container_type_image)',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  errorActiveClass: '.popup__input-error_active',
  inputValueInvalidClass: 'popup__input_invalid',
  errorSuffix: '-error',
});