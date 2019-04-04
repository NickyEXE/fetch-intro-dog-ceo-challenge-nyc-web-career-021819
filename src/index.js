console.log('%c HI', 'color: firebrick')

// Global Constants

const dogImages = document.getElementById("dog-image-container")

// EventListeners
document.addEventListener("DOMContentLoaded", postDomFunctions)
function postDomFunctions(){
  dogFetcher()
  breedFetcher()

  document.addEventListener("click", colorChange)
  document.getElementById("breed-dropdown").addEventListener("change", dropdownFilter)
}

//Fetch Functions
function dogFetcher(filter){
  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(function(response) {
      return response.json();
    })
    .then(function(filter){renderDogs(filter)});
}
function breedFetcher(){
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(function(response) {
      return response.json();
    })
    .then(renderBreeds);
}

//renderFunctions
function renderDogs(dogLinks) {
  const dogImages = document.getElementById("dog-image-container")
  dogImages.innerHTML = ''
  const combinedLinks = dogLinks.message.map(dogLink => `
    <img src='${dogLink}'><br>
    `).join("")
  dogImages.innerHTML += `${combinedLinks}`
  }
function renderBreeds(breeds){
  const bulletedList =document.getElementById('dog-breeds')
  Object.keys(breeds.message).forEach((breed,index) => {
    const newLi = document.createElement('LI');
    newLi.innerText = breed;
    newLi.setAttribute('data-id' , index);
    bulletedList.appendChild(newLi)
  })
}

//Interactivity Functions

function colorChange(e){
  if (e.target.dataset.id){
  e.target.style.color = "red"}
}

function dropdownFilter(e){
  console.log("we're in the dropdown", e.target.value)

}
