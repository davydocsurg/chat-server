# Chat Server - Microservices Tutorial

This project serves as a comprehensive tutorial for building and deploying microservices using Node.js, RabbitMQ, Nginx, and Docker.

## Table of Contents

-   [Introduction](#introduction)
-   [Setup](#setup)
-   [Usage](#usage)
-   [Tutorial](#tutorial)

## Introduction

This tutorial provides step-by-step guidance on developing and deploying a microservices architecture using Node.js, RabbitMQ, Nginx, and Docker. It covers the setup of individual microservices for user management, chat functionality, and notifications, as well as an API Gateway to manage communication between services.

## Setup

To get started with the project, follow these steps:

-   Clone the repository to your local machine.
-   Create a `.env` file in each microservice folder based on the provided `.env.example` files and fill in the necessary configuration details.
-   Run `docker-compose up --build` from the project root directory to start the application in a containerized environment.

## Usage

Once the application is up and running, you can interact with the microservices using Postman or any API tool of your choice. The application is accessible at http://localhost:85 and routes requests to the appropriate microservice based on the endpoint.

## Tutorial

For the detailed tutorial on this project, visit [https://dev.to/davydocsurg/mastering-microservices-a-hands-on-tutorial-with-nodejs-rabbitmq-nginx-and-docker-m4f](https://dev.to/davydocsurg/mastering-microservices-a-hands-on-tutorial-with-nodejs-rabbitmq-nginx-and-docker-m4f).
