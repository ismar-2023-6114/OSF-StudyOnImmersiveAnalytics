
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('uncaughtException', function (err) {
    console.error(err);
});

emitter.on('mouse_event', function (msg) {
    console.log('mouse_event: ' + msg);
});

function emit(event, txt){
    emitter.emit(event, txt);
}
