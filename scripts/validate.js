function showInputError(form, inputField, errorMessage) {
  const inputError = form.querySelector(`.${inputField.id}-error`);
  inputField.classList.add('popup__input_condition_error');
  inputError.classList.add('popup__input-error_active');
  inputError.textContent = errorMessage;
}

function hideInputError(form, inputField) {
  const inputError = form.querySelector(`.${inputField.id}-error`);
  inputField.classList.remove('popup__input_condition_error');
  inputError.classList.remove('popup__input-error_active');
  inputError.textContent = emptyString;
}

function isValid(form, inputField) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage);
  } else {
    hideInputError(form, inputField);
  }
}

function setEventListeners(form){
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.popup__submit-button');
  console.log(submitButton);

  toggleButtonState(inputList, submitButton);

  inputList.forEach(inputField => {
    inputField.addEventListener('input', () => {
      isValid(form, inputField);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function enableValidation() {
  Array.from(document.querySelectorAll('.popup__container')).forEach((form) => {
    setEventListeners(form);
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

enableValidation();