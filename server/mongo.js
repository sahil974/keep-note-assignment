const mongoose = require('mongoose')
require('dotenv').config();

const atlas = process.env.DATABASE_URI

mongoose.connect(atlas, { family: 4 })
    .then(() => { console.log('connected to keep-note Database') })
    .catch((err) => { console.log('Opps cant connect to Database ' + err) })


const schema = new mongoose.Schema({
    // title: {}
    //     type: String,
    //     required: true,
    // },
    // content: {
    //     type: String,
    //     required: true,
    // },
    name: String,
    notes: [{
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: Boolean
    }]
})

const collection = mongoose.model('keepnote', schema)

module.exports = collection
