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
			console.log('USER', users);
			res.json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: 'ERROR' });
		});
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db
		.findById(id)
		.then((user) => {
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ message: 'User Is Invalid' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'ERROR' });
		});
});

//Listining

server.listen(PORT, () => {
	console.log(`SERVER IS UP ON PORT ${PORT}!`);
});
