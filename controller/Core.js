//Modulos
var com = require("serialport");
var readline = require('readline');
var fs = require('fs');


//Configuracoes
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var serialPort = new com.SerialPort("/dev/tty.usbmodem1421", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });



//Eventos da Porta Serial
serialPort.on('open',function() {
    iniciaNovoArquivoDeDados();
    console.log('Conectado :)');
});

serialPort.on('data', function(data) {
    serialPort.pause();    
    verifica(data);
});

serialPort.on('close', function(data) {
    rl.close();
});



/*
    Esse numero(argumento) do método verifica
    devera ser o Id do cartao USP
    
    A base será verificar se é um ID válido para
    o acesso, gravar o timestamp e possivelmente mandar
    o sinal para o arduino abrir a porta!
    
    temporariamente a verificacão sera feita manualmente
    pelo terminal.

*/

function verifica(numeroEnviadoPeloArduino){
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
            

            
        serialPort.resume();
        serialPort.flush();
    });
}


//funcao apaga o conteudo do arquivo ou cria se não existe
function iniciaNovoArquivoDeDados(){
    fs.writeFile(__dirname + "/../resources/dados/Log.out", "", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Arquivo alvo!");
    }); 
}


function addLog(conteudo){
    var msg = conteudo + "  " + getTimeStamp() + "\n";
    fs.appendFile(__dirname + "/../resources/dados/Log.out", msg, function (err) {
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

