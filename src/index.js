const initialize = () => {
  // Handle uncaught exceptions
  process.on('uncaughtException', e => console.error(e));

  // Handle native crashing

  const squirrelEvent = process.platform === 'win32' ? process.argv[1] : null;
  if (squirrelEvent) {
    // Handle Squirrel Windows startup event
    const handle = require('./squirrel-event-handler');
    handle(squirrelEvent);
  }
  else {
    // Start application
    const main = require('./main');
    main();
  }
};

initialize();
