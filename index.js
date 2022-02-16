const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('docs'))

app.get('/ping', (req, res) => {
    res.send("pong")
})

app.get('/assets/:id', (req, res) => {
    const options = {
        root: __dirname + '/public/',
        dotfiles: 'deny'
    }

    const id = req.params.id
    const filename = `/assets/${id}`

    res.sendFile(filename, options, error => {
        if (error) {
            res.sendFile(`/assets/sprites/missing.png`, options)
        } else {
            console.log("sent:", filename)
        }
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})