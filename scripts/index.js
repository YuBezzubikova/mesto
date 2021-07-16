const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = document.querySelector('.cards__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonAddCardItem = document.querySelector('.profile__add-button');

const nameProfile = document.querySelector('.profile__header');
const jobProfile = document.querySelector('.profile__description');

const profileForm = document.querySelector('#profile-form');
const addItemForm = document.querySelector('#add-item-form')

const closePopupButtons = document.querySelectorAll('.popup__close');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByOverlay);
}

function closePopup(popup) {
  popup.removeEventListener('click', closePopupByOverlay);
  popup.closest('.popup').classList.remove('popup_opened');
}

function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) closePopup(evt.target);
}

function closePopupByEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (popup && evt.key === 'Escape') {
    closePopup(popup);
  }
}

function showProfileForm() {
  const profileInfo = document.querySelector('.profile__info');
  const profileNameInput = profileForm.querySelector('#name');
  const profileInfoInput = profileForm.querySelector('#description');

  profileNameInput.value = profileInfo.querySelector('.profile__header').textContent;
  profileInfoInput.value = profileInfo.querySelector('.profile__description').textContent;

  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });

  profileNameInput.dispatchEvent(event);
  profileInfoInput.dispatchEvent(event);
  openPopup(profileForm.closest('.popup'));
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = evt.target.querySelector('#name').value;
  jobProfile.textContent = evt.target.querySelector('#description').value;

  closePopup(profileForm.closest('.popup'));
}

function showAddItemForm() {
  const popup = addItemForm.closest('.popup');
  openPopup(popup);
}

function addCardItemSubmitHandler(evt) {
  evt.preventDefault();
  const titleInput = evt.target.querySelector('#title');
  const linkInput = evt.target.querySelector('#link');
  const cardItem = createCardItem(titleInput.value, linkInput.value);
  
  cardList.prepend(cardItem);
  addItemForm.reset();
  closePopup(addItemForm.closest('.popup'));
}

function initCardList() {
  initialCards.forEach(card => {
    cardList.append(createCardItem(card.name, card.link));
  });
}

function createCardItem(name, link) {
  const cardItemTpl = document.querySelector('#cards-item-tpl');

  const cardItem = document.importNode(cardItemTpl.content, true);
  const cardItemImage = cardItem.querySelector('.cards__image');
  const cardItemTitle = cardItem.querySelector('.cards__name');
  const cardItemLikeButton = cardItem.querySelector('.cards__like');
  const cardItemDeleteButton = cardItem.querySelector('.cards__delete');

  cardItemTitle.innerText = name;
  cardItemImage.src = link;
  cardItemImage.alt = name;

  cardItemImage.addEventListener('click', showImage);
  cardItemLikeButton.addEventListener('click', likeCardItem);
  cardItemDeleteButton.addEventListener('click', deleteCardItem);


  return cardItem;
}

function likeCardItem(evt) {
  evt.target.classList.toggle('cards__like_liked');
}

function deleteCardItem(evt) {
  evt.target.closest('.cards__item').remove();
}

function showImage(evt) {
  const preview = document.querySelector('#preview');
  const popup = preview.closest('.popup');
  const previewImage = preview.querySelector('.preview__image');
  const previewText = preview.querySelector('.preview__text');

  previewImage.src = evt.target.src
  previewImage.alt = evt.target.alt
  previewText.textContent = evt.target.alt

  openPopup(popup);
}

profileEditButton.addEventListener('click', showProfileForm);
buttonAddCardItem.addEventListener('click', showAddItemForm);

profileForm.addEventListener('submit', profileFormSubmitHandler)
addItemForm.addEventListener('submit', addCardItemSubmitHandler)

closePopupButtons.forEach((closePopupButton) => {
  closePopupButton.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
})


window.addEventListener('load', initCardList);
document.addEventListener('keyup', (evt) => closePopupByEsc(evt));
enableValidation(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
);