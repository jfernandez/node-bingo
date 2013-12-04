var socket = require('socket.io-client');
var client = socket.connect('ws://yahoobingo.herokuapp.com');
var card   = require('./card');

var payload = {
  name: "Jose Fernandez",
  email: "jose@newrelic.com",
  url: "foo"
};

client.emit('register', payload);

client.on('connect', function () {
  console.log("Connected to server");
});

client.on('card', function (payload) {
  card.loadPayload(payload);
});

client.on('number', function (number) {
  card.processNumber(number);
  if(card.hasBingo()) client.emit('bingo');
});

client.on('win', function () {
  console.log("Won bingo!");
});

client.on('lose', function () {
  console.log("Lost bingo!");
});

client.on('disconnect', function () {
  console.log("Disconnected from server");
});
