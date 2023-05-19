
![Logo](https://i0.wp.com/cens-avenir.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-29-a-07.38.05-e1682755703717.jpg?fit=194%2C270&ssl=1)


# CENS

CENS is an association that has for project a web site that will offer training, write articles and propose practitioners and events for their users 




## Deployment

#To deploy this project run in frontend

```bash
  CENS\frontend> npm i
```

#To deploy this project run in backend

```bash
  \CENS\backend> npm i
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
  frontend/.env.local
```

`NEXT_PUBLIC_GRAPHQL_API_URL="http://localhost:3001/graphql"`


```bash
  backend/.env
```

`DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"`

`CLIENT_URL="http://localhost:3000/"`

`SCHEMA_PATH="src/schema.graphql"`

`ACCESS_TOKEN_SECRET="yourSecret"`
`REFRESH_TOKEN_SECRET="yourSecret"`


## Installation

Install backend first with npm :

If you don't have your own DataBase
```bash
  \CENS\backend> docker-compose up
```
Puis-en suite :

```bash
  \CENS\backend> npx prisma migrate deploy
  \CENS\backend> npm run start:dev
```
    
Start frontend with npm :

```bash
  CENS\frontend> npm run dev
```
## Authors

- [@Zoyerny](https://github.com/Zoyerny)

