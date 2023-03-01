const moongose = require("mongoose")

const productsSchema = new moongose.Schema({
    name:{
        type:String,
        required:[true,"product name must be provided"],
    },
    price:{
        type:Number,
        required:[true,"price must be provides"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values:["ikea","liddy","caressa","marcos"],
            message:"{VALUE} is not supported"
        }
    }
})


module.exports = moongose.model("Product",productsSchema)