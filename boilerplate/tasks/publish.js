const glob = require('glob');
const pkg = require('../package');
const publishRelease = require('publish-release')

const options = {
  token: process.env.GITHUB_TOKEN,
  owner: 'user',
  repo: 'repo',
  tag: `v${pkg.version}`,
  name: `v${pkg.version}`,
  notes: '',
  draft: false,
  prerelease: false,
  reuseRelease: true,
  reuseDraftOnly: false,
  assets: glob.sync('dist/packages/*')
};
const publisher = publishRelease(options, (error, release) => {
  if (error) console.error(error);
	else console.log(`Release published: ${release.html_url}`);
});
publisher.on('create-release', () => console.log('Publishing release ...'));
publisher.on('upload-asset', name => console.log(`Uploading: ${name}`));
