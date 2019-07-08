import operate from "./operate";

function reset() {
  return {
    total: "0",
    next: "0",
    operation: null,
  }
}

function handleNumber(state, buttonName) {
  if (buttonName === "0" && state.next === "0") {
    return {
      ...state,
    };
  }
  let next = buttonName
  if (state.next !== "0"){
    next = state.next + buttonName
  }

  return { 
    ...state,
    next
  };
}

function handleDecimal(state, buttonName){
  let total = state.total
  if (!state.operation){
    total = "0"
  }
  if (state.next !== "0") {
    if (state.next.includes(".")) {
      return {
        ...state,
        total,
      };
    }
    return { 
      ...state,
      next: state.next + ".",
      total,
    };
  }
  return { 
    ...state,
    next: "0.",
    total
  };
}

function handleSignChange(state, buttonName){
  if (state.next !== "0") {
    return { 
      ...state,
      next: (-1 * parseFloat(state.next)).toString() 
    };
  }
  if (state.total !== "0") {
    return { 
      ...state,
      total: (-1 * parseFloat(state.total)).toString()
    };
  }
  return {
    ...state,
  };
}

export default function calculate(state, buttonName) {
  if (buttonName === "AC") {
    return reset();
  }

  if (/[0-9]+/.test(buttonName)) {
    return handleNumber(state, buttonName)
  }

  if (buttonName === ".") {
    return handleDecimal(state, buttonName)
  }

  if (buttonName === "+/-") {
    return handleSignChange(state, buttonName)
  }

  if (buttonName === "=") {
    if (state.operation && state.total != "0") {
      return {
        ...reset(),
        total: operate(state.total, state.next, state.operation),
      };
    } else {
      return {
        ...state,
      };
    }
  }

  // +, -, /, * only
  if (state.next != "0" && state.operation){
    return {
      total: operate(state.total, state.next, state.operation),
      next: "0",
      operation: buttonName,
    };
  } else if (state.next != "0"){
    return {
      total: state.next,
      next: "0",
      operation: buttonName,
    }
  } else {
    return {
      ...state,
      operation: buttonName,
    }
  }



  // // no operation yet, but the user typed one

  // // The user hasn't typed a number yet, just save the operation
  // if (!state.next == "0") {
  //   return { operation: buttonName };
  // }

  // // save the operation and shift 'next' into 'total'
  // return {
  //   total: state.next,
  //   next: "0",
  //   operation: buttonName,
  // };
}