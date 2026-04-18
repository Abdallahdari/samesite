
const dns=require('dns');
dns.setServers(['1.1.1.1'])
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieparser=require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieparser());
const userRoutes = require('./routes/userRoutes.js');
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB✅');
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}).catch((err) => {
    console.error('Error connecting to MongoDB❌', err);
});