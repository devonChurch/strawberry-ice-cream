require('./express/initialise');
console.log('express has initialised');

require('./socketio/send');
console.log('socketio has initialised');

require('./mongo/initialise');
console.log('mongo has initialised');
