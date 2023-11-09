const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: String,
    basePrice: Number,
    toppings: [
        {
            name: String,
            price: Number
        }
    ],
    fillings: [
        {
            name: String,
            price: Number
        }
    ]    
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;