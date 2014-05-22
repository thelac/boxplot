# Getting started with Google Developers Console

1. Go [here](https://console.developers.google.com)
2. Create a new application
3. Once signed in, go to APIs & auth -> Credentials
4. Click on "Create New Client ID"
    a. For "Javascript Origins" put 'http://127.0.0.1:8000/'
    b. For "Authorized Redirect URI" put 'http://127.0.0.1:8000/auth/google/callback'
4. Fill out config/env.js based on the new Client ID you just created...
