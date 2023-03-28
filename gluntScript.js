document.addEventListener("DOMContentLoaded", function () {
  const destinations = document.querySelector('#destinations_container');
  const inputButton = document.querySelector('#inputButton');
  const cardData = { name: "", image_src: "", location: "", description: "" };



  inputButton.addEventListener('click', () => {
    const newCard = createNewCard();

    if (!validateName() || !validateLocation()) {
      // alert("Name must be at least 2 characters.");
      return;
    }

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
  let img = new Image();
  img.src = photoURLInput.value;
  img.onload = () => {
    newCardObj.image.src = photoURLInput.value;
  }
  img.onerror = () => {
    newCardObj.image.src = "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
  }

  newCardObj.name.textContent = nameInput.value;
  newCardObj.location.textContent = locationInput.value;
  newCardObj.description.textContent = descriptionInput.value;
  newCardObj.editButton.textContent = 'Edit';
  newCardObj.removeButton.textContent = 'Remove';

  //append children
  newCardObj.card.appendChild(newCardObj.image);
  newCardObj.card.appendChild(newCardObj.name);
  newCardObj.card.appendChild(newCardObj.location);
  newCardObj.card.appendChild(newCardObj.description);
  newCardObj.card.appendChild(newCardObj.editButton);
  newCardObj.card.appendChild(newCardObj.removeButton);

  return newCardObj;

}



function validateName() {
  const name = document.getElementById("name").value;
  const errorSpan = document.getElementById("name-error");
  if (name.length < 2) {
    errorSpan.textContent = "Name must be at least 2 characters.";
    return false;
  } else {
    errorSpan.textContent = "";
  }
  return true;
}

function validateLocation() {
  const location = document.getElementById("location").value;
  const errorSpan = document.getElementById("location-error");
  if (location.length < 2) {
    errorSpan.textContent = "Location must be at least 2 characters.";
    return false;
  } else {
    errorSpan.textContent = "";
  }
  return true;
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
    card.image.contentEditable = true;
    card.image.setAttribute("draggable", false);
    card.name.focus();
  } else {

    stopEditingCard(card, cardData);
  }
}

function cancelEdit(card, cardData) {
  let img = new Image();
  img.src = cardData.image_src;
  img.onload = () => {
    card.image.src = cardData.image_src;
  }
  img.onerror = () => {
    card.image.src = "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
  }

  card.name.textContent = cardData.name;
  card.location.textContent = cardData.location;
  card.description.textContent = cardData.description;

  stopEditingCard(card, cardData);
}

function stopEditingCard(card, cardData) {
  card.editButton.textContent = "Edit";
  card.removeButton.textContent = "Remove";
  card.name.contentEditable = false;
  card.location.contentEditable = false;
  card.description.contentEditable = false;
  card.image.removeAttribute("draggable");
  card.image.contentEditable = false;

  console.log(card.location.textContent);
  console.log(cardData.location);

  if (card.name.textContent.length < 2) {
    card.name.textContent = cardData.name;
  }
  if (card.location.textContent.length < 2) {
    card.location.textContent = cardData.location;
  }
}
