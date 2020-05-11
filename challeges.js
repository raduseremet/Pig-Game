/*
CHALLENGES:

- a player loses his entire score when he rolls two six in a row. 


*/



var scores, roundScore, activePlayer, gamePlayign;

init();
var lastDice;

// add event listener to roll btn
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if (gamePlayign){
        // 1.Radom number
        var dice = Math.floor(Math.random()*6) + 1;

        // 2.Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3.Update the curret score number IF the score is NOT  1
        if (dice === 6 && lastDice === 6){
            // player looses entire score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
 
        } else if (dice !== 1) {
            // Add score
            roundScore = roundScore + dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
      lastDice = dice;
    }

})

// add event listener to hold btn

document.querySelector('.btn-hold').addEventListener('click', function(){

    if (gamePlayign){
            // Add CURRET score to GLOBAL score
        scores[activePlayer] = roundScore + scores[activePlayer];

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.getElementById('final-score').value;
        var winningScore;
        // Js trateaza Undefide, 0, null, "" as false, daca campul e gol atunci e fals
        // Anithing else is COERCED to true
        
        if(input){
            winningScore = input
        } else {
            winningScore >=20;
        }

        // Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlayign = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
})

// Next Player  
function nextPlayer (){
     // next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     //  if (activePlayer === 0) {
     //      activePlayer = 1
     //  } else {
     //      activePlayer = 0
     //  }
      roundScore = 0;
      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     document.querySelector('.dice').style.display = 'none';
}

// Start a new game
document.querySelector('.btn-new').addEventListener('click', init )


// Init Function
function init(){

    gamePlayign = true;

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').innerText = 0;
    document.getElementById('score-1').innerText = 0;
    document.getElementById('current-0').innerText = 0;
    document.getElementById('current-1').innerText = 0;


    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

