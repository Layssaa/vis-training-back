const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function createRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100000 + 1);
  const randomLetter = letters[Math.floor(Math.random() * 26)];
  const randomSecondLetter = letters[Math.floor(Math.random() * 26)];

  return `${randomNumber}${randomLetter}${randomSecondLetter}`;
}

export { createRandomNumber };
