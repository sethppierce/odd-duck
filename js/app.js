'use strict';

console.log('hey there hey!');

// ******* GLOBAL VARIABLES *******
let voteCount = 15;
let duckArray = [];

// ******* DOM REFERENCES *********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');


// ******* CONSTRUCTOR FUNCTION ********

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  duckArray.push(this);
}

// ****** HELPER FUNTCION / UTILITIES ******
function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}


function renderImgs(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();

  // this will run and make sure they are unique
  // ? multiple conditions to check for with 3 images
  // ? OR use a container to store your 3 indexes and do your validation on that
  while(imgOneIndex === imgTwoIndex){
    imgTwoIndex = randomIndex();
  }

  imgOne.src = duckArray[imgOneIndex].img;
  imgTwo.src = duckArray[imgTwoIndex].img;

  duckArray[imgOneIndex].views++;
  duckArray[imgTwoIndex].views++;

  imgOne.alt = duckArray[imgOneIndex].name;
  imgTwo.alt = duckArray[imgTwoIndex].name;
}

// ***** EVENT HANDLERS **********

function handleClick(event){
  console.dir(event.target);
  let imgClicked = event.target.alt;

  // TODO: Add clicks to the image that was clicked
  console.log('img clicked >>', imgClicked);

  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === imgClicked){
      // increase vote counts
      duckArray[i].clicks++;
    }
  }

  // TODO: decrement the vote count
  voteCount--;

  // TODO: call the render img to reload new images
  renderImgs();

  // TODO: after voting rounds have ended... end the clicks!
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  // TODO: Display results - once there are no more votes left
  if(voteCount === 0){
    for(let i = 0; i < duckArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${duckArray[i].name} was viewed: ${duckArray[i].views} and clicked: ${duckArray[i].clicks}`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ****** EXECUTABLE CODE ********

// ! OBJECT CREATION

new Duck('', 'png');
new Duck('');
new Duck('');
new Duck('');
new Duck('');
new Duck('');
new Duck('');
new Duck('');
new Duck('');

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
