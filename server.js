const express = require('express');
const signer = require('./signer')

const cors = require('cors')
const createSd = require('./createSd')
const app = express();

app.use(cors());

app.use(express.json())

app.post('/sign', (req, res) => {

    createSd(req.body)
    signer()
    res.sendStatus(200)
})

app.get('/callback', (req, res) => {
    res.sendFile(__dirname + '/static/.well-known/complete_LegalPerson.json')
})

app.listen(5000, () => {
    console.log('Server started on localhost:5000/')
})