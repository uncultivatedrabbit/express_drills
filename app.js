const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

app.get("/sum", (req, res) => {
  const numOne = req.query.a;
  const numTwo = req.query.b;
  const sum = +numOne + +numTwo;
  res.send(`The sum of ${numOne} and ${numTwo} is ${sum}`);
});

app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const textArray = text.split("");

  const shiftedBy = +(req.query.shift);

  const cipher = textArray.map((char) => {
    if (char === char.toUpperCase()) {
      const newUppercaseChar = String.fromCharCode(
        ((char.charCodeAt(0) + shiftedBy - 65) % 26) + 65
      );
      return newUppercaseChar;
    } else {
      const newLowercaseChar = String.fromCharCode(
        ((char.charCodeAt(0) + shiftedBy - 97) % 26) + 97
      );
      return newLowercaseChar;
    }
  });

  res.send(
    `Your text "${text}" when run through the Caesar Cipher becomes: <b>${cipher.join(
      ""
    )}</b>`
  );
});

app.get("/lotto", (req, res) => {
  const enteredNumbers = req.query.arr;
  if (enteredNumbers.length !== 6) {
    return res.status(400).send("Please submit exactly 6 numbers");
  }
  const lottoArray = [];
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.ceil(Math.random() * 20);
    lottoArray.push(randomNumber);
  }
  const commonNumbers = enteredNumbers.filter((num) =>
    lottoArray.includes(Number(num))
  );
  console.log(commonNumbers);
  if (commonNumbers.length < 4) {
    res.send("Sorry, you lose");
  } else if (commonNumbers.length === 4) {
    res.send("Congratulations, you win a free ticket");
  } else if (commonNumbers.length === 5) {
    res.send("Congratulations! You win $100!");
  } else {
    res.send("Wow! Unbelievable! You could have won the mega millions!");
  }
});


app.listen(PORT, () => {
  console.log("app listening on port 8000");
});
