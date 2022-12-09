const mongoose = require('mongoose');
const {productSchema} = require('./Product');

// const cartItemSchema = new mongoose.Schema({
//     item: {
//         type: productSchema,
//         require: true
//     },
//     count: {
//         type: Number,
//         require: true
//     }
// }, { _id: false })

const cartSchema = new mongoose.Schema({
    _id: String,
    cartId: {
        type: String,
        require: true
    },
    cartItems: [{
        item: {
            type: productSchema,
            require: true
        },
        count: {
            type: Number,
            require: true
        }
    }]
}, { _id: false })

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;