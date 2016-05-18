const expect = require('chai').expect;

describe('renderer', () => {
	it('remote', () => { expect(require('electron')).to.include.key('remote') });
	it('window', () => { expect(window).to.exist; });
});
