document.querySelector('.js-rock')
  .addEventListener('click', () => {
    Move('rock')
  });

document.querySelector('.js-paper')
  .addEventListener('click', () => {
    Move('paper')
  });

document.querySelector('.js-scissors')
  .addEventListener('click', () => {
    Move('scissors')
  });

document.querySelector('.js-reset-score')
  .addEventListener('click', () => {
    conformResetScore();

  });

document.addEventListener('keydown', (event) => {
   
  if(event.key==='Backspace'){
    conformResetScore ();
    }
  });

let score =JSON.parse( localStorage.getItem('scoress'))||
  {
    wins:0,
    losses:0,
    ties:0
  };
  updateScore();

function Move(playerMove) {
  let result = document.querySelector('.js-display');
  let computerMove = pickCompMove();
  if (playerMove === computerMove) {
    result.innerHTML = 'Tie.';
    score.ties++;
  }
  else if ((playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')) {
    result.innerHTML = 'You Win :)';
    score.wins++;
  }
  else {
    result.innerHTML = 'You lose :(';
    score.losses++;
  }
  let bothMoves=document.querySelector('.js-both-moves');
  bothMoves.innerHTML=`you 
      <img class="both-moves-icon" src="${playerMove}-emoji.png">  
      <img class="both-moves-icon" src="${computerMove}-emoji.png"> Computer`;
  
  updateScore();
  localStorage.setItem('scoress',JSON.stringify(score));

}



function pickCompMove() {
  let compMove = Math.random()
  let compResult;
  if (compMove < 1 / 3) {
    compResult = 'rock';
  }
  else if (compMove < 2 / 3) {
    compResult = 'paper';
  }
  else {
    compResult = 'scissors';
  }
  return compResult
}

function updateScore(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}
   Losses: ${score.losses}
   Ties: ${score.ties}`;
}

function resetScore(){
  score={
    wins:0,
    losses:0,
    ties:0
  };
  updateScore();
  localStorage.setItem('scoress',JSON.stringify(score));

}
function conformResetScore(){
  document.querySelector('.js-conform-reset')
    .innerHTML=`Are you sure you want to reset the score?
      <button class="yes-button">Yes</button>
      <button class="no-button">No</button>`;

  document.querySelector('.yes-button')
    .addEventListener('click',()=>{
      resetScore();
      clearConfirmation();
    });
  
  document.querySelector('.no-button')
    .addEventListener('click',()=>{
      clearConfirmation();
    });

}


function clearConfirmation() {
    document.querySelector('.js-conform-reset').innerHTML = '';
}