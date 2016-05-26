const {expect} = require('chai');

describe('renderer', () => {
	it('remote', () => expect(require('electron')).to.include.key('remote'));
	it('window', () => expect(window).to.exist);
});
