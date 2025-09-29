const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/Listing.js');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    .then(() => console.log('connected to DB..'))
    .catch((err) => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: '68d53756dc3db237b09dd1a7' }));
    await Listing.insertMany(initdata.data);
    console.log('data was initalized.')
};
initDB();