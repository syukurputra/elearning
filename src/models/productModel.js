let mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
let productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: Number,
    stock: Number,
    totalSale: Number,
    rating: {
        type: SchemaTypes.Double
    },
    create: {
        type: Date,
        default: Date.now
    }
});

let Product = module.exports = mongoose.model('product', productSchema);

module.exports.get = function(callback, limit) {
    Product.find(callback).limit(limit);
}