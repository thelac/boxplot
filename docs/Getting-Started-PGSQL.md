# Getting started with postgresql

1. Read [this](https://devcenter.heroku.com/articles/heroku-postgresql)
2. Set up your own database for app data
```
createdb [DB_NAME]
```
3. Set up session database to persist sessions
```
psql [SESSION_DB_NAME] < node_modules/connect-pg-simple/table.sql
```