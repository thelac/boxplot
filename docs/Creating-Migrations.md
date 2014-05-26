# Changing the Models

When you want to change a model (e.g. adding a column, changing properties of an existing column, adding a table, etc.), you will need to create a migration file.

Sequelize will help you a bit; [here](http://sequelizejs.com/docs/latest/migrations#the-binary) are some basic commands.

Existing migrations are in the `migrations` folder. To create a new migration, do `sequelize -c [migration-name]`.

Open up the new file, and fill in the `up` and `down` section using Sequelize functions found [here](http://sequelizejs.com/docs/latest/migrations#functions). If those functions aren't enough, you can also force Sequelize to execute raw SQL with `db.query(...)` (see example in `up` function in migrations/...-create_tables.js).

To apply your migration file, `sequelize -m`. 

****

To undo the latest migration: `sequelize -m undo`.
