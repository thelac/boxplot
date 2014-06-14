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


# Migrating

**Background:** Over time, the tables and columns in the database will change as we work on Boxplot. When you make a change to the structure of the database, you have to create a *migration* file that describes the change you're making. Other people working on the code can then apply the migration files to their own local databases to reflect your change.

(You may see that Sequelize has some built-in tools that automatically sync your database. There are 2 problems with this. One is that it will not automatically sync column changes in existing tables. A second is that if you sync with force=True, it will wipe your data.)

**To apply migrations to your database:**
1. Go to config/config.json.example and save as config/config.js
2. In the "development" section of config/config.js, change your username and password to reflect your own settings.
3. Run the following: `sequelize -m` This will run all existing migrations.

**NOTE: If you set everything up prior to ~June 1,** you will likely have an existing local database with local data. You want to get your database into a state where it'll work nicely with future migrations. To do that:
1. Stop running Gulp
2. Run this in your Terminal: `psql boxplot < migrations/bypass_initial.sql` (make sure you've git pulled that file down)
3. To make sure it worked, check to see if you have a new SequelizeMeta table in your database, with 2 rows in it.
4. Run `sequelize -m` and hope you don't trigger any errors!


# postgresql GUI

Boxplot uses postgresql (psql), which is a type of relational database. You can access and manipulate your database from the command line by doing `psql boxplot`, but this is clunky and requires you to learn the commands.

Alternatively, you can download software to help you interact with psql better. I'm currently trying out [Valentina](http://www.valentina-db.com/en/valentina-studio-overview). If you're going with that, you connect to your local db by doing "Add Bookmark" in the "Servers" section of the start screen, selecting the PostgreSQL type, and then changing "User" to whatever you found in the Google Developers Console env.js step from the above instructions.


