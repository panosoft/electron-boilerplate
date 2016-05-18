const expect = require('chai').expect;

describe('main', () => {
	it('app', () => { expect(require('electron')).to.include.key('app') });
	it('no window', () => { expect(() => {window}).to.throw(ReferenceError); });
});
