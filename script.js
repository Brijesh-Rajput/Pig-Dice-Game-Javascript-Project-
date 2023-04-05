'use strict';

/*
Q. What i have learned from this project and like the task ?
Ans:- 1) const score0 = document.querySelector('#score--0').textContent;  ==> By doing this, score0 will store the textContent. 
         We can't able to select this textContent and manipulate them.
      2) How to set 'src' attribute of img tag ?  ==> But, see the last 2nd commented section.
      3) How to disable the btn(or EventListner of that btn) for some task ?
*/

// ======================= Selecting all elements ============================

const btnNewGame = document.querySelector('.btn--new');
const btnRolldice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
// NOTE:- This below line code will store the textContent instead of selecting that. 
//currentScore1 = document.querySelector('#current--1').textContent;

const dice = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// ========================== Manipulating value =============================
let scoreValue0 = 0;
let scoreValue1 = 0;

let currentScoreValue0 = 0;
let currentScoreValue1 = 0;

let playing;

initializingGame();
function initializingGame(){

    console.log('Running Game Initializer...');

    playing = true;

    scoreValue0 = 0;
    scoreValue1 = 0;

    currentScoreValue0 = 0;
    currentScoreValue1 = 0;
    
    score0.textContent = scoreValue0;
    score1.textContent = scoreValue1;

    currentScore0.textContent = currentScoreValue0;
    currentScore1.textContent = currentScoreValue1;

    dice.style.display = 'none';

    if(!player0.classList.contains('player--winner')){
        player0.classList.add('player--active');
        player1.classList.remove('player--winner');
    }else{
        player0.classList.remove('player--winner');
        player0.classList.add('player--active');
    }
    
}

// ============================== Functions ====================================
const switchPlayer = function(){ //switch from x to y ==> can also specify switch from to where to reduce code by passing arguments.
    if(!player0.classList.contains('player--active')){
        player0.classList.add('player--active');
        player1.classList.remove('player--active');

        currentScoreValue0 = 0;
        currentScoreValue1 = 0;

        currentScore0.textContent = currentScoreValue0;
        currentScore1.textContent = currentScoreValue1;
        
    } 
    else{
        player1.classList.add('player--active');
        player0.classList.remove('player--active');

        currentScoreValue0 = 0;
        currentScoreValue1 = 0;

        currentScore0.textContent = currentScoreValue0;
        currentScore1.textContent = currentScoreValue1;
        
    } 
}

const newGame = function(){
    initializingGame();
}

const showDice = function(randomNumber){
    //imp: Logic and setAttribute function. 👌
    dice.setAttribute('src',`dice-${randomNumber}.png`);
    if(!dice.checkVisibility())   dice.style.display = 'block';
}
const rollDice = function(){
    if(playing){
        const randomNumber = Math.trunc(Math.random()*6)+1;
        showDice(randomNumber);
        
        if(randomNumber === 1){
            switchPlayer();
        }else{
            if(player0.classList.contains('player--active')){
                currentScoreValue0 += randomNumber;
                currentScore0.textContent = currentScoreValue0;            
            }else{
                currentScoreValue1 += randomNumber;
                currentScore1.textContent = currentScoreValue1;
            } 
        }
    }
}

const hold = function(){ //todo: How to reduce code lines of this function ?
    if(playing){
        let currentPlayer;
        if(player0.classList.contains('player--active')){ 
            // currentPlayer=0;
            scoreValue0 += currentScoreValue0;
            currentScoreValue0 = 0;
            score0.textContent = scoreValue0;
            currentScore0.textContent = currentScoreValue0;
            if(scoreValue0 >= 100){
                console.log('player0 wins!...');
                player0.classList.remove('player--active'); //imp: NOTE:- Don't use dot(.), it is used only in queryselector!!!
                player0.classList.add('player--winner');

                //imp: Logic to diable the click event of rollDice & hold btn
                dice.style.display = 'none';
                playing = false;

            }else switchPlayer();
        }else{
            // currentPlayer=1;
            scoreValue1 += currentScoreValue1;
            currentScoreValue1 = 0;
            score1.textContent = scoreValue1;
            currentScore1.textContent = currentScoreValue1;
            if(scoreValue1 >= 100){
                console.log('player1 wins!...');
                player1.classList.remove('player--active');
                player1.classList.add('player--winner');

                dice.style.display = 'none';
                playing = false; //This will disable the RollDice & hold btn click event.

            }else switchPlayer();
        }
    } 
}
btnNewGame.addEventListener('click', newGame);
btnRolldice.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);



// =============================================================================
/*
// How to change the value of src attribute of img tag ?? ==> using setAttribute()
const dice = document.querySelector('.dice');
console.log(dice, typeof dice);
dice.setAttribute('src', 'dice-1.png');
console.log(dice, typeof dice);
//imp: NOTE the both above console output.
*/


// ==================== Some mistakes Done & Wrong code !!!!!!!!! =======================
/*
if(scoreValue0 >= 10){
    console.log('player0 wins!...');
    player0.classList.remove('player--active'); //imp: NOTE:- Don't use dot(.), it is used only in queryselector!!!
    player0.classList.add('player--winner');

    // Roll dice and hold btn should not have to work.
    rollDice = function(){}
    hold = function(){}
}else switchPlayer();


if(scoreValue0 >= 10){
            console.log('player0 wins!...');
            player0.classList.remove('player--active'); //imp: NOTE:- Don't use dot(.), it is used only in queryselector!!!
            player0.classList.add('player--winner');

            // we can remove addListenerEvent
            btnNewGame.removeEventListener('click', newGame);
            btnHold.removeEventListener('click', hold);

        }else switchPlayer();


if(playing){
    btnRolldice.addEventListener('click', rollDice);
    btnHold.addEventListener('click', hold);
}
*/