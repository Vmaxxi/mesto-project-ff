
 import { validationConfig } from "./config";
    
//Показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(validationConfig.errorClass);
}

//Скрываем ошибку

const hideInputError = (formElement, inputElement, validationConfig) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    formError.classList.remove(validationConfig.errorClass);
    formError.textContent = "";
}

//Проверяем валидацию
const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity('');
    }
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement , validationConfig);
    }
};

//Смотрим все поля в форме
const invalidInput = (inputList) => inputList.some(inputElement => !inputElement.validity.valid);

//Работаем с кнопкой
//Активная или не активаня кнопка при просмотре масива полей
const toggleButton = (inputList, buttonElement, validationConfig) => {
    if (invalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
} else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
}
};
//Слушитель для всех форм
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButton(inputList, buttonElement, validationConfig);
// Перебераем массив полученного
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButton(inputList, buttonElement, validationConfig);
        });
    });
};

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
    });
    toggleButton(inputList, buttonElement, validationConfig);
  };
  
  const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formList.forEach((formElement) => setEventListeners(formElement, validationConfig));
}

     export {
    clearValidation,
    enableValidation
  };