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

function openPopup(innerElement) {
  const popup = document.querySelector('.popup');
  const closeButton = popup.querySelector('.popup__close');

  const popupContent = popup.querySelector('.popup__content');
  popupContent.innerHTML = '';
  popupContent.append(innerElement);

  closeButton.addEventListener('click', closePopup);
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const popup = evt.target.closest('.popup');

  popup.classList.remove('popup_opened');
  evt.target.removeEventListener('click', closePopup);
}

function showProfileForm() {
  const profileFormTpl = document.querySelector('#profile-form');
  const profileHtmlFragment = profileFormTpl.content.cloneNode(true);
  const profileFrom = profileHtmlFragment.querySelector('.popup__form');
  const profileInfo = document.querySelector('.profile__info');

  profileHtmlFragment.querySelector('#name').value = profileInfo.querySelector('.profile__header').textContent;
  profileHtmlFragment.querySelector('#description').value = profileInfo.querySelector('.profile__description').textContent;

  profileFrom.addEventListener('submit', profileFormSubmitHandler)
  openPopup(profileHtmlFragment);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = evt.target.querySelector('#name').value;
  jobProfile.textContent = evt.target.querySelector('#description').value;
  closePopup(evt);
}

function showAddItemForm() {
  const addItemFormTpl = document.querySelector('#add-item-form');
  const addItemHtmlFragment = addItemFormTpl.content.cloneNode(true);
  const addItemForm = addItemHtmlFragment.querySelector('.popup__form')

  addItemForm.addEventListener('submit', addCardItemSubmitHandler)
  openPopup(addItemHtmlFragment);
}

function addCardItemSubmitHandler(evt) {
  evt.preventDefault();
  const titleInput = evt.target.querySelector('#title');
  const linkInput = evt.target.querySelector('#link');
  let cardItem = createCardItem(titleInput.value, linkInput.value);
  cardList.prepend(cardItem);
  closePopup(evt);
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
  const previewTpl = document.querySelector('#preview');
  const preview = previewTpl.content.querySelector('.preview').cloneNode(true);
  const previewImage = preview.querySelector('.preview__image');
  const previewText = preview.querySelector('.preview__text');

  previewImage.src = evt.target.src
  previewImage.alt = evt.target.alt
  previewText.innerText = evt.target.alt

  openPopup(preview);
}

createCardItem(initialCards[0].name, initialCards[0].link)
profileEditButton.addEventListener('click', showProfileForm);
buttonAddCardItem.addEventListener('click', showAddItemForm);

window.addEventListener('load', initCardList);
