const mongoose = requiere("mongoose")

const ProductSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter product name"],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: [true, "Please enter product price"]
        },

        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product