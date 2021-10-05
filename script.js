const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const clipboardEl = document.getElementById('clipboard');
const generateEl = document.getElementById('generate');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Event listeners
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = true;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  resultEl.innerText = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol
  );
});

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard!');
});

// Functions
function generatePassword(length, lower, upper, number, symbol) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [
    { lower: lower },
    { upper: upper },
    { number: number },
    { symbol: symbol },
  ].filter((i) => Object.values(i)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  // random number between 97-122
  const randomLower = getRandomInt(97, 123);
  return String.fromCharCode(randomLower);
}
function getRandomUpper() {
  // random number between 65-90
  const randomUpper = getRandomInt(65, 91);
  return String.fromCharCode(randomUpper);
}
function getRandomNumber() {
  // random number between 48-57
  const randomNumber = getRandomInt(48, 58);
  return String.fromCharCode(randomNumber);
}
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min); // rounds the number up
  max = Math.floor(max); // rounds the number down
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//https://www.w3schools.com/charsets/ref_html_ascii.asp
