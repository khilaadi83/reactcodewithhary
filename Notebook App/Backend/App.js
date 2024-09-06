const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
const db = require('./config/keys').MongoURI;

// Body parser middleware
app.use(cors())
app.use(express.json())



// Import customer schema 
const Users = require('./Models/users');
// connect to mongodb

mongoose.connect(db,
    {
        useNewUrlParser: true
    }
)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));




// Availiable routes
app.use('/', require('./Routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./Routes/notes'));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));