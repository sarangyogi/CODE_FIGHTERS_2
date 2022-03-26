const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    createdBy:{
        type:String,
        required:true,
    },
    source:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model('Product',ProductSchema);