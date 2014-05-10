inboxr
======

## Installation from scratch
```
# Install homebrew
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

# Install the basics
brew install git
brew install hub
brew install node

hub clone thelac/inboxr
cd inboxr

# Install inboxr-specific stuff
npm install gulp
npm install
```

Install [this](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) Chrome plug-in to enable LiveReload.

To run, type 'gulp' in console in inboxr directory.

## Getting up to speed
- [Express.js](http://expressjs.com/guide.html); Node in Action is the official node-express book
- [Firebase](https://www.firebase.com/docs/)
- [Dust.js](http://akdubya.github.io/dustjs/) and [LinkedIn](https://github.com/linkedin/dustjs/wiki/Dust-Tutorial)'s version
- [Bootstrap](http://getbootstrap.com/getting-started/)

## How stuff works and where stuff is
- TODO: server, client, routes, views, utils, public; gulp vs node

## Style guide

## To Do
- Add gulp git commands (e.g., stage and publish)
- Move oauth out of google spreadsheet
- Add foundation
- Add backend
- Create new group
- Add to group
- add browserify / watchify

## Completed
- Sort table
- Add line chart: d3 or http://www.humblesoftware.com/finance/index