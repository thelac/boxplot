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

## TO DO

### User team
- Gmail authentication: https://developers.google.com/gmail/oauth_overview
- Get gmail data
- Sign up, sign in, sign out

### Group team
- Create / view / manage groups
- Charts
- Add user to group

### Backend team
- Local, staging, production
- Database set up
- Deployment set up
- Dev environment (browserify, gulp git)
- Front-end infrastructure
- Analytics
- Error tracking / monitoring

## Working habits
- Work on own branch -> local -> staging -> production
- Small commits
- Pull requests from local to staging -> discussion
- Any and all questions!