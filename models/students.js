var mongoose = require('mongoose');

var StudentListSchema = new mongoose.Schema ({
    studentid: String,
    name: String,
    age: Number,
    gender: String,
    class_id: Number,
    section: String,
    admission_date: Date,
    fathername:String,
    mothername:String,
    city: String,
    phone: Number
}, {collection: 'student'});

module.exports = mongoose.model('studentlist', StudentListSchema);