const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('prueba', function (err) {
    if (!err) {
      client.publish('prueba', 'Hello mqtt33')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("x1");
  console.log(message.toString())
  client.end()
})