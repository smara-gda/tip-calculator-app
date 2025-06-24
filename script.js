// Select DOM elements
const billInput = document.getElementById('amount');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tips-btn');
const customTipInput = document.getElementById('custom');
const tipAmountDisplay = document.querySelector('.tip-pp .tip-amnt');
const totalAmountDisplay = document.querySelector('.tip-total .tip-amnt');
const resetButton = document.querySelector('.reset-calculation');

let bill = 0;
let people = 1;
let tipPercent = 0;

// Helper to calculate and update UI
function calculate() {
  if (people < 1) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    return;
  }
  const tip = (bill * tipPercent) / 100;
  const tipPerPerson = people ? tip / people : 0;
  const totalPerPerson = people ? (bill + tip) / people : 0;
  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Event listeners for bill input
billInput.addEventListener('input', (e) => {
  bill = parseFloat(e.target.value) || 0;
  calculate();
});

// Event listeners for people input
peopleInput.addEventListener('input', (e) => {
  people = parseInt(e.target.value) || 1;
  calculate();
});

// Tip button click
tipButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tipButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    tipPercent = parseInt(btn.textContent) || 0;
    customTipInput.value = '';
    calculate();
  });
});

// Custom tip input
customTipInput.addEventListener('input', (e) => {
  tipButtons.forEach((b) => b.classList.remove('active'));
  tipPercent = parseFloat(e.target.value) || 0;
  calculate();
});

// Reset button
resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipButtons.forEach((b) => b.classList.remove('active'));
  bill = 0;
  people = 1;
  tipPercent = 0;
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
});
