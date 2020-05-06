const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: { type:String},
    productDesc: { type:String},
    productPrice: { type:String},
    manufacDate: { type:Date,default:Date.now},
    expDate: { type:Date,default:Date.now},
    barcode: { type:String},
})

module.exports = mongoose.model('product',ProductSchema)