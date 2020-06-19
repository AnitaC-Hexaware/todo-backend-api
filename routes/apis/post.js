//Handling post related applications

const express = require('express');
const router= express.Router();
const Post = require('../../models/Post');

//get all the posts
router.get('/',async (req,res)=> {
const post = await Post.find()
if(post.length>0){
res.json(post)
}else{
    res.status(404).json({message:'Its empty..Add some..'})
}
})

//get a post by id
router.get('/:id', async(req,res) =>{
    const post = await Post.findById(req.params.id)
    if(post !=null){
        res.status(200).json(post)
    }
    else{
        res.status(404).json({Error:'Doesnt exists.Try with something else ...'})
    }
})
//create a post
router.post('/add',(req,res)=> {
    const title=req.body.title;
    const body = req.body.body;
 let newPost= new Post({
        title:title,
        body:body
    })
    if( newPost.save()) {
        res.status(201).json(newPost)
    }else
   res.status(404).send('error')
})

//to update a post
router.put('/update/:id',async(req,res) => {

let id= req.params.id;

const post = await Post.findById(id)
if(post!=null){
    post.title=req.body.title;
    post.body = req.body.body;
    post.save()
       res.send({
           message: 'Post updated successfully',
           status:'success',
           post:post
       })
    }else{
        res.status(404).json({message:'could not find the data'})
       }
    })

//make delete request
router.delete('/:id',async(req,res) => {
    let id= req.params.id;
    Post.findByIdAndRemove(id, function (err) {
        if(err)
            return res.status(404).json({message: 'Delete unsuccessful'});
       res.send('Post deleted successfully!')
    })
})

module.exports=router