# Base Project

This is a base project in Nestjs using DDD (Domain Driven Design) and Clean Architecture

## Backend

Add database connection configuration in .env file

### Environment variables

To run this project, you will need to add the following environment variables to your .env

`DATABASE_URL`
`PORT`

Generate private and public key RSA 256, after this convert keys to base64 and insert in .env variables 

`JWT_PRIVATE_KEY`
`JWT_PUBLIC_KEY`

### Installation

```bash
$ yarn install
$ npx prisma generate dev
$ npx prisma migrate dev
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

### Functional requirements

-   [x] It is should be able to create new users;
-   [x] It is should be able authenticate;
-   [x] It is should be able update user when authenticated;
-   [x] It is should be able update user password when authenticated;
-   [x] It is should be able list users when authenticated;
-   [x] It is should be able get user when authenticated;
-   [x] It is should be able delete user when authenticated;

### Business rules

-   [x] The user cannot register with duplicate email addresses;

### Non-functional requirements

-   [x] User password must be encryption;
-   [x] Authenticated user must be identified by JWT (JSON Web Token)
