# Fullstack Open 2022

This is the client-side code.

Server-side code at [https://github.com/craig-o-curtis/full-stack-open-2022-server](https://github.com/craig-o-curtis/full-stack-open-2022-server)

Built client-side code + server-side code at
[https://uhel-2022-server.herokuapp.com/](https://uhel-2022-server.herokuapp.com/)

## Prep build for backend

Build and copy build folder to sibling directory with server code

```bash
npm run build
cp -r build ../full-stack-open-2022-server

or

npm build:copy
```

## Client-side scripts

```bash
npm start
npm build
npm build:copy
```

// step 3.10 confirms works at https://uhel-2022-server.herokuapp.com
// step 3.11 confirms works on Heroku and locally
