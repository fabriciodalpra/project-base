# Base Project

This is a base project in Nestjs using DDD (Domain Driven Design) and Clean Architecture

## Backend

Add database connection configuration in .env file

### Environment variables

To run this project, you will need to add the following environment variables to your .env

`DATABASE_URL`
`PORT`

### Installation

```bash
$ yarn install
$ npx prisma generate dev
$ npx prisma db seed
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e
```

### Authentication

To authenticate to the api, use the email: "admin@admin.com" and the password "admin"

### RFs (Functional requirements)

-   [x] it is should be able to create new users;
-   [x] it is should be able authenticate;
-   [x] it is should be able get users when authenticated;

### RNs (Business rules)

-   [x] the user cannot register with duplicate email addresses;

### RNFs (Non-functional requirements)

-   [x] User password must be encryption;
-   [x] Authenticated user must be identified by JWT (JSON Web Token)
