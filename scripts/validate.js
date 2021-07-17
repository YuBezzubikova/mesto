const hideInputError = (config, formElement, inputElement) => {
    const { errorClass,  inputErrorClass } =  config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
};

const showInputError = (config, formElement, inputElement) => {
    const { errorClass,  inputErrorClass } =  config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
};

const checkInputValidity = (config, formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(config, formElement, inputElement);
    } else {
        showInputError(config, formElement, inputElement);
    }
};

const hasInvalidInputList = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
};

const toggleButtonState = (config, buttonElement, inputList) => {
    const { inactiveButtonClass } =  config;
    if (hasInvalidInputList(inputList)) {
        buttonElement.disabled = true
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const setEventListeners = (config, formElement) => {
    const { inputSelector,  submitButtonSelector, ...restConfig } =  config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(config, formElement, inputElement);
            toggleButtonState(config, buttonElement, inputList);
        });
    });

    toggleButtonState(config, buttonElement, inputList);
};

const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(restConfig, formElement);
    });
};