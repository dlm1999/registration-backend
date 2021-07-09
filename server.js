const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client:'pg',
	connection:{
	  host : '127.0.0.1',
      user : 'postgres',
      password : 'vasu',
      database : 'jeevamrut'
	}
});

db.select('*').from('users').then(data =>{
	console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/register', (req,res) =>{
	const { email, name, address, contact} = req.body;
	db('users')
	.returning('*')
	.insert({
		name: name,
		email:email,
		address:address,
		contact:contact,
		date:new Date()
	})
	.then(user =>{
		res.json(user[0]);
	})
})

app.listen(3001, () => {
	console.log('app is running on port 3001')
})