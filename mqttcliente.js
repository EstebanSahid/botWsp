var net = require('net');
var mqttCon = require('mqtt-connection');
var stream = net.createConnection(1883, 'localhost');
var conn = mqttCon(stream);

let option2 = {
    messageId: 1,
    subscriptions: [{
        topic: "prueba",
        qos: 0
    }]
};
conn.subscribe(option2, function(){
    //console.log("subscrito xxx");
});

//conn.pingreq()
let option = {
    topic: "prueba",
    payload: "Mensaje normal 2"
};
conn.publish(option, function(){
    console.log("exitoso");
});

//console.log();