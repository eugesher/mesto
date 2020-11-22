function showInputError(form, inputField, errorMessage) {
  const inputError = form.querySelector(`.${inputField.id}${settings.errorSuffix}`);
  inputField.classList.add(settings.inputValueInvalidClass);
  inputError.classList.add(settings.errorActiveClass);
  inputError.textContent = errorMessage;
}

function hideInputError(form, inputField) {
  const inputError = form.querySelector(`.${inputField.id}${settings.errorSuffix}`);
  inputField.classList.remove(settings.inputValueInvalidClass);
  inputError.classList.remove(settings.errorActiveClass);
  inputError.textContent = '';
}

function isValid(form, inputField) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage, settings);
  } else {
    hideInputError(form, inputField, settings);
  }
}

function setEventListeners(form){
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

function enableValidation() {
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

function resetValidation(form) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputList.forEach(inputField => {
    if (inputField.classList.contains(settings.inputValueInvalidClass)) {
      hideInputError(form, inputField);
    }
  })

  if (hasInvalidInput(inputList)) {
    toggleButtonState(inputList, submitButton)
  }
}

enableValidation(settings = validationSettings);