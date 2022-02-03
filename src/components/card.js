import {addCard, deleteCard, toggleCardLike} from './api'
import {openPopup, closePopup, disableButton, enableButton} from './modal'

const placeForm = document.querySelector('#add-place');
const cardContainer = document.querySelector('.cards-grid');
const cardAddButton = document.querySelector('.profile__add');
const cardCreateButton = document.querySelector('#create-button');
const placePopup = document.querySelector('#popup-place');
const placeNameInput = document.querySelector('#name-place');
const placeSourceInput = document.querySelector('#place-source');
const popupImage = document.querySelector('#popup-img');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupTrash = document.querySelector('#popup-trash')
const popupTrashButton = document.querySelector('#popup-trash-button')

const handleCardDeleteConfirm = (cardElement, cardId) => {
  popupTrashButton.textContent = 'Удаляется...'
    
  deleteCard(cardId)
    .then(() => {
      cardElement.remove()
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupTrashButton.textContent = 'Да'

      closePopup(popupTrash)
    })
}

const handleCardDelete = (cardId) => {
  popupTrash.setAttribute('data-card-id', cardId)

  openPopup(popupTrash)
}

const handleCardLike = (cardElement, cardId, currentUserId) => {
  const cardLikeButton = cardElement.querySelector('.card__heart')
  const isCardLikeButtonActive = cardLikeButton.classList.contains('card__heart_active')

  toggleCardLike(cardId, isCardLikeButtonActive)
    .then(res => {
      const { likes } = res
      const isLiked = Boolean(likes.find((user) => user._id === currentUserId))

      if (isLiked) {
        cardLikeButton.classList.add('card__heart_active')
      } else {
        cardLikeButton.classList.remove('card__heart_active')
      }

      cardElement.querySelector('.card__like-counter').textContent = likes.length.toString()
    })
    .catch(err => console.error(err))
}

const handleCardPhotoClick = (name, link) => {
  popupImageCaption.textContent = name
  popupImagePhoto.src = link
  popupImagePhoto.alt = name

  openPopup(popupImage)
}

const handleCardAddClick = () => {
  placeSourceInput.value = ''
  placeNameInput.value = ''

  openPopup(placePopup)
  disableButton(placePopup)
}

const handleCardAdd = (evt) => {
  evt.preventDefault()

  cardCreateButton.textContent = 'Сохраняется...'
  disableButton(placePopup)

  const cardData = {
    name: placeNameInput.value,
    link: placeSourceInput.value
  }

  addCard(cardData)
    .then((res) => {
      const newCard = createCard(
        {...res, cardId: res._id, ownerId: res.owner._id},
        res.owner._id,
        handleCardLike,
        handleCardDelete,
        handleCardPhotoClick
      )

      cardContainer.prepend(newCard)

      closePopup(placePopup)
    })
    .catch((err) => console.error(err))
    .finally(() => {
      enableButton(placePopup)
      cardCreateButton.textContent = 'Создать'
    })
}

function createCard({name, link, likes, cardId, ownerId}, currentUserId, handleLikeClick, handleDeleteClick, handlePhotoClick) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardPhoto = cardElement.querySelector('.card__photo')
  const cardTrash = cardElement.querySelector('.card__trash')
  const cardLikeButton = cardElement.querySelector('.card__heart')

  const isOwner = ownerId === currentUserId
  const isLiked = Boolean(likes.find((user) => user._id === currentUserId))

  cardPhoto.src = link
  cardPhoto.alt = name

  cardElement.setAttribute('data-card-id', cardId)
  cardElement.querySelector('.card__text').textContent = name
  cardElement.querySelector('.card__like-counter').textContent = likes.length.toString()

  if (isLiked) {
    cardLikeButton.classList.add('card__heart_active')
  }

  cardLikeButton.addEventListener('click', () => handleLikeClick(cardElement, cardId, currentUserId))

  cardTrash.classList.add(isOwner ? 'card__trash_visible' : 'card__trash_hidden')
  cardTrash.addEventListener('click', () => handleDeleteClick(cardId))

  cardPhoto.addEventListener('click', () => handlePhotoClick(name, link))

  return cardElement
}

export function renderCards(cards, currentUserId) {
  for (let i = 0; i < 9; i++) {
    const cardData = cards[i]
    const newCard = createCard(
      {...cardData, cardId: cardData._id, ownerId: cardData.owner._id},
      currentUserId,
      handleCardLike,
      handleCardDelete,
      handleCardPhotoClick
    )

    cardContainer.append(newCard)
  }
}

export const setCardListeners = () => {
  placeForm.addEventListener('submit', handleCardAdd);
  cardAddButton.addEventListener('click', handleCardAddClick);

  popupTrashButton.addEventListener('click', () => {
    const cardId = popupTrash.getAttribute('data-card-id')
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)

    handleCardDeleteConfirm(cardElement, cardId)
  })
}
