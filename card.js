var slots;

module.exports = {
  loadPayload : loadPayload,
  processNumber : processNumber,
  hasBingo : hasBingo
};

function loadPayload(payload) {
  slots = payload.slots;
  console.log("Welcome, this is your card:");
  console.log(slots);
}

function processNumber(str) {
  console.log('Drew: ' + str);

  var letter = str[0];
  var number = parseInt(str.substring(1), 10);
  var index = slots[letter].indexOf(number);

  if (index >= 0) {
    slots[letter][index] = 'X';
    console.log("Found!");
    console.log(slots);
  }
}

function hasBingo() {
  return hasColumn() || hasRow() || hasDiagonal();
}

function hasColumn() {
  for (var i = 0; i <= 4; i++) {
    var column = [];
    for (var letter in slots) {
      column.push(slots[letter][i]);
    }

    if (checkSet(column)) return true;
  }
  return false;
}

function hasRow() {
  for (var letter in slots) {
    if (checkSet(slots[letter])) return true;
  }
  return false;
}

function hasDiagonal() {
  var letter;

  var i = 0;
  var set = [];
  for (letter in slots) {
    set.push(slots[letter][0]);
    i++;
  }
  if (checkSet(set)) return true;

  i = 4;
  set = [];
  for (letter in slots) {
    set.push(slots[letter][0]);
    i--;
  }
  if (checkSet(set)) return true;

  return false;
}

function checkSet(set) {
  return JSON.stringify(set) === JSON.stringify(['X', 'X', 'X', 'X', 'X']);
}
