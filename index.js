// implement your API here
console.log('Hello');
const express = require('express');

const server = express();

server.listen(3000, () => {
	console.log('SERVER IS UP!');
});
