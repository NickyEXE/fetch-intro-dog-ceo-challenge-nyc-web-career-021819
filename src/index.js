console.log('%c HI', 'color: firebrick')

// Global Constants

const dogImages = document.getElementById("dog-image-container")
let filterForDogs = ""
// EventListeners
document.addEventListener("DOMContentLoaded", postDomFunctions)

function postDomFunctions(){

  dogFetcher()
  callBreedFetcher()

  document.addEventListener("click", colorChange)
  document.getElementById("breed-dropdown").addEventListener("change", dropdownFilter)
}

//Fetch Functions

function dogFetcher(){
  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(function(response) {
      return response.json();
    })
    .then(renderDogs);
}
function callBreedFetcher(filter){
  let filterForDogs = filter
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(function(response) {
      return response.json();
    })
    .then(renderBreeds)
    function renderBreeds(breeds){
      const bulletedList =document.getElementById('dog-breeds')
      console.log(Object.keys(breeds.message))
      console.log("filter for dogs: ", !!filterForDogs)
      let breedsMessage = Object.keys(breeds.message)
      if (filterForDogs){console.log(filterForDogs), breedsMessage = breedsMessage.filter(breed => breed.charAt(0) === filterForDogs)}
      bulletedList.innerHTML = ''
      breedsMessage.forEach((breed,index) => {
        const newLi = document.createElement('LI');
        newLi.innerText = breed;
        newLi.setAttribute('data-id' , index);
        bulletedList.appendChild(newLi)
      })
    }
  }

//renderFunctions
function renderDogs(dogLinks) {
  const dogImages = document.getElementById("dog-image-container")
  if (dogImages.innerHTML){dogImages.innerHTML = ''}
  htmlRenderDogs(dogLinks.message)
  }

function htmlRenderDogs(dogLinks,filter){
  const dogImages = document.getElementById("dog-image-container")
  const combinedLinks = dogLinks.map(dogLink => `
    <img src='${dogLink}'><br>
    `).join("")
  dogImages.innerHTML += `${combinedLinks}`
}


//Interactivity Functions

function colorChange(e){
  if (e.target.dataset.id){
  e.target.style.color = "red"}
}

function dropdownFilter(e){
  console.log("we're in the dropdown", e.target.value)
  filter = e.target.value
  callBreedFetcher(filter)
}
