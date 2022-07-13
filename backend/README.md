# Backed Setup

## Heroku

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

Create a Heroku app wtih

```bash
heroku create -a uhel-demo-app
```

// https://uhel-demo-app.herokuapp.com/ | https://git.heroku.com/uhel-demo-app.git

Push to Heroku

```bash
git push heroku main
```
