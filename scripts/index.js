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

const popupProfilePopup = document.querySelector('.popup_type_profile');
const profileForm = popupProfilePopup.querySelector('#profile-form');
const profileNameInput = profileForm.querySelector('#name');
const profileInfoInput = profileForm.querySelector('#description');

const addItemPopup = document.querySelector('.popup_type_card');
const addItemForm = addItemPopup.querySelector('#add-item-form');
const titleInput = addItemForm.querySelector('#title'); 
const linkInput = addItemForm.querySelector('#link');
const addItemButton = addItemForm.querySelector('.popup__button');

const preview = document.querySelector('#preview');
const popup = preview.closest('.popup');
const previewImage = preview.querySelector('.preview__image');
const previewText = preview.querySelector('.preview__text');

const closePopupButtons = document.querySelectorAll('.popup__close');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);
  popup.addEventListener('click', closePopupByOverlay);
}

function closePopup(popup) {
  document.removeEventListener('keyup', closePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlay);
  popup.closest('.popup').classList.remove('popup_opened');
  addItemForm.reset();
}

function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) closePopup(evt.target);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function showProfileForm() {
  profileNameInput.value = nameProfile.textContent;
  profileInfoInput.value = jobProfile.textContent;

  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });

  profileNameInput.dispatchEvent(event);
  profileInfoInput.dispatchEvent(event);
  openPopup(popupProfilePopup);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = profileNameInput.value;
  jobProfile.textContent = profileInfoInput.value;

  closePopup(popupProfilePopup);
}

function showAddItemForm() {
  disableButton(addItemButton, 'popup__button_disabled');
  openPopup(addItemPopup);
}

function addCardItemSubmitHandler(evt) {
  evt.preventDefault();
  const cardItem = createCardItem(titleInput.value, linkInput.value);
  
  cardList.prepend(cardItem);
  addItemForm.reset();
  closePopup(addItemPopup);
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

  cardItemImage.addEventListener('click',  () => showImage(link, name));
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

function showImage(link, name) {
  previewImage.src =link
  previewImage.alt = name
  previewText.textContent = name

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