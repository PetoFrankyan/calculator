const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value === "clear") {
      input = "";
      updateDisplay();
    } else if (value === "brackspace") {
      input = input.slice(0, -1);
      updateDisplay();
    } else if (value === "=") {
      calculateResult();
    } else {
      handleInput(value);
    }
  });
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "-",
    "*",
    "/",
    "(",
    ")",
    "%",
    "Enter",
    "Backspace",
    "Escape",
  ];

  if (validKeys.includes(key)) {
    event.preventDefault();
    if (key === "Enter") {
      calculateResult();
    } else if (key === "Backspace") {
      input = input.slice(0, -1);
      updateDisplay();
    } else if (key === "Escape") {
      input = "";
      updateDisplay();
    } else {
      handleInput(key);
    }
  }
});

function updateDisplay() {
  displayInput.innerHTML = cleanInput(input);
  displayOutput.innerHTML = "";
}

function calculateResult() {
  try {
    const result = new Function("return " + prepareInput(input))();
    displayOutput.innerHTML = cleanOutput(result);
  } catch (error) {
    displayOutput.innerHTML = "Error";
  }
}

function handleInput(value) {
  if (validateInput(value)) {
    input += value;
    updateDisplay();
  }
}

function cleanInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "*") {
      input_array[i] = '<span class="operator">x</span>';
    } else if (input_array[i] === "/") {
      input_array[i] = '<span class="operator">/</span>';
    } else if (input_array[i] === "+") {
      input_array[i] = '<span class="operator">+</span>';
    } else if (input_array[i] === "-") {
      input_array[i] = '<span class="operator">-</span>';
    } else if (input_array[i] === "(") {
      input_array[i] = '<span class="openbracket">(</span>';
    } else if (input_array[i] === ")") {
      input_array[i] = '<span class="closebracket">)</span>';
    } else if (input_array[i] === "%") {
      input_array[i] = '<span class="precent">%</span>';
    }
  }
  return input_array.join("");
}

function cleanOutput(output) {
  let output_string = output.toString();

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      console.log(i);
      output_array.splice(i, 0, ",");
    }
  }

  return output_array.join("");
}

function validateInput(value) {
  let last_Input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value === "." && last_Input === ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_Input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function prepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
