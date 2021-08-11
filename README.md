# ~ TYCNCUCSC TABALL API ~

| **TABALL API** | **TABALL Monitor** |
| :-: | :-: |
| ![](assets/swagger/favicon.ico) | ![](assets/taball/favicon.ico) |
| A RESTful API to interact with records | A website to monitor records |


## Contents

- [Introduce](#introduce)
- [Project Structure](#project-structure)
- [Prerequirements](#prerequirements)
- [Install](#install)
- [Run](#run)
- [Services](#services)
- [Dependencies](#dependencies)
- [TODOs](#todos)


## Introduce

The backend API and the website for **TYCNCUCSC TABALL**, made by the team ***TYCNCUCSC TABALL PROJECT***.

This server program and associative services are mainly based on [Node.js](https://nodejs.org), [Express](https://expressjs.com), [MongoDB](https://www.mongodb.com/), and [others more](#dependencies).


## Project Structure

The following is the table of the root-level file structure of this project.

*(Noted as italic font indicating being ignored by Git.)*

| Directories or Files | Descriptions |
| :-- | :-- |
| `api/` | Swagger API Doc. |
| `assets/` | Public assets used in webpages. |
| `controllers/` | Controllers. |
| `data/` | Some data temporarily stored here. |
| `lib/` | Useful unit tools. |
| *`node_modules/`* | *The Node.js modules.* |
| `routes/` | Express routers. |
| `schema/` | Javascript object schemas. |
| `test/` | Some test files temporarily stored here. |
| `views/` | Webpage view templates. |
| `.gitignore` | The gitignore file. |
| `app.js` | The main entering point. |
| `config.schema.yaml` | The template of the configuration file. |
| *`config.yaml`* | *The configuration file.* |
| `LICENSE` | The license of this project. |
| `nodemon.json` | The nodemon configuration file. |
| `package-lock.json` | The Node.js package-lock file. |
| `package.json` | The Node.js package file. |
| `README.md` | The readme file. |


## Prerequirements

### MongoDB

There are only simple tutorials of installing MongoDB. If it is needed to know about how to use or configure MongoDB in more addvanced ways, please to search for other resources.

#### Linux (Rasbian / Raspberry Pi OS)

Download and install the **MongoDB** through APT by the command:
```bash
sudo apt-get install mongodb
```

In default, after installing, it is enough to this server program.

It is possible to check the version by the command:
```bash
mongo --version
```

To get into the MongoDB CLI, run the command:
```bash
mongo
```

To start the MongoDB service by running the command *(If *systemd* has not been installed, install it.)*:
```bash
sudo systemctl start mongod
```

If using Rasbian / Raspberry Pi OS on a Raspberry Pi board, the above commands would install a very old version `2.4.14` (released in 2015) which would make lots of problems such as that versions of its Node.js driver are limited to below and included `2.2.19`, with which the interface has many differences from a modern MongoDB.

#### Windows

For the MongoDB with versions above `4.0`.

Download the [installer](https://www.mongodb.com/try/download/community) and install it.

It is possible to check the version by the command:
```bash
mongo --version
```

To get into the MongoDB CLI, run the command:
```bash
mongo
```

To start the MongoDB service by running the command *(Administrator Mode needed)*:
```bash
sc start MongoDB
```

#### Other OS

Recommanded way: [Official MongoDB documentation about installation](https://docs.mongodb.com/manual/administration/install-community/).

### Node.js and npm

To install **Node.js**, download the [installer](https://nodejs.org) and install it.

After installing Node.js, there is a built-in **npm**.

It is possible to check whether they are completely installed or not and thier versions of Node.js and npm by run commands:
```bash
node -v
```
```bash
npm -v
```

### forever

Because it is an optional Node.js module, if other ways to run the server program applied, it is no need to install it.

To install **forever** with npm globally, run the following command:
```bash
npm install -g forever
```

To check it is installed, its version, and can be run by the shell, run the command:
```bash
forever --version
```


## Install

### Download and Install

First of all, download the source code from the github. It is possible to clone the [repository](https://github.com/Mibudin/tycncucsc_taball_api) by the command:
```bash
git clone https://github.com/Mibudin/tycncucsc_taball_api.git
```

*(Warning! This repository may not always be public.)*

To install the required Node.js modules, run the command:
```bash
npm install
```

*(If needed, [install **forever** globally](#forever))*

### Configuration

First, copy the file `config.schema.yaml` and renamed it as `config.yaml`.

Then, change settings in this file. It is suggested to read and follow the comments of explainations.

For example, for a most limited simpleast runnable configuration file in default *MAY* like this:
```yaml
# config.yaml

server:
  lan:
    host: "localhost"
    port: 3000
  wan:
    host: ~
    port: 0
  cf:
    inDev: true
    swagger: true
    apiAuth: false
    tableNum: 10

mongo:
  local:
    host: "localhost"
    port: 27017
  db:
    name: "tycncucscTaball"
    colles:
      table:
        name: "tableRecordColle"
      user:
        name: "userRecordColle"
  cf:
    oldVer: false
```


## Run

The simpleast way to run the service program is to ojust run the entering point program. Or be better, use the npm script to do the same work:
```bash
npm run start
```

To continuous run and automatically re-run this service, the default way is to use **forever** to manage it. There are several useful npm scripts commands to use:
```bash
# Start
npm run forever-start
# Stop
npm run forever-stop
# Re-start (stop and start again)
npm run forever-rs
```

*(If needed, [install **forever** globally](#forever))*

Of course, it is possible to use other ways to manage continuous services.


## Services

### TABALL API 

***A RESTful API to interact with records.***

URL of the service: 
```
/api/v0
```

### TABALL API Documentation

***An interactible Swagger API documentation.***

URL of the service (light theme): 
```
/api-docs/v0
```

URL of the service (dark theme): 
```
/api-docs-dark/v0
```

### TABALL Monitor

***A website to monitor records.***

URL of the service: 
```
/taball
```


## Dependencies

The following are some major dependencies including several important Node.js modules. This list is for the purpose of shortly showing some important components in the whole server structure, and sources of some icons and images.

For more details about all required Node.js modules, see the file `package.json`.

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [forever](https://github.com/foreversd/forever)
- [Swagger](https://swagger.io)
- [Material Designn for Bootstrap](https://mdbootstrap.com)
- [Font Awesome](https://fontawesome.com)


## TODOs

- Minify some essentail Javascript and CSS files.
- Re-write the error handling.
- Improve (or re-write) the intermediate interface of the MongoDB driver for more advanced applications.
- Apply Typescript.
- Implement the API authorization.
- Implement the request quantity control of the API.
- Improvement the TABALL Monitor.
