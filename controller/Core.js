//Modulos
var com = require('serialport'); 
var express = require('express'); //FrameWork geral para http requests
var path = require('path'); //Seguranca com acesso a arquivos
var validacao = require('./Validacao');


//Configuracoes
var serialPort = new com.SerialPort("/dev/tty.usbmodem1421", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
});

var app = express();
app.use(express.static(__dirname + "/../"));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});




//Eventos do Express
app.get('/', function (req, res) {

    fs.readFile(__dirname + "/../resources/dados/Log.txt", 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        res.send(data);

    });
});


//Eventos da Porta Serial
serialPort.on('open',function() {
    iniciaNovoArquivoDeDados();
    console.log('Conectado :)');
});

serialPort.on('data', function(data) {
    serialPort.pause();    
    validacao.verifica(data, serialPort);
});

serialPort.on('close', function(data) {
    validacao.dispose();
});



//Metodos Gerais

/*
    Esse numero(argumento) do método verifica
    devera ser o Id do cartao USP
    
    A base será verificar se é um ID válido para
    o acesso, gravar o timestamp e possivelmente mandar
    o sinal para o arduino abrir a porta!
    
    temporariamente a verificacão sera feita manualmente
    pelo terminal.

*/


//Funcoes Auxiliares

//funcao apaga o conteudo do arquivo ou cria se não existe
function iniciaNovoArquivoDeDados(){
    fs.writeFile(__dirname + "/../resources/dados/Log.txt", "", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Arquivo alvo!");
    }); 
}

