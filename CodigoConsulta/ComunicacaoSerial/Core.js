//Modulo para ler da porta usb 
// https://github.com/voodootikigod/node-serialport
var com = require("serialport");



/*
    inicializacao apontando para a porta em que vamos ler
    Essa porta precisara ser trocada para rodar na sua maquina!
    Para descobrir qual a porta no seu computador, de uma olhada
    na IDE do arduino na aba das ports
*/
var serialPort = new com.SerialPort("/dev/tty.usbmodem1421", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });

/*
    \r\n? Esses sao os caracteres que vao separar o serial em partes
    fixas para nossa "funcao"
    Eles vem automaticamente após a msg quando se usa a funcao no arduino
    Serial.println();

    ex:   
    (Comando no arduino)
        Serial.println("Sao tantas arvores");
        Serial.println("Que nem sei se sou de SI ou GA");
    (Stream de dados simplificado que sera recebido)
        [Sao tantas arvores\r\nQue nem sei se sou de SI ou GA]  
    
    Com isso a nossa funcao vai separar o stream em 2 mensagens
    [msg 1]Sao tantas arvores[/msg 1]
    [msg 2]Que nem sei se sou de SI ou GA[/msg 2]
    
    essas mensagens ficam numa fila e sao chamadas pela "funcao"
    que esta abaixo .on, com parametro inicial 'data'!

    Da para entender o que acontece com os metodos abaixo, mas se alguem
    quiser entender o pq de uma funcao como argumento, pesquisar por "closure"



*/


serialPort.on('open',function() {
  console.log('Port open');
});

serialPort.on('data', function(data) {
  console.log(data);
});