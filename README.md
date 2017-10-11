# Tutora - Online tutoring plattform for teachers and students 

Students come to the site with a question they need answered. Tutors visit the site because they love to help and want to make a dollar doing it from the convenience of their home. The tutoring on Tutora gets conducted over video chat.

Visit the website or watch the video here: https://www.youtube.com/watch?v=-Q2H4lPs31A

## Team

- Tom Dickson
- Vincent Van Buskirk
- Agnes Chu

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x

## Developments

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest --env NODE_ENV`

`knex migrate:rollback --env NODE_ENV`

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`

## Deployment
Make sure you have Docker running.

Then simply type `docker-compose up` in the project directory.
