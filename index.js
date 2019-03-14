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
server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const { name, bio } = req.body;

	if (!name || !bio) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
		return;
	}

	db
		.update(id, { name, bio })
		.then((user) => {
			if (user) {
				res.sendStatus(200).json(user);
			} else {
				res.status(400).json({ errorMessage: 'No users with this id exists.. ' });
			}
		})
		.catch(() => {
			res.status(500).json({ error: 'The user information could not be modified' });
		});
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db
		.remove(id)
		.then((user) => {
			res.status(404).json({ message: 'The user with the specified ID does not exist.' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'the user could not be removed' });
		});
});
//Listining

server.listen(PORT, () => {
	console.log(`SERVER IS UP ON PORT ${PORT}!`);
});
