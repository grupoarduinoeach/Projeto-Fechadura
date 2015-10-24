// https://nodejs.org/docs/latest/api/fs.html
var fs = require('fs');

// __dirname -> constante com o path para o diretorio do script

fs.writeFile(__dirname + "/dados", "Ola!\n", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Arquivo alvo!");
}); 


//cria o arquivo tambem, caso ele nao exista
fs.appendFile( __dirname + "/dados", 'informacao para concatenar\n', function (err) {
	if(err){
        return console.log(err);
    }
	console.log("Arquivo concatenado!");

});