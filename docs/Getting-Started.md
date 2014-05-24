# Getting started

1. Do some initial installations

```
# Install homebrew
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

# Install the basics
brew install git
brew install hub
brew install node

alias git=hub
npm install -g gh

# Install postgres
brew install postgres

# Get the current boxplot code from Github
git clone thelac/boxplot
cd boxplot

# Install boxplot-specific stuff
npm install gulp
npm install
```

2. Fill out your new env.json file by following docs/Getting-Started-env-js.md
3. Create your local postgres databases by following docs/Getting-Started-PGSQL.md
4. Set up mailgun api by following docs/Getting-Started-Mailgun.md
5. See docs/Getting-Started-Google-Developers-Console.md and follow those instructions
6. (Optional) Get set up on Heroku using docs/Getting-Started-Heroku.md
7. Start the server

```
gulp

# To check if things are working, point your browser to localhost:8000
```

## Getting up to speed
- [Express.js](http://expressjs.com/guide.html); Node in Action is the official node-express book
- [Firebase](https://www.firebase.com/docs/)
- [Nunjucks.js](http://mozilla.github.io/nunjucks/templating)
- [Bootstrap](http://www.sitepoint.com/twitter-bootstrap-tutorial-handling-complex-designs/) and [here](http://getbootstrap.com/css/)
