# Getting started with Google Developers Console

1. Go [here](https://console.developers.google.com)
2. Create a new application
3. Once signed in, go to APIs & auth -> Credentials
4. Click on "Create New Client ID"
    a. For "Javascript Origins" put 'http://127.0.0.1:8000/'
    b. For "Authorized Redirect URI" put 'http://127.0.0.1:8000/auth/google/callback'
4. Fill out config/env.js based on the new Client ID you just created...

# Let's go over all the fields in config/env.js

Here is a guide for where you find all the fields in your own config/env.js:

* GOOGLE_CLIENT_ID: The "API & Auth" > "Credentials" page, the "Client ID" of the 'web application' you created above
* GOOGLE_CLIENT_SECRET: Same as above; this is labeled 'client secret'
* GOOGLE_CALLBACK_URL: Use what's in the example
* PASSPORT_SESSION_SECRET: (Don't know...)
* NODE_ENV: Keep as "dev"
* DATABASE_URL: Chances are this will be right EXCEPT for the part where the example says "floored". The value where "floored" is is your username for your local postgres db. To find this, open up a clean terminal and do `psql boxplot` to launch postgres in the boxplot database, and then do `\du` and grab your "Role name" for this setting.
* SESSION_DATABASE_URL: Same as above; you'll need to replace 'floored'
* PORT: Keep as 8000
* MAILGUN_API_KEY: (Not needed unless you're deploying?)
