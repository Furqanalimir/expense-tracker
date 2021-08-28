const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const { apple } = require('color-convert');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const transaction = require('./routes/transactions');
app.use('/api/transactions', transaction);

//server static if in production
if(process.env.NODE_ENV === 'production'){
    // set static folder 
    app.use(express.static(path.resolve(__dirname, 'client','build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
    });
}

const PORT = process.env.PORT || 500;

app.listen(PORT,console.log(`Server Running in  ${
                process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold));