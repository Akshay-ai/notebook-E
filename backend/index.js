const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();
const app = express();
const port = 5000;
app.use(cors())

//If we want to access req.body we have to use middleware
//To use middleware we use app.use()

app.use(express.json());


app.get('/',(req,res) => {
    res.send('Hello From Server');
})

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`Example App Listening at http://localhost:${port}`);
})