# Server-side code

Client-side code at [https://github.com/craig-o-curtis/full-stack-open-2022](https://github.com/craig-o-curtis/full-stack-open-2022)

Heroku:

- [https://uhel-2022-server.herokuapp.com](https://uhel-2022-server.herokuapp.com)
- [https://uhel-2022-server.herokuapp.com/api/contacts](https://uhel-2022-server.herokuapp.com/api/contacts)

## Scripts

```bash
npm start               // node index.js
npm run dev             // nodemon index.js
npm run heroku:local    // heroku local web
npm run build:ui        // rm -rf build && cd ../full-stack-open-2022-client/ && npm run build && cp -r build ../full-stack-open-2022-server
npm run deploy          // git push heroku main
npm run deploy:full     // npm run build:ui && git add . && git commit -m uibuild && npm run deploy
npm run logs:prod       // heroku logs --tail
```

## Backend Setup

### Heroku

Setup steps are at [https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

Sign up for a Heroku account [Heroku](https://devcenter.heroku.com/)

Install Heroku

```bash
brew install heroku/brew/heroku
```

Log in

```bash
heroku login
```

Start locally with

```bash
heroku local web
```

Create a Heroku app with

```bash
heroku create -a uhel-2022-server
```

// https://uhel-2022-server.herokuapp.com/ | https://git.heroku.com/uhel-2022-server.git

WARNING - for server repo only - Push to Heroku

```bash
git push heroku main
```

Deployed to:
https://uhel-2022-server.herokuapp.com
https://uhel-2022-server.herokuapp.com/api/contacts

Check Heroku logs with:

```bash
heroku logs -t
```

Push server dir from monorepo

```bash
git subtree push --prefix server heroku main
```

// Confirm Part 3.b exercise 3.10 no console errors on Heroku
// Confirm Part 3.b exercise 3.11 CRUD working on Heroku

MongoDB
mongodb+srv://fullstack:<password>@cluster0.16byzrz.mongodb.net/?retryWrites=true&w=majority

connect with mongoose

Set Heroku env variables with

```
heroku config:set <VAR>=blah
```

## Debugging

Node Debugging Mode

- VS Code - Run > Start Debugging
- Add `debugger` anywhere in server/index.js or other server/\* files

Chrome debugger

- run script `npm run chrome:debugger` or

```bash
node --inspect server/index.js
```

- Open Chrome devtools, click on green Node icon to open new tab with debugger

// Confirms Part 4.a Exercise 4.2 is organized in modules
// Part 4.d Exercise 4.17 due to connections of dbs in this project, keeping dbs separated
// // only populating with unique identifiers, not using populate method
// // this will also work better with React Query hooks to fetch and cache this data in the FE

// Part 4.d Exercise 4.18 confirms has token-based authentication for blogs...
// // login controller still doesn't post new users to db, assuming will be implemented in part 5
// // also will assume using React Router for login page, then can also add blog and contacts routes, add tokens to contacts

// Part 4.d Exercise 4.20 confirms middleware for token extractor, working with unit tests

// Part 4.d Exercise 4.23 confirm unit tests passing
