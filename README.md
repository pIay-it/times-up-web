# ⏳ Time's Up Web by Play-IT

[![GitHub release](https://img.shields.io/github/release/pIay-it/times-up-web.svg)](https://GitHub.com/pIay-it/times-up-web/releases/)
[![GitHub license](https://img.shields.io/github/license/pIay-it/times-up-web.svg)](https://github.com/antoinezanardi/https://img.shields.io/github/license/werewolves-assistant-web.svg/blob/master/LICENSE)
[![GitHub Actions Build](https://github.com/pIay-it/times-up-web/actions/workflows/build.yml/badge.svg)](https://github.com/pIay-it/times-up-web/actions/workflows/build.yml)
[![GitHub Actions Deploy](https://github.com/pIay-it/times-up-web/actions/workflows/deploy-master.yml/badge.svg)](https://github.com/pIay-it/times-up-web/actions/workflows/deploy-master.yml)
[![Contributions are welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/pIay-it/times-up-web/issues)

[![ForTheBadge open-source](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/antoinezanardi/)
[![ForTheBadge made-with-vue](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)

## ⏳ Table of Contents

1. ⏳ [What is this app ?](#what-is-this-app)
2. 🔍 [Let's try !](#lets-try)
3. 📈 [Versions & changelog](#versions)
4. ☑️ [Code analysis and consistency](#code-analysis-and-consistency)
5. 🔨 [Installation](#installation)
6. 🔌 [Let's go](#lets-go)
7. ⚙️ [Other useful commands](#other-useful-commands)
8. ©️ [License](#license)
9. ❤️ [Contributors](#contributors)

## <a name="what-is-this-app">⏳ What is this app ?</a>
**⏳ Time's Up Web by Play-IT** is a Vue3 web app using the <a href="https://github.com/pIay-it/times-up-api" target="_blank">Time's Up API by Play-IT</a>.
With this app, play with your friends to a brand-new Time's Up, entirely revisited, automatic and ergonomic ! Try it out now with live demos below.

## <a name="lets-try">🔍 Let's try !</a>
Two versions are available for testing this project:

✨<a href="https://times-up.play-it.io" target="_blank">**Main version**</a>

🔧<a href="https://sandbox.times-up.play-it.io" target="_blank">**Sandbox version**</a>

**Sandbox version** may contain some bugs and unexpected behaviors as its purpose is to test new features before deploying on **main version**.

Both versions are running on a server with the following configuration:
- **OS**: `Debian GNU/Linux 10 (buster)`
- **NodeJS**: `v14.18.1`
- **NPM**: `v6.14.15`
- **MongoDB shell version**: `v4.4.10`

The MongoDB database is protected under username and password authentication.

## <a name="versions">📈 Versions & changelog</a>
Each change when a new version comes up is listed in the <a href="https://github.com/pIay-it/times-up-web/blob/master/CHANGELOG.md" target="_blank">CHANGELOG.md file</a> placed at project's root.

Also, you can keep up with changes by watching releases with the **Watch GitHub button** at the top of this page.

Current release on **main version** is [![GitHub release](https://img.shields.io/github/release/pIay-it/times-up-web.svg)](https://GitHub.com/pIay-it/times-up-web/releases/).

**[GitHub Actions](https://github.com/pIay-it/times-up-web/actions)** helps the project to be automatically updated by deploying new versions for both **Sandbox** and **Main** APIs. Please refer to the **[workflows](https://github.com/pIay-it/times-up-web/tree/master/.github/workflows)** for more details.

###### 🏷️ <a href="https://github.com/pIay-it/times-up-web/releases" target="_blank">All releases for this project are available here</a>.

## <a name="code-analysis-and-consistency">☑️ Code analysis and consistency</a>
In order to keep the code clean, consistent and free of bad JS practises, **[ESLint](https://eslint.org/)** is installed with nearly **410 rules activated** !

Complete list of all enabled rules is available in the **[.eslintrc.js file](https://github.com/pIay-it/times-up-web/blob/master/.eslintrc.js)**.

## <a name="installation">🔨 Installation</a>
1. Install dependencies with `npm install` (add `--production` to omit dev dependencies).
2. Copy `.env.example` and paste it as `.env`.
3. Replace environment values in the fresh new `.env` file if necessary (When **⚠️️ Required** is specified):

## <a name="lets-go">🔌 Let's go</a>
To start the web app **on development mode**, simply run `npm start`.

To start the web app **on production mode**, run `npm run build` and host the `dist` folder with an HTTP server.

## <a name="other-useful-commands">⚙️ Other useful commands</a>
- **Lint**: `npm run lint` checks for code style.
- **Build**: `npm run build` launches the Vue build process.
- **Unit tests**: `npm run test:unit` runs various unit tests using `mocha` and `chai`.
- **E2E tests**: `npm run test:e2e` runs various E2E tests using `cypress`.

## <a name="license">©️ License</a>

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).

## <a name="contributors">❤️ Contributors</a>

There are no contributor yet... Be the first one by **[creating a pull request](https://github.com/pIay-it/times-up-web/pulls)** !