document.addEventListener("DOMContentLoaded", function () {
  const destinations = document.querySelector('#destinations_container');
  const nameInput = document.querySelector('#name');
  const locationInput = document.querySelector('#location');
  const photoURLInput = document.querySelector('#photo');
  const descriptionInput = document.querySelector('#description');
  const inputButton = document.querySelector('#inputButton');

  inputButton.addEventListener('click', () => {
    //create new card
    const newCard = document.createElement('div');
    const image = document.createElement('img');
    image.src = photoURLInput.value;
    const name = document.createElement('h2');
    name.textContent = nameInput.value;
    const location = document.createElement('p');
    location.className = 'location';
    location.textContent = locationInput.value;
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = descriptionInput.value;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    newCard.className = 'card';

    newCard.appendChild(image);
    newCard.appendChild(name);
    newCard.appendChild(location);
    newCard.appendChild(description);
    newCard.appendChild(editButton);

    newCard.appendChild(removeButton);
    destinations.appendChild(newCard);


    editButton.addEventListener('click', () => {
      //make edit function here
    });

    removeButton.addEventListener('click', () => {
      newCard.remove();
    })
  });



});

let createNewCard = () => {

}
