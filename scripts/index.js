let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');

function open() {
  popup.classList.add('popup_opened');
  buttonClose.addEventListener('click', close);
}

function close() {
  popup.classList.remove('popup_opened');
  buttonClose.removeEventListener('click', close);
}

buttonEdit.addEventListener('click', open);

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name')
let jobInput = formElement.querySelector('#description')

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameProfile = document.querySelector('.profile__header');
    let jobProfile = document.querySelector('.profile__description');
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    close();
}

formElement.addEventListener('submit', formSubmitHandler);
