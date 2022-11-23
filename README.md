# Setup

## Backend
### Dependencies
`channels-redis` is required to handle the multi-asynchronous channeling of this app.
Install it using the following command
```
$ pip install channels-redis
```

`pipenv` is required for ensuring the same python environment. Install it using
```
$ sudo apt install pipenv 
```
### Environment and server startup
Backend is situated in the directory `sketchup_backend/`
Change directory to `sketchup_backend`, run commands
```
$ pipenv shell
$ pipenv sync
$ python3 manage.py migrate
$ python3 manage.py runserver
```

## Frontend
### Dependencies
`react` and `npm` are the dependencies of the front-end. Please install these for usage.
### Setup
Run the following commands for setup
```
$ npm install
$ npm start
```

The home window of the application should open after some compilation and building.