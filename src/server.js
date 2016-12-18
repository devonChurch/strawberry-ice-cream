console.log('version 0.0.1');

require('./express/initialise');
console.log('express has initialised');

require('./socketio/initialise');
console.log('socketio has initialised');
//
require('./mongo/initialise');
console.log('mongo has initialised');
