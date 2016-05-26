const {Application} = require('spectron');
const {expect} = require('chai');

describe('Application launch', function () {
  this.timeout(10000);
	let app;
  beforeEach(() => {
    app = new Application({ path: 'node_modules/.bin/electron', args: ['.'] });
    return app.start();
  });
  afterEach(() => {
    if (app && app.isRunning()) return app.stop();
  });
  it('shows main window and devtools', () =>
    app.client.getWindowCount().then(count => expect(count).to.equal(2))
  );
})
