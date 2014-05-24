# Getting started with postgresql

```
# Start postgres, start on boot
initdb /usr/local/var/postgres
cp /usr/local/Cellar/postgresql/[POSTGRES VERSION]/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

# Start postgresql server
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

# Stop postgresql server
To stop: pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log stop
```

1. Read [this](https://devcenter.heroku.com/articles/heroku-postgresql)
2. Set up your own database for app data. (You may have already done this in Getting-Started.md)
```
createdb [DB_NAME]
```
NOTE: If you're following Getting-Started.md, DB_NAME is 'boxplot'

3. Set up session database to persist sessions
```
create [SESSION_DB_NAME]
psql [SESSION_DB_NAME] < node_modules/connect-pg-simple/table.sql
```
NOTE: If you're following Getting-Started.md, SESSION_DB_NAME is 'boxplot_session'

# postgresql GUI

Boxplot uses postgresql (psql), which is a type of relational database. You can access and manipulate your database from the command line by doing `psql boxplot`, but this is clunky and requires you to learn the commands.

Alternatively, you can download software to help you interact with psql better. I'm currently trying out [Valentina](http://www.valentina-db.com/en/valentina-studio-overview). If you're going with that, you connect to your local db by doing "Add Bookmark" in the "Servers" section of the start screen, selecting the PostgreSQL type, and then changing "User" to whatever you found in the Google Developers Console env.js step from the above instructions.
