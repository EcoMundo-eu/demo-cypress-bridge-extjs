

# Demo-cypress-bridge-extjs

This project is for demo purpose ExtJS app `^7.0.0` especially for the [forked Coworkee app](https://github.com/rjben/Coworkee)

## Installation

Clone the repository
```bash
git clone 'https://github.com/EcoMundo-eu/demo-cypress-bridge-extjs.git'
```

Install all node dependencies
```
cd demo-cypress-bridge-extjs
npm install
```

## Useful commands

- `npm run cypress:open`: open the cypress panel GUI.
- `npm run cypress:run`: run all tests with headless mode and create a video report in `cypress/video` folder.

## Folder structure

```
├───fixtures
├───integration // Content all `spec.js`
│   └───Coworkee 
├───plugins
├───screenshots
├───src
│   ├───common
│   │   └───extJSComponents // Content all testing library commands
│   └───definition
...
```
