//Modulos
var readline = require('readline'); //Pega input do terminal
var fs = require('fs'); //File System

//configuracao 
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//metodos para exportar
module.exports = {
    //Valida o numero de acordo com algum parametro
    verifica: function (numeroEnviadoPeloArduino, serialPort){
        rl.question(numeroEnviadoPeloArduino + " é valido? (Y/N)\n", function(answer) {
            if(answer == "Y"){
                //Sinal para abrir portao.            
                serialPort.write("S"); //byte = 83
                console.log("Portao foi aberto!\n");
                addLog("ID:" + numeroEnviadoPeloArduino + " Acesso Permitido!");

            }else{
                console.log("Permissao Negada!\n");
                addLog("ID:" + numeroEnviadoPeloArduino + " Acesso Negado!");
            } 
            serialPort.flush();
            serialPort.resume();
        });
    },

    //Fecha o processo que faz a leitura das linhas
    dispose: function (){
        rl.close();
    }   
};




//Funcoes privadas do modulo
function addLog(conteudo){
    var msg = conteudo + "  " + getTimeStamp() + "\n";
    fs.appendFile(__dirname + "/../resources/dados/Log.txt", msg, function (err) {
        if(err){
            return console.log(err);
        }
        console.log(conteudo);
    });
}

function getTimeStamp() {
    var now = new Date();
    return ((now.getDate()) + '/' +
            (now.getMonth() + 1) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}


