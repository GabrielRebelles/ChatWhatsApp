let events = require('events');
let eventEmitter = new events.EventEmitter(); 

//crea una sola instancia del EventEmitter y la exporta 
//asi todos los archivos que importen, usan la misma instancia y comparten eventos 

module.exports=eventEmitter