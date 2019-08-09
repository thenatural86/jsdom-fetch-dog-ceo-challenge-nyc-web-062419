// console.log("%c HI", "color: firebrick");
document.addEventListener("DOMContentLoaded", function() {
  // console.log("yo");
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  let dogShow;

  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => renderDogs(json));

  fetch("https://dog.ceo/api/breeds/list/all")
    // make request to a end point / url
    .then(resp => resp.json())
    // after request we get back a response
    // with this response lets convert into json
    .then(json => {
      // we get useable information in a nice json js object notation
      // looks like this -> {key: value}

      // console.log("JSON DATA", json);
      dogShow = json.message;

      // console.log("DOG SHOW", dogShow);
      renderBreeds(dogShow);
    });

  function renderDogs(json) {
    const dogsContainer = document.querySelector("#dog-image-container");
    // console.log(json);
    json.message.forEach(dogUrl => {
      // console.log(dogUrl);
      dogsContainer.insertAdjacentHTML(
        "beforeend",
        `<li><img src="${dogUrl}" alt=""></li>`
      );
    });
  }

  function renderBreeds(json) {
    const breedsContainer = document.querySelector("#dog-breeds");
    breedsContainer.innerHTML = "";
    // console.log(json);
    for (let breed in json) {
      breedsContainer.insertAdjacentHTML("beforeend", `<li>${breed}</li>`);
      // console.log(breedUrl);
      changeColor();
    }
  }

  function changeColor(li) {
    const myLi = document.querySelectorAll("#dog-breeds li");
    myLi.forEach(dog => {
      // console.log(dog);
      dog.addEventListener("click", function(e) {
        dog.style.color = "green";
      });
    });
  }

  const dropDown = document.querySelector("#breed-dropdown");
  function dogChoice(breeds) {}
  // console.log(dropDown);

  dropDown.addEventListener("change", function(e) {
    // console.log("dropDown");

    const breedsContainer = document.querySelector("#dog-breeds");
    console.log("DOG SHOW DATA", dogShow);
    console.log("DROPDOWN VALUE", e.target.value);

    const selectedLetter = e.target.value;

    // console.log(Object.keys(dogShow));
    let filteredDogBreeds = Object.keys(dogShow).filter(
      breed => breed[0] === selectedLetter
    );
    // console.log(filteredDogBreeds);
    let dogBreedsObject = {};
    filteredDogBreeds.forEach(breedString => {
      dogBreedsObject[breedString] = dogShow[breedString];
    });
    console.log("FILTERED DOG BREEDS OBJECT", dogBreedsObject);
    renderBreeds(dogBreedsObject);
    // if (dropDown.value === "a") {
    //   console.log("A");
    //   // dog => dog[0] === "a");
    // } else if (dropDown.value === "b") {
    //   console.log("B");
    //   // breeds.filter(dog => dog[0] === "b");
    // } else if (dropDown.value === "c") {
    //   console.log("C");
    //   // breeds.filter(dog => dog[0] === "c");
    // } else if (dropDown.value === "d") {
    //   console.log("D");
    //   // breeds.filter(dog => dog[0] === "d");
    // }
  });
});
