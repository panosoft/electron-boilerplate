const {expect} = require('chai');

describe('main', () => {
	it('app', () => expect(require('electron')).to.include.key('app'));
	it('no window', () => expect(() => {window}).to.throw(ReferenceError));
});
