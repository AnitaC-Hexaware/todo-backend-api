//Bring mongodb client
//First we started with requiring mongoose and then we define the schema
//for our model. 
//Last thing is exporting the model so it can be used by other files in our project
const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

 const Post = module.exports=mongoose.model('Post', PostSchema);