// implement your API here
console.log('Hello');
const express = require('express');

const db = require('./data/db');
const server = express();
const PORT = 3000;

//endpoints
server.get('/api/users', (req, res) => {
	db
		.find()
		.then((users) => {
			console.log('USERS', users);
			res.json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: 'ERROR' });
		});
});

server.get('/api/users/:id', (req, res) => {
	db.findById().then().catch();
});

//Listining

server.listen(PORT, () => {
	console.log(`SERVER IS UP ON PORT ${PORT}!`);
});
