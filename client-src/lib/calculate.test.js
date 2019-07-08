import calculate from "./calculate";

describe("calculate", function() {
  function expectFromButtons(buttons, expected) {
    const relevantState = {
      total: "0",
      next: "0",
      operation: null,
    };
    buttons.forEach((button,x) => {
      Object.assign(relevantState, calculate(relevantState, button));
    });

    Object.keys(relevantState).forEach(key => {
      if (relevantState[key] === "0" || !relevantState[key]) {
        delete relevantState[key];
      }
    });
  
      expect({
        buttons,
        state: relevantState
      }).toEqual({
        buttons,
        state: expected
      });
  }

  test('numbers', ()=>{
    expectFromButtons(["6"], { next: "6" });
    expectFromButtons(["6", "6"], { next: "66" });
    expectFromButtons(["0", ".", "4"], {
      next: "0.4",
    });
    expectFromButtons([".", "4"], {
      next: "0.4",
    });
  })

  test('addition', ()=>{
    expectFromButtons(["6", "+", "6"], {
      next: "6",
      total: "6",
      operation: "+",
    });
    expectFromButtons(["6", "+", "6", "="], {
      total: "12",
    });
    expectFromButtons(["0", "0", "+", "0", "="], {
      "operation": "+",
    });
    expectFromButtons(["6", "+", "6", "=", "9"], {
      total: "12",
      next: "9",
    });
    expectFromButtons(["3", "+", "6", "=", "+"], {
      total: "9",
      operation: "+",
    });
    expectFromButtons(["3", "+", "6", "=", "+", "9"], {
      total: "9",
      operation: "+",
      next: "9",
    });
    expectFromButtons(["3", "+", "6", "=", "+", "9", "="], {
      total: "18",
    });
    expectFromButtons(["3", "+", "=", "3", "="], {
      next: "3",
      total: "3",
    }); // ?
    expectFromButtons(["+"], {
      operation: "+",
    });
    expectFromButtons(["+", "2"], {
      next: "2",
      operation: "+",
    });
    expectFromButtons(["+", "2", "+"], {
      total: "2",
      operation: "+",
    });
    expectFromButtons(["+", "2", "+", "+"], {
      total: "2",
      operation: "+",
    });
    expectFromButtons(["+", "2", "+", "5"], {
      next: "5",
      total: "2",
      operation: "+",
    });
    expectFromButtons(["+", "2", "5"], {
      next: "25",
      operation: "+",
    });
    expectFromButtons(["+", "2", "5"], {
      next: "25",
      operation: "+",
    });
    expectFromButtons(["+", "6", "+", "5", "="], {
      total: "11",
    });  
  })

  test('subtraction', ()=>{
    expectFromButtons([".", "4", "-", ".", "2"], {
      total: "0.4",
      next: "0.2",
      operation: "-",
    });
    expectFromButtons([".", "4", "-", ".", "2", "="], {
      total: "0.2",
    });
  })

  test('AC', ()=>{
    expectFromButtons(["1", "+", "2", "AC"], {});
    expectFromButtons(["+", "2", "AC"], {});
  })

  test('multiplication', ()=>{
    expectFromButtons(["2", "x", "x"], {
      total: "2",
      operation: "x"
    });
  })

  test('division', ()=>{
    expectFromButtons(["2", "÷", "÷"], {
      total: "2",
      operation: "÷"
    });
  })

  test('multiple operartors', ()=>{
    expectFromButtons(["2", "÷", "x", "+", "-", "x"], {
      total: "2",
      operation: 'x'
    });
  })
});
