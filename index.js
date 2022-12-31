var eq = ""; //eq will store the current equation
var curNumber = ""; //will store the current number being entered,
var entry = ""; // entry will store the value of the button that was clicked,
var reset = false; //reset is a flag that will be used to reset the calculator after an operation has been performed.
var result = 0;
//function to evalualuate eq


function split(string) {
  let splitString = [];
  let currentChar = "";
  for (let char of string) {
    if (char === "+" || char === "-" || char === "*" || char === "/") {
      splitString.push(currentChar);
      splitString.push(char);
      currentChar = "";
    } else {
      currentChar += char;
    }
  }
  splitString.push(currentChar);
  return splitString;
  console.log(splitString);
}

function calculate(eq) {
  var eqArray = split(eq);

  var total = parseFloat(eqArray[0]);

  for (var i = 1; i < eqArray.length; i += 2) {
    if (eqArray[i] === "+") {
      total += parseFloat(eqArray[i + 1]);
    } else if (eqArray[i] === "-") {
      total -= parseFloat(eqArray[i + 1]);
    } else if (eqArray[i] === "*") {
      total *= parseFloat(eqArray[i + 1]);
    } else if (eqArray[i] === "/") {
      total /= parseFloat(eqArray[i + 1]);
    }
  }
  return total.toFixed(2);
}



$("button").click(function() {
  entry = $(this).attr("value");

  if (entry === "ac") {
    entry = 0;
    eq = 0;
    result = 0;
    curNumber = 0;
    $('#result p').html(entry);
    $('#previous p').html(eq);
  } else if (entry === "ce") {
    if (eq.length > 1) {
      eq = eq.slice(0, -1);
      $('#previous p').html(eq);
    } else {
      eq = 0;
      $('#result p').html(0);
    }

    $('#previous p').html(eq);

    if (curNumber.length > 1) {
      curNumber = curNumber.slice(0, -1);
      $('#result p').html(curNumber);
    } else {
      curNumber = 0;
      $('#result p').html(0);
    }

  } else if (entry === "=") {
    result = calculate(eq);
    $('#result p').html(result);
    eq += "=" + result;
    $('#previous p').html(eq);
    eq = result;
    entry = result;
    curNumber = result;
    reset = true;
  } else if (isNaN(entry)) { //check if is not a number, and after that, prevents for multiple "." to enter the same number
    if (entry !== ".") {
      reset = false;
      if (curNumber === 0 || eq === 0) {
        curNumber = 0;
        eq = entry;
      } else {
        curNumber = "";
        eq += entry;
      }
      $('#previous p').html(eq);
    } else if (curNumber.indexOf(".") === -1) {
      reset = false;
      if (curNumber === 0 || eq === 0) {
        curNumber = 0.;
        eq = 0.;
      } else {
        curNumber += entry;
        eq += entry;
      }
      $('#result p').html(curNumber);
      $('#previous p').html(eq);
    }
  } else {
    if (reset) {
      eq = entry;
      curNumber = entry;
      reset = false;
    } else {
      eq += entry;
      curNumber += entry;
    }
    $('#previous p').html(eq);
    $('#result p').html(curNumber);
  }


  if (curNumber.length > 10 || eq.length > 26) { //limit the digits
    $("#result p").html("0");
    $("#previous p").html("Too many digits");
    curNumber = "";
    eq = "";
    result = "";
    reset = true;
  }

  if (result.indexOf(".") !== -1) {
    result = result.Math.trunc();
  }

});
