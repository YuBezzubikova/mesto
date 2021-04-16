let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#description');
let nameProfile = document.querySelector('.profile__header');
let jobProfile = document.querySelector('.profile__description');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  buttonClose.addEventListener('click', closePopup);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  buttonClose.removeEventListener('click', closePopup);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
}

buttonEdit.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
