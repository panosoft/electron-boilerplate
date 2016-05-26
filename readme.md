# Electron Boilerplate

> Boilerplate for an [Electron](http://electron.atom.io/) app

## Usage

Get started on your Electron app by doing the following:

- Create an app directory.
- Copy the contents of this repository's `boilerplate` directory to your app directory.
- Edit the copied files to configure your app.

## Description

The app configuration can be found in the following files:

- `package.json`: name (can't be scoped), productName, description (required), author (required), repository, license
- `license`: copyright (current year, your name)
- `tasks/build.js`: platform, osx-sign
- `tasks/pack-mac.js`: specification
- `tasks/publish.js`: token, owner, repo

This boilerplate also presumes the use of the [Nuts](https://github.com/GitbookIO/nuts) release version server.
