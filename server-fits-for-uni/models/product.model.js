import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory'
        }
    ],
    sizes: [ // New field for sizes
        {
            size: {
                type: String,
                enum: ["freesize", "S", "M", "L", "XL", "XXL", "XXXL"], // Add more sizes if needed
                required: true
            },
            stock: {
                type: Number,
                default: 0
            },
            unit: {
                type: String,
                default: ""
            }
        }
    ],
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create a text index
productSchema.index({
    name: "text",
    description: 'text'
}, {
    weights: {
        name: 10,
        description: 5
    }
});

const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;