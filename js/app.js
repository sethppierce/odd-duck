'use strict';

console.log('yo');

//GLOBAL VARIABLES
let voteCount = 25;
let duckArray = [];

// DOM REFERENCES
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');
let instructions = document.getElementById('instructions');


//CONSTRUCTOR FUNCTION

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  duckArray.push(this);
}

//HELPER FUNTCION / UTILITIES
function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}


function renderImgs(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  while(imgOneIndex === imgTwoIndex){
    imgTwoIndex = randomIndex();
  }
  while(imgThreeIndex === imgTwoIndex || imgThreeIndex === imgOneIndex){
    imgThreeIndex = randomIndex();
  }

  imgOne.src = duckArray[imgOneIndex].img;
  imgTwo.src = duckArray[imgTwoIndex].img;
  imgThree.src = duckArray[imgThreeIndex].img;

  duckArray[imgOneIndex].views++;
  duckArray[imgTwoIndex].views++;
  duckArray[imgThreeIndex].views++;

  imgOne.alt = duckArray[imgOneIndex].name;
  imgTwo.alt = duckArray[imgTwoIndex].name;
  imgThree.alt = duckArray[imgThreeIndex].name;
}

// ***** EVENT HANDLERS **********

function handleClick(event){
  console.dir(event.target);
  let imgClicked = event.target.alt;

  console.log('img clicked >>', imgClicked);

  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === imgClicked){

      duckArray[i].clicks++;
    }
  }


  voteCount--;

  let votesRemaining = document.getElementById('instruct');
  votesRemaining.innerHTML = `You have ${voteCount} vote(s) remaining.`;


  renderImgs();

  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
    votesRemaining.innerHTML = 'Thank you for your input! Hit view results to see your votes!';
    resultsBtn.id = ('resultsDone');
  }
}

function instructionP(){
  let pElem = document.createElement('p');
  pElem.id = 'instruct';
  pElem.textContent = 'Please vote on one of the products below that you would like to be brought to market! There will be 25 rounds of 3 images shown.';
  instructions.appendChild(pElem);
}

function handleShowResults(){
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

new Duck('sweep', 'png');
new Duck('bag');
new Duck('banana');
new Duck('bathroom');
new Duck('boots');
new Duck('breakfast');
new Duck('bubblegum');
new Duck('chair');
new Duck('cthulhu');
new Duck('dog-duck');
new Duck('dragon');
new Duck('pen');
new Duck('pet-sweep');
new Duck('scissors');
new Duck('shark');
new Duck('tauntaun');
new Duck('unicorn');
new Duck('water-can');
new Duck('wine-glass');



renderImgs();
instructionP();
imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
