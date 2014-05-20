# Getting started

```
# Install homebrew
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

# Install the basics
brew install wget
brew install git
brew install hub
brew install node

# Install postgres
brew install postgres

# Start postgres, start on boot
initdb /usr/local/var/postgres
cp /usr/local/Cellar/postgresql/[POSTGRES VERSION]/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
# To stop: pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log stop

# Create postgres db with no user or pass
createdb boxplot

# Install heroku toolkit (optional; for deploy)
brew tap phinze/cask
brew install brew-cask
brew cask install --appdir="/Applications" heroku-toolbelt

hub clone thelac/inboxr
cd inboxr

# Install inboxr-specific stuff
npm install gulp
npm install

# Set up config/env.json by copying file and filling out
# See docs/Getting-Started-Google-Developers-Console.md
cp config/env.json.example env.json

# Start the server
gulp

# To check if things are working, point your browser to localhost:8000
```

## Getting up to speed
- [Express.js](http://expressjs.com/guide.html); Node in Action is the official node-express book
- [Firebase](https://www.firebase.com/docs/)
- [Nunjucks.js](http://mozilla.github.io/nunjucks/templating)
- [Bootstrap](http://www.sitepoint.com/twitter-bootstrap-tutorial-handling-complex-designs/) and [here](http://getbootstrap.com/css/)