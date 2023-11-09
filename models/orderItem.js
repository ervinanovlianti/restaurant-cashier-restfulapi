const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MenuItem'
            },
            selectedFilling: String,
            selectedTopping: String,
            quantity: Number
        }
    ],
    total: Number
});

const OrderItem = mongoose.model('Order', orderSchema);

module.exports = OrderItem;
