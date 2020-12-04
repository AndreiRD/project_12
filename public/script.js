const cardsContent = document.querySelector('.places-list');

const form = document.forms.new;
const inputName = form.elements.name;
const inputLink = form.elements.link;

const editForm = document.forms.editForm;
const inputFullName = editForm.elements.fullName;
const inputOccupation = editForm.elements.occupation;

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');

const popupPicture = document.querySelector('.popup_image');
const popupClose = document.querySelector('.popup__close_image');

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');

function createPost(card) {

  const element = document.createElement('div');
  element.classList.add('place-card');

//  const elementImage = document.createElement('img');
//  elementImage.classList.add('place-card__image');

//  elementImage.src = card.link;
//  element.appendChild(elementImage);

  const elementImage = document.createElement('div');
  elementImage.classList.add('place-card__image');

  elementImage.style.backgroundImage = `url('${card.link}')`;
  element.appendChild(elementImage);

  const imageButton = document.createElement('button');
  imageButton.classList.add('place-card__delete-icon');
  elementImage.appendChild(imageButton);

  const elementDescription = document.createElement('div');
  elementDescription.classList.add('place-card__description');
  element.appendChild(elementDescription);

  const elementDescriptionName = document.createElement('h3');
  elementDescriptionName.classList.add('place-card__name');
  elementDescriptionName.textContent = card.name;
  elementDescription.appendChild(elementDescriptionName);

  const likeButton = document.createElement('button');
  likeButton.classList.add('place-card__like-icon');
  elementDescription.appendChild(likeButton);

  return element;
}

function insertPost(post) {

  const finishedPost = createPost(post);
  cardsContent.appendChild(finishedPost);

}

function setSubmitButtonState(button, state) {

    if (state) {

        button.removeAttribute('disabled');
        button.classList.add(`popup__button_valid`);

    } else {

        button.setAttribute('disabled', true);
        button.classList.remove(`popup__button_valid`);

    }
}

function resetErrors(formToReset) {
//  if (formToReset === editForm) {

  const errors = formToReset.querySelectorAll('.popup__error');
  errors.forEach((error) => error.textContent = '');

  /**
   * Можно лучше:
   * 1. Искать .popup__button и сохранять в submitButton
   * 2. setSubmitButtonState(submitButton, isFormValid(formToReset));
   *
   * Таким образом данная функция будет переиспользуемая для (!)любой новой формы.
   */
  const editPopupSubmitButton = formToReset.querySelector(".popup__button_place_edit");
  setSubmitButtonState(editPopupSubmitButton, true); //как на видео в задании.
//  }

//  if (formToReset === popup) {
//
//    const popupSubmitButton = formToReset.querySelector(".popup__button");
//    setSubmitButtonState(popupSubmitButton, false);
//
//  }
}

/**
 * Можно лучше:
 * Создать один метод для управления классом popup_is-opened и передавать ему элемент.
 */


function popupToggle() {

  popup.classList.toggle('popup_is-opened');
//  if (popup.classList.contains('popup_is-opened') && !inputName.value.trim() && !inputLink.value.trim()) {
//     resetErrors(popup);
//  } 

}

function editPopupOpen() {
  inputFullName.value = userName.textContent;
  inputOccupation.value = userJob.textContent;

  resetErrors(editForm);  

  popupEdit.classList.add('popup_is-opened'); 

}

function editPopupClose() {

  popupEdit.classList.remove('popup_is-opened'); 

}

function pictureToggle() {
  
  popupPicture.classList.toggle('popup_is-opened');

}

function setInvalid (field, message) {

  field.nextElementSibling.textContent = message;

}

function setValid (field) {

  field.nextElementSibling.textContent = '';

}

function checkIfEmpty(field) {
  /**
   * Можно лучше:
   * Имел в виду, что не обязательно выносить это в отдельную функцию - это ухудшает читаемость кода, т.к. другой
   * программист не знаком с checkIfEmpty, зато знаком с trim(). Таким образом ему не придется смотреть, что
   * скрывается за checkIfEmpty, а он сразу будет знать, что делает этот код и сэкономит время на перемещениях по коду.
   */
  return !field.value.trim();

}

function errorMessage(field) {

  if (checkIfEmpty(field)) return errorMessages.isEmpty;
  if (field.classList.contains('popup__input_type_link-url')) return errorMessages.isWrongURLPattern;
  return errorMessages.isWrongLength;

}

function isSubmitButton (field) {

  return field.type === 'submit' || field.type === 'button';

}

function checkIfRightLength (field) {

  return field.value.length >= 2 && field.value.length <= 30;

}

function validateTextField(field) {
   
  if (checkIfEmpty(field)) return false;
  return checkIfRightLength(field);

}

function checkIfRightURLPattern(field) {

  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(field.value);

}

function validateUrl (field) {
  
  if(checkIfEmpty(field)) return false;
  return checkIfRightURLPattern(field);

}

function validateField(field){

  if (isSubmitButton(field)) return;
  if (field.classList.contains('popup__input_type_link-url')) {

    return validateUrl(field);

  }

  return validateTextField(field);
    
}


function isFormValid(form) { 

  const inputs = [...form.elements];
  let valid = true;
    
  inputs.forEach((input) => {
    if (!isSubmitButton(input)) {
      if (!validateField(input)) valid = false;
      }
    });
    
    return valid;
  }

function handlerInputForm (evt) {

  const submit = evt.currentTarget.querySelector('.button');
    
  if (validateField(evt.target)) {
    setValid(evt.target);
  }
  else {
    setInvalid(evt.target, errorMessage(evt.target));
  }

  setSubmitButtonState(submit, isFormValid(evt.currentTarget));

}

initialCards.forEach((card) => insertPost(card));


document.querySelector('.user-info__button').addEventListener('click', popupToggle);
document.querySelector('.popup__close').addEventListener('click', popupToggle);

document.querySelector('.user-info__edit-button').addEventListener('click', editPopupOpen);
document.querySelector('.popup__close_edit').addEventListener('click', editPopupClose);


cardsContent.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  if (event.target.classList.contains('place-card__delete-icon')) {
    event.target.closest('.place-card').remove();
  }
  if (event.target.classList.contains('place-card__image')) {
    /**
     * Можно лучше:
     * Сделать .place-card__image тегом img, когда не придется делать такие преображения строки - достаточно будет
     * извлечь атрибут src.
     */
    document.querySelector('.popup__image-large').src = event.target.closest('.place-card__image').style.backgroundImage.split('url("')[1].slice(0,-2);
    pictureToggle();
  }
});

form.addEventListener('submit', function (event) {

  event.preventDefault();

  const userInput = {};
  userInput.name = inputName.value;
  userInput.link = inputLink.value;

  insertPost(userInput);
  popupToggle();
  form.reset();

});

editForm.addEventListener('submit', function (event) {

  event.preventDefault();

  userName.textContent = inputFullName.value;
  userJob.textContent = inputOccupation.value; 

  editPopupClose();
  editForm.reset(); 

});

form.addEventListener('input', handlerInputForm);
editForm.addEventListener('input', handlerInputForm);

popupClose.addEventListener('click', pictureToggle);

/**
 * Удалил исправленные замечания.
 * Работа принята.
 * Настоятельно рекомендую переделать resetErrors в соответствие с моей рекомендацией.
 *
 * Можно лучше:
 * 1. Перенести js-файлы в отдельную папку.
 * 2. Чтобы не делать проверку на кнопку в isFormValid(), вместо form.elements следует делать поиск по .popup__input
 *    с помощью querySelectorAll()
 */