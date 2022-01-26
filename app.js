const express = require('express');
const app = express();

// Config
const config = require('./utilities/config')

// Routers
const users = require('./routes/users')

// Middleware
app.use(express.json())
app.use(express.static('./public'))

// // Routes
app.use('/api/users', users)


app.all('*', (req, res) => {
    res.status(404).json({msg: "Resource not found"}).send()
})



app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}...`)
})