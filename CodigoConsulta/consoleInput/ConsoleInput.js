var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Qual proximo comando? ", function(answer) {
  console.log("Você quem manda!! Então que seja, ", answer);

  rl.close();
});


a();
