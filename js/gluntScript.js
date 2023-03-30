// import * as validation from './validation.mjs';
// <script type="module" src="./validation.mjs"></script>

import { validateName, validateLocation, getSafeDescription, getValidImgUrl } from './validation.js';
import { getGif } from './giphy.js';

const defaultImgUrl = "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";

document.addEventListener("DOMContentLoaded", function () {
  const destinations = document.querySelector('#destinations_container');
  const inputButton = document.querySelector('#inputButton');
  const cardData = { name: "", image_src: "", location: "", description: "" };

  inputButton.addEventListener('click', () => {

    if (!validateName() || !validateLocation()) {
      return;
    }

    const newCard = createNewCard();

    destinations.appendChild(newCard.card);

    newCard.editButton.addEventListener('click', () => {
      editCard(newCard, cardData);
    });

    newCard.removeButton.addEventListener('click', () => {
      if (newCard.removeButton.textContent === "Remove") {
        newCard.card.remove();
      } else {
        cancelEdit(newCard, cardData);
      }
    });
  });
});


function createNewCard() {
  //Get input data
  const nameInput = document.querySelector('#name');
  const locationInput = document.querySelector('#location');
  const photoURLInput = document.querySelector('#photo');
  const descriptionInput = document.querySelector('#description');

  const newCardObj = {
    card: document.createElement('div'),
    image: document.createElement('img'),
    name: document.createElement('h2'),
    location: document.createElement('p'),
    description: document.createElement('p'),
    editButton: document.createElement('button'),
    removeButton: document.createElement('button')
  };

  //set classes
  let classNames = ['card', 'image', 'destination', 'location', 'description', 'button', 'button'];
  let i = 0;
  for (let element in newCardObj) {
    newCardObj[element].className = classNames[i] + " input";
    i++;
  }

  //set content
  newCardObj.name.textContent = nameInput.value;
  newCardObj.location.textContent = locationInput.value;
  newCardObj.description.textContent = getSafeDescription(descriptionInput.value);
  newCardObj.editButton.textContent = 'Edit';
  newCardObj.removeButton.textContent = 'Remove';


  //Set image
  let validUrl = false;
  const searchString = nameInput.value + "+" + locationInput.value;
  getValidImgUrl(photoURLInput.value)
  .then(url => {
    validUrl = true;
    newCardObj.image.src = url;
  })
  .catch(() => {
    return getGif(searchString);
  })
  .then(url => {
    if(!validUrl) newCardObj.image.src = url;
  })
  .catch(() => {
    newCardObj.image.src = defaultImgUrl;
  });


  //append children
  newCardObj.card.appendChild(newCardObj.image);
  newCardObj.card.appendChild(newCardObj.name);
  newCardObj.card.appendChild(newCardObj.location);
  newCardObj.card.appendChild(newCardObj.description);
  newCardObj.card.appendChild(newCardObj.editButton);
  newCardObj.card.appendChild(newCardObj.removeButton);

  //Clear Fields
  nameInput.value = "";
  locationInput.value = "";
  descriptionInput.value = "";
  photoURLInput.value = "";

  return newCardObj;
}



function editCard(card, cardData) {

  if (card.editButton.textContent === "Edit") {
    //Save original data
    cardData.name = card.name.textContent;
    cardData.image_src = card.image.src;
    cardData.location = card.location.textContent;
    cardData.description = card.description.textContent;

    //Change button labels
    card.editButton.textContent = "Save";
    card.removeButton.textContent = "Cancel";

    //Make Content Editable
    card.name.contentEditable = true;
    card.location.contentEditable = true;
    card.description.contentEditable = true;

    //Change img object to input object with same dimensions.
    const img = card.image;
    const inputSrc = document.createElement('input');
    inputSrc.type = 'textarea';
    inputSrc.value = img.src;
    inputSrc.style.backgroundImage = 'url("' + img.src + '")';
    inputSrc.style.backgroundSize = 'contain';
    inputSrc.style.width = '100%';
    inputSrc.classList.add('image');
    card.card.replaceChild(inputSrc, img);
    inputSrc.wrap = 'hard';
    card.name.focus();
  } else {

    stopEditingCard(card, cardData);
  }
}

function cancelEdit(card, cardData) {
  //Restore any changes
  card.name.textContent = cardData.name;
  // card.inputSrc.textContent = cardData.image_src;
  card.card.querySelector('.image').value = cardData.image_src;
  card.location.textContent = cardData.location;
  card.description.textContent = getSafeDescription(cardData.description);


  stopEditingCard(card, cardData);
}

function stopEditingCard(card, cardData) {
  //change the button labels back to Edit and Remove
  card.editButton.textContent = "Edit";
  card.removeButton.textContent = "Remove";

  //Make the elements uneditable
  card.name.contentEditable = false;
  card.location.contentEditable = false;
  card.description.contentEditable = false;

  //Replace the image
  const input = card.card.querySelector('.image');
  const img = document.createElement('img');

  getValidImgUrl(input.value)
    .then(url => {
      img.src = url;
    })
    .catch(url => {
      img.src = cardData.image_src;
    })

  img.classList.add('image');
  card.card.replaceChild(img, input);
  card.image = img;

  if (card.name.textContent.length < 2) {
    card.name.textContent = cardData.name;
  }
  if (card.location.textContent.length < 2) {
    card.location.textContent = cardData.location;
  }
}
