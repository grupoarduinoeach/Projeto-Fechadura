//Modulos
var com = require("serialport");
var readline = require('readline');

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

        }else 
            console.log("Permissao Negada!\n");
            
        serialPort.resume();
        serialPort.flush();
    });

}

