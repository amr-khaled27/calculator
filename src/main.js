document.querySelectorAll(`[effect="ripple"]`).forEach((el) => {
  el.addEventListener("click", (e) => {
    e = e.touches ? e.touches[0] : e;
    const r = el.getBoundingClientRect(),
      d = 500;
    el.style.cssText = `--s: 0; --o: 1;`;
    el.offsetTop;
    el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
      e.clientX - r.left
    }; --y:${e.clientY - r.top};`;
  });
});

class Calculator {
  constructor(prev_num, current_num, equal) {
    this.prev_num = prev_num;
    this.current_num = current_num;
    this.equal = false;
    this.clear();
  }

  clear() {
    this.current_num = "";
    this.prev_num = "";
    prevNum.innerText = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    try {
      this.current_num = this.current_num.slice(0, -1);
      this.updateDisplay();
    } catch (error) {}
  }

  appendNumber(number) {
    if (number !== ".") this.current_num += number;
    else if (!this.current_num.includes(".")) this.current_num += number;
  }

  chooseOp(operation) {
    this.equal = false;
    if (this.current_num == "") return;
    if (this.prev_num != "") {
      this.compute();
    }
    this.operation = operation;
    this.prev_num = this.current_num;
    this.current_num = "";
    this.updateDisplay();
  }

  compute() {
    let sum;
    const prev = parseFloat(this.prev_num);
    const current = parseFloat(this.current_num);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        sum = prev + current;
        break;
      case "-":
        sum = prev - current;
        break;
      case "✕":
        sum = prev * current;
        break;
      case "/":
        sum = prev / current;
        break;

      default:
        break;
    }
    this.current_num = sum;
    this.prev_num = "";
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) integerDisplay = "";
    else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null)
      return `${integerDisplay}.${decimalDigits.slice(0, 2)}`;
    else return integerDisplay;
  }

  updateDisplay() {
    screen.innerText = this.getDisplayNumber(this.current_num);
    if (this.operation !== undefined) {
      prevNum.innerText =
        this.getDisplayNumber(this.prev_num) + " " + this.operation;
    }
  }
}

const screen = document.querySelector(".screen");
const prevNum = document.querySelector(".prevNum");
const nums = document.querySelectorAll("[data-btn]");
const ops = document.querySelectorAll("[op]");
const del = document.querySelector(".del");
const equal = document.querySelector("[equal]");
const clear = document.querySelector("[clear]");

const calc = new Calculator(screen);

const calcFunction = () => {
  calc.equal = true;
  calc.compute();
  prevNum.innerText = "";
  calc.updateDisplay();
};

const enterNum = (btn) => {
  if (calc.equal) {
    calc.clear();
    calc.equal = false;
    calc.appendNumber(btn.innerText);
    calc.updateDisplay();
  } else {
    calc.appendNumber(btn.innerText);
    calc.updateDisplay();
  }
};

nums.forEach((btn) => {
  btn.addEventListener("click", () => {
    enterNum(btn);
  });
});

ops.forEach((btn) => {
  btn.addEventListener("click", () => {
    calc.chooseOp(btn.innerText);
  });
});

del.addEventListener("click", () => {
  calc.delete();
});

equal.addEventListener("click", () => {
  calcFunction();
});

clear.addEventListener("click", () => {
  calc.clear();
});

const handleKeyboard = (e) => {
  nums.forEach((btn) => {
    if (btn.innerText === e.key) {
      enterNum(btn);
    }
  });

  ops.forEach((btn) => {
    if (e.key === "*") {
      calc.chooseOp("✕");
    } else if (btn.innerText === e.key) {
      calc.chooseOp(e.key);
    }
  });

  if (e.key === "=") {
    calcFunction();
  }

  if (e.key === "Backspace") {
    calc.delete();
  }
};

document.getElementsByTagName("html")[0].addEventListener("keyup", (e) => {
  handleKeyboard(e);
});
