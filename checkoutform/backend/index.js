const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Device = require('./model/Device');
const mongoDB = require('./db');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
// Connect to MongoDB
   mongoDB();
// Define a route
app.get('/', (req, res) => {
  res.send('Hello from Node.js server!');
});

app.get('/api/data', async (req,res)=>{
   
    try {
        const data = await Device.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
})

app.use('/api', require('./Usercreate'));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});