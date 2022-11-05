# Fastify Passport Session-auth Example

## How to run this example?

1. Run Yarn or NPM to install required packages

2. Create a .env file on the root of the folder with the following vars:

```
# API PORT
API_PORT=4000

# Frontend PORT
PORT=5000

# Prisma
DATABASE_URL=file:./db.sqlite

# Next Auth Discord Provider
GOOGLE_CLIENT_ID= {paste here google client id}
GOOGLE_CLIENT_SECRET= {paste here google client secret}
```

3. Change `App.tsx` file to match API_PORT defined on .env file:

```
const API_URL = `http://localhost:${4000}`
```

4. Regist your app on Google Cloud Platform in order to get a Client Id and Secret

5. Setup prisma:
Run:
```
npx prisma db push
```
```
npx prisma generate
```

## To run the App:

Start API:

```
yarn dev:api

or

npm run dev:api
```

Start Frontend:
```
yarn dev

or

npm run dev
```

## Known Issues

Despite the fact that this code is fully working on Mozilla Firefox, the same was not completely achieved on Microsoft Edge.


