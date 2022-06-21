const express = require('express');
const signer = require('./signer')

const cors = require('cors')
const createSd = require('./createSd')
const app = express();

app.use(cors());

app.use(express.json())

app.post('/sign', async (req, res) => {

    createSd(req.body)
    const vc = await signer()
    res.json(vc)
})

app.get('/callback', (req, res) => {
    res.sendFile(__dirname + '/static/.well-known/complete_LegalPerson.json')
})

app.listen(5000, () => {
    console.log('Server started on localhost:5000/')
})