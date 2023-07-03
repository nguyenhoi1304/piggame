'use strict';

//selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores,
  currentScore = 0,
  activePlayer,
  playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Xác định lại người đang chơi
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // lấy giá trị roll được ngẫu nhiên
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEl.classList.remove('hidden');

    // hiển thị ảnh theo giá trị roll được
    diceEl.src = `dice-${dice}.png`;

    // 3 check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//
btnHold.addEventListener('click', function () {
  if (playing) {
    //1 Cộng điểm ngừi chơi vào đang hoạt đông
    scores[activePlayer] += currentScore;
    console.log(scores);
    // scores[1] = scores[1] + curentScore
    // scores[0] = scores[0] + curentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2 check xem score  >= 100 , win
    if (scores[activePlayer] >= 20) {
      //finshed
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } win`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3 chuyển ngừi chơi tiếp theo
      switchPlayer();
    }
  }
});
// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();
btnNew.addEventListener('click', init);
