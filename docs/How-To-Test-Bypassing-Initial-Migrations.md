To test:

1. Rename your existing boxplot db, just in case

In psql shell:
`ALTER DATABASE boxplot RENAME TO old_boxplot`

(Valentina must be closed)

2. Create new boxplot db, as if you were just starting out

`createdb boxplot`

3. Run `gulp` to have everything sync'ed / set up for you (this is in the master branch)

4. Load the migration-bypassing SQL

`psql boxplot < migrations/bypass_initial.sql`

5. Trying to run migrations shouldn't do anything

`sequelize -m` should return something like

```
Loaded configuration file "config/config.json".
Using environment "development".
Loaded configuration file "config/config.json".
Using environment "development".
There are no pending migrations.
```

6. Try creating a dummy migration and running it. It shouldn't throw an error.

`sequelize -c testing`
`sequelize -m`
(At this point, your SequelizeMeta table should have a new entry, with id=3)

7. Undo that last migration

`sequelize -m -u`
(The id=3 row should be gone from SequelizeMeta.)
(You should now delete the `migrations/...-testing.js` migration file you just created)

