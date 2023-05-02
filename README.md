# LoMap: ES1a

[![Actions Status](https://github.com/arquisoft/lomap_es1a/workflows/CI%20for%20LOMAP_0/badge.svg)](https://github.com/arquisoft/lomap_es1a/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1a)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1a&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1a)

![alt text](lomap_logo.png "Title")

## Team members
- Andrés Ángel González Granda - uo68216@uniovi.es
- Pedro Garcia-Cañal Sánchez - uo264578@uniovi.es
- Adrián Alves Morales - uo284288@uniovi.es
- Marcos Caraduje Martínez - uo270285@uniovi.es

## Introduction

LoMap is an application for sharing your favourite locations with your friends!

Developed for Software Architecture at University of Oviedo, using **React** with **Typescript** and an endpoint using **NodeJS** with **express**.

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

## Deployment guide
<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/arquisoft/lomap_es1a`. The fastest way to launch everything is with docker:
```bash
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch our mongo container database. You should then be able to acces the application from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)

If you want to run it without docker. Compile and run the restapi:
```shell
cd restapi
npm install
npm start
```

Now the webapp:

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).