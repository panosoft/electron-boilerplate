const initialize = () => {
  // Handle uncaught exceptions
  const {dialog} = require('electron');
  process.on('uncaughtException', error => {
    dialog.showErrorBox('Uncaught Exception', `Error: ${error.message}`);
    process.exit(1);
  });

  // Handle Squirrel Windows startup events
  const squirrelEvent = process.platform === 'win32' ? process.argv[1] : null;
  if (squirrelEvent) {
    const handle = require('./squirrel-event-handler');
    handle(squirrelEvent);
  }
  // Start application
  else {
    const main = require('./main');
    main();
  }
};
initialize();
