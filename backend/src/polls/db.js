/*
    This would be a NO-SQL db, which means
    schema would be something like this
 */

const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
console.log("mongoString", mongoString)
mongoose.connect(
    mongoString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (error)=>{
        console.log("error", error)
    }
);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

module.exports = database;