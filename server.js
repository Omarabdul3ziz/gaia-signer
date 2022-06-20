const express = require('express');
const signer = require('./signer')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/sign', (req, res) => {
    signer()
    res.send('Signed in, go to /callback')
})

app.get('/callback', (req, res) => {
    res.sendFile(__dirname + '/static/.well-known/complete_LegalPerson.json')
})

app.listen(5000, () => {
    console.log('Server started on localhost:5000/')
})