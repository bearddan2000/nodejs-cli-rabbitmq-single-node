let q = 'tasks';
let amqp = require('amqp-connection-manager');

function sleep(ms) {
  if(ms <= 0){
    return
  }
    return new Promise(resolve => setTimeout(resolve, ms));
}

let main = async () => {

    var connection = amqp.connect([
        'amqp://rabbitmq:5672'
    ]);

    var channelWrapper = connection.createChannel({
        json: true,
        setup: function(channel) {
            return channel.assertQueue(q, { durable: true });
        }
    });

    console.log('Starting message stream')
    while (true) {
        await channelWrapper.sendToQueue(q, { value: Math.random() })
        await sleep(100)
    }
}

main();
