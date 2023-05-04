[![Actions Status](https://github.com/arquisoft/lomap_es1a/workflows/CI%20for%20LOMAP_0/badge.svg)](https://github.com/arquisoft/lomap_es1a/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1a)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1a&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1a)

<h1 align="center"> LoMap: ES1A </h1>

<p align="center" margin-top="2em">
  <img src="lomap_logo.png" alt="LoMap logo">
</p>

<p align="center" margin-top="2em">
  <a href="https://youtu.be/8jDXuokrXMs"> <b>Demonstration video</b> </a> - <a href="https://20.108.13.14"> <b>Deployed website</b> </a>
</p>

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

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. To run the app locally, compile and run the restapi:
```shell
cd restapi
npm install
npm start
```

Tu run the webapp you need to create a production build in order for the restapi to work properly:

```shell
cd webapp
npm run build
npm run prod
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

## Demonstration Video

<a href="https://youtu.be/8jDXuokrXMs"> Video on Youtube </a>

## Deployment

<a href="https://20.108.13.14"> Deployed on Azure </a>