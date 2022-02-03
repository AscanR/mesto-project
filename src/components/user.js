import {updateUser, updateUserAvatar} from './api'
import {openPopup, closePopup, disableButton, enableButton} from './modal'

const profilePopup = document.querySelector('#popup-profile')
const profileForm = document.querySelector('#edit-profile')
const profileNameElement = document.querySelector('.profile__name')
const profileAboutElement = document.querySelector('.profile__position')
const profileNameInput = profilePopup.querySelector('#name');
const profileAboutInput = profilePopup.querySelector('#profile');
const profileEditButton = document.querySelector('.profile__edit');
const profileAvatarSaveButton = document.querySelector('#save-button-img-prof');
const profileAvatarEdit = document.querySelector('#edit-img-prof')
const profileAvatarPopup = document.querySelector('#popup-img-prof');
const profileAvatarInput = document.querySelector('#img-prof');
const profileAvatarEditButton = document.querySelector('.profile__avatar');
const profileSubmitButton = profilePopup.querySelector('#save-button')
const profileAvatar = document.querySelector('.profile__avatar')

const handleProfileEditClick = () => {
  profileNameInput.value = profileNameElement.textContent,
      profileAboutInput.value = profileAboutElement.textContent

  openPopup(profilePopup)
  disableButton(profileSubmitButton)
}

const handleProfileAvatarEditClick = () => {
  profileAvatarInput.value = ''

  openPopup(profileAvatarPopup)
  disableButton(profileAvatarSaveButton)
}

const handleProfileSave = (evt) => {
  evt.preventDefault()

  profileSubmitButton.textContent = 'Сохраняется...'
  disableButton(profileSubmitButton)

  const userData = {
    name: profileNameInput.value,
    about: profileAboutInput.value
  }

  updateUser(userData)
      .then(res => {
        const {name, about} = res

        profileNameElement.textContent = name
        profileAboutElement.textContent = about

        closePopup(profilePopup)
      })
      .catch(error => console.error(error))
      .finally(() => {
        enableButton(profileSubmitButton)
        profileSubmitButton.textContent = 'Сохранить'
      })
}

const handleProfileAvatarSave = (evt) => {
  evt.preventDefault()

  disableButton(profileAvatarSaveButton)
  profileAvatarSaveButton.textContent = 'Сохраняется...'

  const avatar = profileAvatarInput.value

  updateUserAvatar(avatar)
      .then(res => {
        profileAvatarEditButton.src = res.avatar

        closePopup(profileAvatarPopup)
      })
      .catch(err => console.error(err))
      .finally(() => {
        enableButton(profileAvatarSaveButton)
        profileAvatarSaveButton.textContent = 'Сохранить'
      })
}

export const setUserData = ({avatar, about, name}) => {
  profileAvatar.src = avatar
  profileNameElement.textContent = name
  profileAboutElement.textContent = about
}

export const setUserListeners = () => {
  profileForm.addEventListener('submit', handleProfileSave)
  profileEditButton.addEventListener('click', handleProfileEditClick);
  profileAvatarEditButton.addEventListener('click', handleProfileAvatarEditClick);
  profileAvatarEdit.addEventListener('submit', handleProfileAvatarSave)
}