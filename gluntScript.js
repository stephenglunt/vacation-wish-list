document.addEventListener("DOMContentLoaded", function () {
  const destinations = document.querySelector('#destinations_container');
  const inputButton = document.querySelector('#inputButton');


  inputButton.addEventListener('click', () => {
    const newCard = createNewCard();

    let valid = (validateName && validateLocation && validatePhoto);
    if(!valid) return;


    destinations.appendChild(newCard.card);


    newCard.editButton.addEventListener('click', () => {
      //make edit function here
    });

    newCard.removeButton.addEventListener('click', () => {
      newCard.card.remove();
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
    newCardObj[element].className = classNames[i];
    i++;
  }

  //set content
  newCardObj.image.src = photoURLInput.value;
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
  if (name.length < 2) {

    alert("Name must be at least 2 characters.");
    return false;
  }
}

function validateLocation() {
  const location = document.getElementById("location").value;
  if (location.length < 2) {
    alert("Location must be at least 2 characters.");
    return false;
  }
}

function validatePhoto() {
  const photo = document.getElementById("photo").value;
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const extension = photo.split(".").pop().toLowerCase();
  if (!imageExtensions.includes(extension)) {
    alert("Photo must be a valid image URL.");
    return false
  }
}
