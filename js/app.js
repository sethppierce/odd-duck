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

let duckNames = [];
function duckArr(){
  for(let i = 0; i < duckArray.length;i++){
    duckNames.push(duckArray[i].name);
  }
}

let duckVotes = [];

function duckVote(){
  for(let i = 0; i < duckArray.length;i++){
    duckVotes.push(duckArray[i].clicks);
  }
}

let duckViews = [];

function duckView(){
  for(let i = 0; i < duckArray.length;i++){
    duckViews.push(duckArray[i].views);
  }
}

let indexArr = [];

function renderImgs(){

  while (indexArr.length < 6) {
    let randomNum = randomIndex();
    if (!indexArr.includes(randomNum)) {
      indexArr.push(randomNum);
    }
  }

  let imgOneIndex = indexArr.shift();
  let imgTwoIndex = indexArr.shift();
  let imgThreeIndex = indexArr.shift();

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
    let stringifiedDucks = JSON.stringify(duckArray);

    console.log(stringifiedDucks);

    localStorage.setItem('myDucks', stringifiedDucks);
  }
}

let retreivedDucks = localStorage.getItem('myDucks');
console.log(retreivedDucks);
let parsedDucks = JSON.parse(retreivedDucks);

console.log('parsed Goats >>>', parsedDucks);

function instructionP(){
  let pElem = document.createElement('p');
  pElem.id = 'instruct';
  pElem.textContent = 'Please vote on one of the products below that you would like to be brought to market! There will be 25 rounds of 3 images shown.';
  instructions.appendChild(pElem);
}

function handleShowResults() {
  if (voteCount === 0) {
    duckVote();
    duckView();
    const labels = duckNames;
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Votes',
            data: duckVotes,
            borderColor: '#32cd32',
            backgroundColor: '#FF69B4',
          },
          {
            label: 'Views',
            data: duckViews,
            borderColor: '#FF69B4',
            backgroundColor: '#32cd32',
          }
        ],
        borderWidth: 1,
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Votes and Views Results!'
          },
        }
      },
    });
  }
  resultsBtn.id = ('none');
  resultsBtn.removeEventListener('click', handleShowResults);
}

// ****** EXECUTABLE CODE ********

if(retreivedDucks){
  duckArray = parsedDucks;
} else{
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
}



renderImgs();
instructionP();
duckArr();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
