
export default function operate(arg1String, arg2String, operation) {
  let result = parseFloat(arg1String || "0");
  if (operation === "+") {
    result = result + parseFloat(arg2String || "0");
  } else if (operation === "-") {
    result = result - parseFloat(arg2String || "0");
  } else if (operation === "x") {
    result = result * parseFloat(arg2String || "1");
  } else if (operation === "÷") {
    result = result / parseFloat(arg2String || "1");
  } else {
    throw new Error(`Unknown operation '${operation}'`);
  }
  if (Number.isFinite(result)){
    return result.toString()
  } else {
    throw new Error('invalid operation: ' + arg1String + operation + arg2String);  
  }
}
