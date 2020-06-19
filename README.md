# Little MBTA Microservice

This is a project done as a coding evaluation for Payment Works. It gets some basic information from the MBTAs public API whose documentation can be found [here](https://www.mbta.com/developers/v3-api). 

## Setup 

### Node installation

This program was built using node v14.3.0. 

One can install node and the correct version by using NVM. Installation instructions are available [here](https://github.com/nvm-sh/nvm#installing-and-updating) but a brief set of commands that should work on POSIX systems can be found below. 

Run the following in your terminal:
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ nvm install 14.3.0
$ nvm alias default v14.3.0
$ node -v #if you see the correct version number next you are good to go  
```

### Npm instillation and app dependencies

You will also need to install the necessary dependencies for the application to run, this can be done with npm also known as Node Package Manager. Proceed to the nodejs website [here](https://nodejs.org/en/) for instructions on how to install npm for your system 

Once you have npm installed in your terminal processes to the projects directory and run the following command: 

```
$ npm install 
```

If there are no errors it has installed all the necessary dependencies of the application. 

## Running the application
Upon successful installation of node and the projects dependencies one can now start and run the application using the following command in the project directory: 
```
$ npm ./index.js 
```
Upon success you should see a happy greeting indicating where the service is listening and where its swagger documentation is being hosted. 

Have fun! 