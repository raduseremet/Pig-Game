/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlayign;

init();

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
        if (dice !== 1) {

            // Add score
            roundScore = roundScore + dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;


        } else {
            nextPlayer();
        }


        
    }

})

// add event listener to hold btn

document.querySelector('.btn-hold').addEventListener('click', function(){

    if (gamePlayign){
            // Add CURRET score to GLOBAL score
        scores[activePlayer] = roundScore + scores[activePlayer];

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the player won the game
        if (scores[activePlayer] >= 20) {
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

