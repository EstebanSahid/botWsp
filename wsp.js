const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
//const client = new Client();

const client = new Client({ authStrategy: new LocalAuth(), puppeteer: { headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']} });

console.log("iniciando");

client.on('qr', qr => {
    console.log("procesando qr");
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    //const number = "+593993318814";

  // Your message.
    //const text = "Hola saludos, en que te puedo ayudar?";

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    //const chatId = number.substring(1) + "@c.us";

    // Sending message.
    //client.sendMessage(chatId, text);

    const express = require('express');
    const app = express();
    const cors = require('cors');
    const serveIndex = require('serve-index');
    const fs = require('fs');
    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };

    //const server = require('https').createServer(options, app);
    const server = require('http').createServer(app);
    app.use(cors());
    app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));
    app.use(express.json());

    /*app.get('/prueba', (req, res) => {
        client.sendMessage(chatId, "Mensaje de Prueba");
        res.json("Hola");
    });*/

    app.post('/enviar', (req, res) => {
        let destino = req.body.destino;
        let mensaje = req.body.mensaje;

        let chatId = destino.substring(1) + "@c.us";

        client.sendMessage(chatId, mensaje);
        res.json("enviado");
    });

   app.get('/prueba', (req, res) => {
        let destino = '+584127365837';
        let mensaje = 'funciona';

        let chatId = destino.substring(1) + "@c.us";

        client.sendMessage(chatId, mensaje);
        res.json("enviado");
    });

   app.get('/prueba2', (req, res) => {
        let destino = '584127365837';
        let mensaje = 'funciona';

        let chatId = destino.substring(1) + "@c.us";

        client.sendMessage(chatId, mensaje);
        res.json("enviado");
    });

   app.get('/prueba3', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Funcionando \n');
    });

    app.all('*', (req, res, next) => {
        res.json("Defecto");
    });

    server.listen(3005, () => console.log('Conectado puerto 3005'));
});

client.initialize();
console.log("proceso");

client.on('message', message => {
	//console.log(message.body);
    //client.sendMessage(message.from, '*¡Bienvenidos a IEH! Pronto automatizaremos el servicio.*');
});
