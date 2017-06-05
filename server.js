/**
 * Created by 13-proo on 24/05/2017.
 */
'use strict';

const Hapi = require('hapi');
const Sequelize = require('sequelize');
const mysql = require("mysql");
const Promise = require("bluebird");

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8080
});

// All Drink Users
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        var data = {};

        const sequelize = new Sequelize('myTestDB', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: '8889'
        });

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        const User = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            favDrink: {
                type: Sequelize.STRING
            },
            favDrinkNotes: {
                type: Sequelize.STRING
            },
            otherDrink: {
                type: Sequelize.STRING
            },
            otherDrinkNotes: {
                type: Sequelize.STRING
            }
        });

        getUser()
            .then( function(user)  {
                console.log(`We will reply with ${user}`);
                reply(JSON.stringify(user));
            });

        function getUser() {
            return new Promise(function(resolve, reject) {
                User.findAll({where: { enabled: '1' }})
                .then((result) => {
                    if (!result) {
                        reject()
                    }

                    data.users = result.map((user) => {
                        return {
                            firstName: user.firstName,
                            surname: user.lastName,
                            favDrink: user.favDrink,
                            otherDrink: user.otherDrink,
                        };
                    });

                    console.log(1, data.users);
                    resolve(data.users);
                });

            });
        }


    }
});

// Tea Only List
server.route({
    method: 'GET',
    path:'/tea',
    handler: function (request, reply) {
        var data = {};

        const sequelize = new Sequelize('myTestDB', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: '8889'
        });

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        const User = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            favDrink: {
                type: Sequelize.STRING
            },
            otherDrink: {
                type: Sequelize.STRING
            },
            favDrinkNotes: {
                type: Sequelize.STRING
            }
        });

        getTeaUser()
            .then( function(user)  {
                console.log(`We will reply with ${user}`);
                reply(JSON.stringify(user));
            });

        function getTeaUser() {
            return new Promise(function(resolve, reject) {
                User.findAll({where: {
                    $or: [
                        {favDrink: {like: '%tea%' }},
                        {otherDrink: {like: '%tea%' }}
                    ]
                    }})
                    .then((result) => {
                        if (!result) {
                            reject()
                        }

                        data.users = result.map((user) => {
                            return {
                                firstName: user.firstName,
                                surname: user.lastName,
                                favDrink: user.favDrink,
                                otherDrink: user.otherDrink,
                            };
                        });

                        console.log(1, data.users);
                        resolve(data.users);
                    });

            });
        }


    }
});

// Coffee Only List
server.route({
    method: 'GET',
    path:'/coffee',
    handler: function (request, reply) {
        var data = {};

        const sequelize = new Sequelize('myTestDB', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: '8889'
        });

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        const User = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            favDrink: {
                type: Sequelize.STRING
            },
            otherDrink: {
                type: Sequelize.STRING
            },
            favDrinkNotes: {
                type: Sequelize.STRING
            }
        });

        getCoffeeUser()
            .then( function(user)  {
                console.log(`We will reply with ${user}`);
                reply(JSON.stringify(user));
            });

        function getCoffeeUser() {
            return new Promise(function(resolve, reject) {
                User.findAll({where: {
                    $or: [
                        {favDrink: {like: '%coffee%' }},
                        {otherDrink: {like: '%coffee%' }}
                    ]
                    }})
                    .then((result) => {
                        if (!result) {
                            reject()
                        }

                        data.users = result.map((user) => {
                            return {
                                firstName: user.firstName,
                                surname: user.lastName,
                                favDrink: user.favDrink,
                                otherDrink: user.otherDrink,
                            };
                        });

                        console.log(1, data.users);
                        resolve(data.users);
                    });

            });
        }


    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});




/*
 User.sync({force: false}).then(() => {
 // Table created
 return User.create({
 firstName: 'Levan',
 lastName: 'R',
 favDrink: 'Tea',
 drinkNotes: '2 Sugar - Strong'
 });

 });

 User.create({
 firstName: 'Levan',
 lastName: 'R',
 favDrink: 'Tea',
 drinkNotes: '2 Sugar - Strong'
 });

 User.create({
 firstName: 'Lis',
 lastName: 'S',
 favDrink: 'Tea',
 drinkNotes: '1 Sugar - Medium'
 });

 User.create({
 firstName: 'Julian',
 lastName: 'S',
 favDrink: 'Tea',
 drinkNotes: 'No Sugar - Milki'
 });

 */
