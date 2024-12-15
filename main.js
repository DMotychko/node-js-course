const fs = require('node:fs/promises')
const path = require('node:path')

const {read, write} = require('./fs.services')

require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await read();
    res.json(users)
})

app.post('/users', async (req, res) => {
    const users = await read();
    console.log(req.body)
    const newUser = {
        id: users.length ? users.length + 1 : 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    users.push(newUser)
    await write(users)
    res.status(201).json(newUser);
})

app.get('/users/:userId', async (req, res) => {
    const users = await read();
    console.log(users)
    const user = users.find(user => user.id === Number(req.params.userId));
    res.json(user)
})

app.put('/users/:userId', async (req, res) => {
    const users = await read();
    const index = users.findIndex(user => user.id === +req.params.userId)
    console.log(index);
    console.log(req.body);
    const user = users[index];
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    res.json(users);
})

app.delete('/users/:userId', async (req, res) => {
    const users = await read();
    const index = users.findIndex(user => {
        user.id === req.params.userId
    })
    users.splice(index, 1);
    await write(users);
    res.sendStatus(204)
})
const port = process.env.PORT;
app.listen(port);