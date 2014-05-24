# Let's go over all the fields in config/env.js

```
# Copy env.js to env.js.example
cp config/env.js.example config/env.js
```

Here is a guide for where you find all the fields in your own config/env.js:

```
** To get the googlie info, follow the Getting-Started-Google-Developers-Console.md guide. **
* GOOGLE_CLIENT_ID: The "API & Auth" > "Credentials" page, the "Client ID" of the 'web application' you created above
* GOOGLE_CLIENT_SECRET: Same as above; this is labeled 'client secret'
* GOOGLE_CALLBACK_URL: Use what's in the example
* PASSPORT_SESSION_SECRET: Irrelevant locally. Use whatever you want.
* NODE_ENV: Keep as "dev"
* DATABASE_URL: Chances are this will be right EXCEPT for the part where the example says "floored". The value where "floored" is is your username for your local postgres db. To find this, open up a clean terminal and do `psql boxplot` to launch postgres in the boxplot database, and then do `\du` and grab your "Role name" for this setting.
* SESSION_DATABASE_URL: Same as above; you'll need to replace 'floored'
* PORT: Keep as 8000
* MAILGUN_API_KEY: Follow docs/Getting-Started-Mailgun.md
```